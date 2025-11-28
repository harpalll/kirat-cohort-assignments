import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "can you list all the recently funded startups and have job openings on wellfound.com",
    });
    console.log(response.text);
  } catch (error) {
    console.log(error);
  }
}

await main();
