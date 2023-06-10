import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuestion = (props) => {
    // console.log(props.subject)
    const subject = props.subject;
    const [question, setQuestion] = useState({
        Question: "", opt1: "", opt2: "", opt3: "", opt4: "", Answer: ""
    })

    let value, name;
    const inputHandle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setQuestion({ ...question, [name]: value });
    }

    const sumbitHandle = async (e) => {
        e.preventDefault();
        // console.log(question)
        const { Question, opt1, opt2, opt3, opt4, Answer } = question;

        const res = await fetch('/questions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subject: subject,
                question: Question,
                option1: opt1,
                option2: opt2,
                option3: opt3,
                option4: opt4,
                correctAns: Answer
            })
        })
        const data = await res.json();
        if (res.status === 201) {
            toast.success(data.message);
            
            setQuestion({ Question: "", opt1: "", opt2: "", opt3: "", opt4: "", Answer: "" })
        }
        
        // console.log(data);
    }

    return (
        <>
            <div className="modal fade" id="addQuestion" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Question</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className=" conrainer form-signin">
                                <form method='post' onSubmit={sumbitHandle} >
                                    <div className="form-floating ">
                                        <input name="Question" type="text" className="form-control" id="question" placeholder="Question" required value={question.Question} onChange={inputHandle} />
                                        <label htmlFor="question">Question</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt1" type="text" className="form-control" id="opt1" placeholder="Option first" required value={question.opt1} onChange={inputHandle} />
                                        <label htmlFor="opt1">(1)</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt2" type="text" className="form-control" id="opt2" placeholder="Option second" required value={question.opt2} onChange={inputHandle} />
                                        <label htmlFor="opt2">(2)</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt3" type="text" className="form-control" id="opt3" placeholder="Option third" required value={question.opt3} onChange={inputHandle} />
                                        <label htmlFor="opt3">(3)</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt4" type="text" className="form-control" id="opt4" placeholder="Option fourth" required value={question.opt4} onChange={inputHandle} />
                                        <label htmlFor="opt4">(4)</label>
                                    </div>

                                    <div className="form-floating mt-1">
                                        <input name="Answer" type="number" className="form-control" id="answer" placeholder="Answer" required value={question.Answer} onChange={inputHandle} />
                                        <label htmlFor="answer">Answer</label>
                                    </div>
                                    
                                    <div className='mt-2 d-flex justify-content-around'>
                                        <button className="btn btn-outline-danger" type="reset">Clear</button>
                                        <button className="btn btn-outline-primary" type="submit">Add</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddQuestion;
