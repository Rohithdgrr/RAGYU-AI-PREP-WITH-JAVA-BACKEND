import { GoogleGenAI } from "@google/genai";

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("Missing GEMINI_API_KEY env var");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: key });

async function main() {
  try {
    const iterator = ai.models.list({ pageSize: 10 });
    for await (const model of iterator) {
      console.log(model.name, model.supportedGenerationMethods);
    }
  } catch (error) {
    console.error("List models failed:");
    console.error(error);
    if (error?.response) {
      try {
        const body = await error.response.json();
        console.error("Error body:", body);
      } catch {}
    }
    process.exit(1);
  }
}

main();
