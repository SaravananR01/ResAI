import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { askGemini } from './agent.js';

const port=8080 || process.env.PORT;

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`Server Listening on PORT : ${port}`);
});

app.get('/test',(req,res)=>{
    console.log('works');
    res.send("works");
});

app.post('/ask', async (req,res)=>{
    console.log("call works");
    const question = req.body.question;
    console.log(question);
    try{
        const response =await askGemini(question);
        console.log(response);

    }catch (error){
        res.status(500).json({error:"something went wrong"});
    }
});