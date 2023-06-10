const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    subject:{
       type:String,
       required:true
    },
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    correctAns: {
        type: Number,
        required: true
    }
})
 
const Question = new mongoose.model("Question",questionSchema);

module.exports = Question;