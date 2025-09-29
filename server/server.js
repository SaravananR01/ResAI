import dotenv from "dotenv/config";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { askGemini } from './agent.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {ragChain} from './langchain/ragChain.js';
import {loadAndEmbed} from './langchain/loadAndEmbed.js';
//import PdfParse from 'pdf-parse';

const port=8080 || process.env.PORT;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`Server Listening on PORT : ${port}`);
});

//upload
const upload=multer({dest:'uploads/'});

// ask endpoint
// app.post('/ask', upload.single('file'), async (req, res) => {
//     const question = req.body.question;
//     const file = req.file;

//     console.log("Received question:", question);
//     if (file) {
//         console.log("Received file:", file.originalname);
//     }

//     try {
//         let contextText = '';

//         if (file) {
//             const filePath = path.join(__dirname, file.path);
//             contextText = fs.readFileSync(filePath, 'utf-8');

//             fs.unlinkSync(filePath);
//         }
//         const combinedPrompt = contextText
//             ? `Context:\n${contextText}\n\nQuestion:\n${question}`
//             : question;

//         const response = await askGemini(combinedPrompt);
//         console.log(response);
//         res.status(200).json({ response });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// });

app.post('/ask', upload.single("file"), async (req, res) => {
  const { question } = req.body; 
  const file = req.file; 
  console.log("Got question:", question);
  if (file) {
    console.log("Got file:", file.originalname);
    console.log("File Path: ", file.path);
    try {
      await loadAndEmbed(file.path);
    } catch (err) {
      console.error("Error embedding file:", err);
      return res.status(500).json({ error: "File embedding failed" });
    }
  }

  try {
    const response = await ragChain.invoke({ question });
    res.json({ answer: response });
  } catch (err) {
    console.error("RAG error:", err);
    res.status(500).json({ error: "RAG failed" });
  }
});




// app.post('/upload',upload.single('file'),async (req,res)=>{
//     const file=req.file;
//     const content=await PdfParse(file.path);
//     console.log(content);
//     res.json({content});
// })