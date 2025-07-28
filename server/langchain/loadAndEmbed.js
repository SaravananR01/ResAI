import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { vectorStore } from "./store.js";

export async function loadAndEmbed(filePath) {
  const loader = new TextLoader(filePath);
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const chunks = await splitter.splitDocuments(docs);

  await vectorStore.addDocuments(chunks);
  console.log(`${chunks.length} chunks embedded and stored in pgvector`);
}
