import { GoogleGenAI } from "@google/genai";

const key = process.env.GEMINI_API_KEY;

if (!key) {
  console.error("Missing GEMINI_API_KEY env var");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: key });

try {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-latest",
    contents: "Hello from test script."
  });

  console.log("Response text:", response.text);
} catch (error) {
  console.error("Gemini API error:");
  console.error(error);
  if (error?.response) {
    try {
      const body = await error.response.json();
      console.error("Error body:", body);
    } catch {}
  }
  process.exit(1);
}
