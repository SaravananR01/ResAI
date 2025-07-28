import { GoogleGenAI } from "@google/genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { vectorStore } from "./store.js";

const model = new GoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const retriever = vectorStore.asRetriever({
  k: 5,
});

const prompt = PromptTemplate.fromTemplate(`
You are a helpful assistant. Use the following context to answer the question.
If the answer is not in the context, say "I don't know".

Context:
{context}

Question: {question}
Answer:
`);

export const ragChain = RunnableSequence.from([
  {
    context: async (input) => {
      const docs = await retriever.invoke(input.question);
      return docs.map(doc => doc.pageContent).join("\n\n");
    },
    question: (input) => input.question,
  },
  prompt,
  model,
]);
