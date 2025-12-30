import { GoogleGenAI } from "@google/genai";
import { LIBRA_SYSTEM_PROMPT } from "../constants";
import { QuizConfig, Question, UserSettings } from "../types";

const getGeminiApiKey = () => process.env.GEMINI_API_KEY || process.env.API_KEY || '';
const getMistralApiKey = () => process.env.MISTRAL_API_KEY || '';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

const createGeminiClient = () => new GoogleGenAI({ apiKey: getGeminiApiKey() });

const callMistralChat = async (messages: { role: string; content: string }[], jsonMode = false) => {
  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${getMistralApiKey()}`
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages,
      temperature: 0.7,
      ...(jsonMode && { response_format: { type: "json_object" } })
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Mistral API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export const getLibraResponse = async (history: { role: string; content: string }[]) => {
  const geminiKey = getGeminiApiKey();
  
  if (geminiKey) {
    try {
      const ai = createGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        })),
        config: {
          systemInstruction: LIBRA_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      if (response.text) {
        return response.text;
      }
      throw new Error("Empty Gemini response");
    } catch (error) {
      console.warn("Gemini failed, falling back to Mistral:", error);
    }
  }

  const mistralKey = getMistralApiKey();
  if (mistralKey) {
    try {
      const messages = [
        { role: "system", content: LIBRA_SYSTEM_PROMPT },
        ...history.map(h => ({
          role: h.role === 'user' ? 'user' : 'assistant',
          content: h.content
        }))
      ];
      return await callMistralChat(messages);
    } catch (error) {
      console.error("Mistral Error:", error);
    }
  }

  return "AI service unavailable. Please check your API keys.";
};

export const generateQuizQuestions = async (config: QuizConfig, userPreferences?: UserSettings): Promise<Question[]> => {
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

  const geminiKey = getGeminiApiKey();
  if (geminiKey) {
    try {
      const ai = createGeminiClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      });

      const jsonText = response.text;
      if (jsonText) {
        const questions = parseQuizResponse(jsonText);
        if (questions.length > 0) {
          return questions;
        }
      }
      throw new Error("Empty or invalid Gemini response");
    } catch (error) {
      console.warn("Gemini quiz generation failed, falling back to Mistral:", error);
    }
  }

  const mistralKey = getMistralApiKey();
  if (mistralKey) {
    try {
      const jsonText = await callMistralChat([{ role: "user", content: prompt }], true);
      const questions = parseQuizResponse(jsonText);
      if (questions.length > 0) {
        return questions;
      }
      throw new Error("No questions generated from Mistral");
    } catch (error) {
      console.error("Mistral quiz generation error:", error);
      throw error;
    }
  }

  throw new Error("No AI service available. Please configure GEMINI_API_KEY or MISTRAL_API_KEY.");
};

function parseQuizResponse(jsonText: string): Question[] {
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

  return questions.map((q, index) => ({
    ...q,
    id: q.id || `ai-gen-${index}-${Date.now()}`
  }));
}
