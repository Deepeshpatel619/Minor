const express = require('express');
const router = express.Router();
const Question = require('../Model/QuestionSchema');

// Add question
router.post('/questions', async (req, res) => {
    const { subject, question, option1, option2, option3, option4, correctAns } = req.body;
    try {
        if (!subject || !question || !option1 || !option2 || !option3 || !option4 || !correctAns) {
            return res.status(422).json({ message: "plz filled all feilds" });
        } else {
            const ques = new Question({ subject, question, option1, option2, option3, option4, correctAns });
            ques.save();
            res.status(201).json({ message: "Question Added" });
        }
    } catch (err) {
        res.status(404).json({ message: "Something is wrong!" });
    }
})

// fatch questions
router.get('/questions/:subject', async (req, res) => {
    const subject = req.params.subject;
    try {
        const info = await Question.find({ subject: subject });
        res.json(info);
    } catch (err) {
        res.status(404).json({ message: "Something is wrong! plz try again...." });
    }
})

// Delete Question  

router.delete('/questions/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        await Question.deleteOne({ _id: _id });
        res.json({ message: "Question deleted." });
    } catch (err) {
        console.log(err);
    }
})

// // Update Question
router.put('/questions/:id', async (req, res) => {
    const id = req.params.id;
 
    try {
      const pro = await Question.findOneAndUpdate({"_id":id}, req.body);
      res.status(201).json({ message: "Question Updated" });
    } catch (error) {
        console.log(error);
    }

}) 
module.exports = router;