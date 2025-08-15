import { Pool } from 'pg';
import dotenv from "dotenv/config";

const password=String("password");

console.log(password + " " + typeof password );

const pool = new Pool({
  type:"postgres",
  user: 'postgres',
  host: '172.17.0.3',     
  database: 'vectordb',     
  password: password,  
  port: 5432,
});

console.log(pool);
export default pool;
