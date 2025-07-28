import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

export const embeddings = new HuggingFaceInferenceEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});
