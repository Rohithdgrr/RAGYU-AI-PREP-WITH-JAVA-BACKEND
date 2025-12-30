import { LIBRA_SYSTEM_PROMPT } from "../constants";
import { QuizConfig, Question, UserSettings } from "../types";

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || '';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export const getLibraResponse = async (history: { role: string; content: string }[]) => {
  if (!MISTRAL_API_KEY) {
    return "Mistral API Key is missing. Please add MISTRAL_API_KEY to your .env file.";
  }

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: LIBRA_SYSTEM_PROMPT },
          ...history.map(h => ({
            role: h.role === 'user' ? 'user' : 'assistant',
            content: h.content
          }))
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Mistral API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Mistral Error:", error);
    return "Something went wrong while contacting Mistral. Please verify your API access and try again.";
  }
};

export const generateQuizQuestions = async (config: QuizConfig, userPreferences?: UserSettings): Promise<Question[]> => {
  if (!MISTRAL_API_KEY) {
    throw new Error("Mistral API Key is missing.");
  }

  let preferencesContext = '';
  if (userPreferences) {
    const topics = userPreferences.preferredTopics?.join(', ');
    if (topics) {
      preferencesContext = `\n  User Context:
  - Preferred Topics: ${topics}
  
  Instruction: If the user's preferred topics fall within the requested Subject (${config.subject}), prioritize generating questions for them.`;
    }
  }

  const prompt = `Generate ${config.questionCount} multiple-choice questions for the ${config.exam} exam.
  Subject: ${config.subject}
  Topics: ${config.topics.length > 0 ? config.topics.join(', ') : 'General syllabus topics'}
  Difficulty: ${config.difficulty}${preferencesContext}

  REQUIREMENTS:
  1. Questions must be highly relevant to Indian Government exams (RRB, IBPS, SBI, SSC).
  2. Use LaTeX for ANY mathematical expressions or formulas (e.g., $x^2 + y^2$, $\\frac{a}{b}$).
  3. Provide exactly 4 options for each question.
  4. The 'correctIndex' must be 0, 1, 2, or 3.
  5. The 'explanation' must be detailed and helpful for students.
  6. **CRITICAL**: Include a 'visualAid' field containing a valid raw SVG string (<svg...></svg>) that visually explains the solution. 
     - For Geometry: Draw the labeled shape.
     - For Data Interpretation: Draw a simple bar/pie chart.
     - For Logic/Reasoning: Draw a flowchart or diagram.
     - Keep SVGs simple, using a standard viewBox="0 0 300 200". Use attractive colors (blues, emeralds, oranges).
  7. Return STRICT JSON as an array of objects.

  JSON Schema:
  [
    {
      "id": "string",
      "text": "string (markdown/latex)",
      "options": ["string", "string", "string", "string"],
      "correctIndex": number (0-3),
      "explanation": {
        "steps": ["string"],
        "tricks": ["string"],
        "concept": "string",
        "visualAid": "string (raw <svg>)"
      }
    }
  ]
  `;

  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Mistral API Error: ${response.status}`);
    }

    const data = await response.json();
    let jsonText = data.choices[0].message.content;
    
    if (!jsonText) {
      throw new Error("Empty response from AI");
    }

    // Mistral with response_format: json_object might still return a root object if not careful
    // but the prompt asks for an array. Let's handle both.
    let parsed = JSON.parse(jsonText.trim());
    let questions: Question[] = [];
    
    if (Array.isArray(parsed)) {
      questions = parsed;
    } else if (parsed.questions && Array.isArray(parsed.questions)) {
      questions = parsed.questions;
    } else if (typeof parsed === 'object') {
      // Sometimes it wraps it in a key like "data" or just returns one object
      const firstKey = Object.keys(parsed)[0];
      if (Array.isArray(parsed[firstKey])) {
        questions = parsed[firstKey];
      }
    }

    return questions.map((q, index) => ({
      ...q,
      id: `ai-gen-${index}-${Date.now()}` // Ensure unique ID on client side
    }));

  } catch (error) {
    console.error("Quiz Generation Error:", error);
    throw error;
  }
};
