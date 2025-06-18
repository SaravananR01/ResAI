import dotenv from "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function askGemini(question) {
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    contents: question,
  });
  console.log(response.text);
}

