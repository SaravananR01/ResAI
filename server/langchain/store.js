import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { pool } from "../db.js";
import { embeddings } from "./embeddings.js";

export const vectorStore = await PGVectorStore.initialize(embeddings, {
  postgresConnectionOptions: {
    pool,
  },
  tableName: "documents",
  columns: {
    idColumnName: "id",
    contentColumnName: "content",
    vectorColumnName: "embedding",
  },
});
