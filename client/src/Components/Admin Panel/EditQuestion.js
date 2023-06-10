import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditQuestion = ({ data }) => {

    // const { question, option1, option2, option3, option4, correctAns } = data;
    // console.log(data)
    const [questions, setQuestions] = useState({
        Question:"dummy", opt1:"dummy", opt2:"dummy", opt3:"dummy", opt4:"dummy", Answer:"dummy",_id:"1"
    })

    useEffect(() => {
        const { question, option1, option2, option3, option4, correctAns ,_id } = data;
        setQuestions({ Question: question, opt1: option1, opt2: option2, opt3: option3, opt4: option4, Answer: correctAns ,_id });
    }, [data])


    let value, name;
    const inputHandle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setQuestions({ ...questions, [name]: value });
    }

        const sumbitHandle = async (e) => {
            e.preventDefault();
            // console.log(questions,data._id);
            const {_id, Question, opt1, opt2, opt3, opt4, Answer } = questions;
            console.log(_id);
            const res = await fetch(`/questions/${_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // subject: subject,
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
                
                setQuestions({ Question: "", opt1: "", opt2: "", opt3: "", opt4: "", Answer: "" })
                document.getElementById("editClose").click();
            }
            // console.log(data);
     }

    return (
        <>
            <div className="modal fade" id="editQuestion" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Question</h5>
                            <button type="button" className="btn-close" id="editClose" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className=" conrainer form-signin">
                                <form method='post' onSubmit={sumbitHandle}>
                                    <div className="form-floating ">
                                        <input name="Question" type="text" className="form-control" id="question" placeholder="Question" required value={questions.Question} onChange={inputHandle} />
                                        <label htmlFor="question">Question</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt1" type="text" className="form-control" id="opt1" placeholder="Option first" required value={questions.opt1} onChange={inputHandle} />
                                        <label htmlFor="opt1">(a)</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt2" type="text" className="form-control" id="opt2" placeholder="Option second" required value={questions.opt2} onChange={inputHandle} />
                                        <label htmlFor="opt2">(b)</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt3" type="text" className="form-control" id="opt3" placeholder="Option third" required value={questions.opt3} onChange={inputHandle} />
                                        <label htmlFor="opt3">(c)</label>
                                    </div>
                                    <div className="form-floating mt-1">
                                        <input name="opt4" type="text" className="form-control" id="opt4" placeholder="Option fourth" required value={questions.opt4} onChange={inputHandle} />
                                        <label htmlFor="opt4">(d)</label>
                                    </div>

                                    <div className="form-floating mt-1">
                                        <input name="Answer" type="number" className="form-control" id="answer" placeholder="Answer" required value={questions.Answer} onChange={inputHandle} />
                                        <label htmlFor="answer">Answer</label>
                                    </div>

                                    <div className='mt-2 d-flex justify-content-around'>
                                        <button className="btn btn-outline-danger" type="reset">Clear</button>
                                        <button className="btn btn-outline-primary" type="submit">Update</button>
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

export default EditQuestion
