import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",     
  database: "vectordb",     
  password: process.env.PG_PASSWORD,  
  port: 5432,
});
