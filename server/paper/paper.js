const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const fs=require('fs'); 
const Question = require('../Model/QuestionSchema');

function generateHTML(data,subject){     
    return `<html>
    <head>
      <meta charset="UTF-8">
      <title>RGPV 2023 Question Paper</title>
      <style>
        /* Set the paper size and margins */
        @page {
          size: A4 portrait;
          margin: 2cm;
        }
  
        /* Set the font size and style */
        body {
          font-family: Arial, sans-serif;
          font-size: 12pt;
        }
  
        /* Set the section heading styles */
        h1, h2 {
          font-size: 14pt;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
        }
  
        /* Set the question and option styles */
        .question {
          margin-top: 30px;
        }
  
        .question p {
          margin-bottom: 10px;
        }
  
        .option {
          margin-left: 30px;
        }
  
        .option p {
          margin-bottom: 5px;
        }
  
        /* Set the footer text and style */
        footer {
          position:relative;
          bottom: 0;
          left: 0;
          right: 0;
          height: 30px;
          text-align: center;
          font-size: 10pt;
          font-style: italic; 
      
        }
      </style>
    </head>
    <body>
      <h1>UIT RGPV</h1>
      <h2>CSE 2023 Question Paper</h2>
  
      <h2>${subject}</h2> 
      ${ 
         data.map((q,i)=>{
            return `<div class="question">
            <p>${i+1} ${q.question}</p>
            <div class="option">
              <p>(A) ${q.option1}</p>
              <p>(B) ${q.option2}</p>
              <p>(C) ${q.option3}</p>
              <p>(D) ${q.option4}</p>
            </div>
          </div>`;
         })
     
      }
      <footer>
        This question paper is property of UIT RGPV 2023 and must be returned after the examination.
      </footer>
    </body>
  </html>`
} 

// //html to pdf converter
function convertTopdf(html){  
    const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: '10mm',
    };
   // creating  pdf from html  
   return new Promise(function(resolve,reject){
              
      pdf.create(html, options).toFile('./paper/output.pdf', (err, res) => {
            if (err) return console.log(err);
             console.log(res); 
             try{
             const data =fs.readFileSync('./paper/output.pdf');
               resolve(data);
             }catch(err){
                reject('Error')
             }            
       }); 
   })
}

router.get('/paper/:subject',async (req,res)=>{
    const subject = req.params.subject;
 
    try { 
        const questions= await Question.find({ subject: subject }); 
        const html=generateHTML(questions,subject);  
        
        convertTopdf(html).then((data)=>{
            res.contentType("application/pdf")
            res.send(data);
        }).catch((err)=>{
            res.status(404).json({ message: "Something is wrong! plz try again...." });
        });   
       
    } catch (err) {
        res.status(404).json({ message: "Something is wrong! plz try again...." });
    }
})

module.exports =router;