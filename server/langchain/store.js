import { Pool } from 'pg';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from 'dotenv/config';

// const password=String("newpassword");
// console.log(password);
// const pool = new Pool({
//   type: "postgres",
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'vectordb',
//   password: password,
//   port: 5432,
// });

// pool.query('SELECT NOW()')
//   .then(res => {
//     console.log('Success!', res.rows[0]);
//     pool.end();
//   })
//   .catch(err => {
//     console.error('FAILED:', err);
//     pool.end();
//   });

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const vectorStore = await PGVectorStore.initialize(embeddings, {
  postgresConnectionOptions: {
    user: 'postgres',
    password: process.env.PASSWORD,
    host: '127.0.0.1',
    port: 5432,
    database: 'vectordb',
  },
  tableName: "documents",
  columns: {
    idColumnName: "id",
    contentColumnName: "content",
    vectorColumnName: "embedding",
  },
});

export default vectorStore;
