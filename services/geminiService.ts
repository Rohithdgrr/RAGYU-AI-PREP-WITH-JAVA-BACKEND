import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LIBRA_SYSTEM_PROMPT } from "../constants";
import { QuizConfig, Question, UserSettings } from "../types";

const getApiKey = () => process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const createClient = () => new GoogleGenAI({ apiKey: getApiKey() });

export const getLibraResponse = async (history: { role: string; content: string }[]) => {
  const ai = createClient();
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      })),
      config: {
        systemInstruction: LIBRA_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong while contacting Gemini. Please verify your API access and try again.";
  }
};

export const generateQuizQuestions = async (config: QuizConfig, userPreferences?: UserSettings): Promise<Question[]> => {
  const ai = createClient();

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
  7. Return a JSON object with a "questions" key containing the array of questions.

  JSON Structure:
  {
    "questions": [
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
  }
  `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      });

      let jsonText = response.text;
      if (!jsonText) {
        throw new Error("Empty response from AI");
      }

      const parsed = JSON.parse(jsonText.trim());
      let questions: Question[] = [];
      
      if (parsed.questions && Array.isArray(parsed.questions)) {
        questions = parsed.questions;
      } else if (Array.isArray(parsed)) {
        questions = parsed;
      } else {
        const firstArrayKey = Object.keys(parsed).find(key => Array.isArray(parsed[key]));
        if (firstArrayKey) {
          questions = parsed[firstArrayKey];
        }
      }

      if (questions.length === 0) {
        throw new Error("No questions were generated.");
      }

      return questions.map((q, index) => ({
        ...q,
        id: q.id || `ai-gen-${index}-${Date.now()}`
      }));

  } catch (error: any) {
    console.error("Quiz Generation Error:", error);
    throw new Error(error.message || "Failed to generate questions with Gemini.");
  }
};
