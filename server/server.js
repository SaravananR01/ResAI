import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { askGemini } from './agent.js';
import multer from 'multer';
//import PdfParse from 'pdf-parse';

const port=8080 || process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`Server Listening on PORT : ${port}`);
});

// ask endpoint
app.post('/ask', async (req,res)=>{
    console.log("call works");
    const question = req.body.question;
    console.log(question);
    try{
        const response =await askGemini(question);
        console.log(response);
        res.status(200).json({response});

    }catch (error){
        res.status(500).json({error:"something went wrong"});
    }
});


//upload
const upload=multer({dest:'uploads/'});

// app.post('/upload',upload.single('file'),async (req,res)=>{
//     const file=req.file;
//     const content=await PdfParse(file.path);
//     console.log(content);
//     res.json({content});
// })