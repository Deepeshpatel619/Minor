import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import AddQuestion from './AddQuestion';
import QuestionsCard from './QuestionsCard';
import EditQuestion from './EditQuestion';


const AdminPanel = () => {
    // console.log(ques[0].question);
    const [subject, setSubject] = useState("Subjects");
    const [questions, setQuestions] = useState([]);
    const [editQues, setEditQues] = useState(null);

    useEffect(() => {

        if (subject !== "Subjects") {

            fetch(`questions/${subject}`)
                .then((res) => res.json())
                .then((result) => setQuestions(result))
                .catch((err) => console.log(err));
        }
    }, [subject])

    const editQuestion = (val) => {
        //  console.log(val);
        setEditQues(val);
    }
        return (
        <>
            <ToastContainer />
            <AddQuestion subject={subject} />
            {/* <EditQuestion data ={editQues}/> */}
            {editQues && <EditQuestion data={editQues} />}
            <div className="container adminHead p-2 mt-1 d-flex justify-content-between">
                <button className=" btn btn-secondary dropdown-toggle ms-1" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                    {subject}
                </button>
                <ul className="dropdown-menu">
                    <li><span className="dropdown-item" onClick={() => setSubject("Mathematics")}>Mathematics</span></li>
                    <li><span className="dropdown-item" onClick={() => setSubject("C++ Programming")}>C++ Programming</span></li>
                    <li><span className="dropdown-item" onClick={() => setSubject("Operating System")}>Operating System</span></li>
                </ul>
                <button type="button" className="btn btn-info me-1" ><a href={`http://localhost:8000/paper/${subject}` }>Generate Paper</a></button>
                <button type="button" className={`btn btn-info me-1 ${subject === "Subjects" ? "disabled" : ""} `}><Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#addQuestion">Add</Link></button>
            </div>

            <div className="container mt-2">
                {questions.length === 0 && <div className="alert alert-info" role="alert">
                    {subject === "Subjects" ? "Please select subject!" : "There is no data available plz add question!"}
                </div>}

                <div className="accordion" id="accordionExample">

                    {/* {questions.map((val, idx) => card(val, idx))} */}
                    {questions.map((val, idx) => <QuestionsCard key={idx} val={val} idx={idx} editQuestion={editQuestion} />)}

                </div>
            </div>
        </>
    )
}

export default AdminPanel;
