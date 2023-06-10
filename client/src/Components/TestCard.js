import React, { useContext, useEffect, useRef, useState } from "react";
import { createRoutesFromElements } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import setUserDetailsContext from "../Context/setUserDetailsContext";
import Swal from 'sweetalert2';
import QuizTimer from "./QuizTimer";


function TestCard(props) {
  const navigate = useNavigate();
  const subject = props.subject;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [selectedOption ,setSelectedOption]=useState(""); 
  const result= useRef({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResult,setShowResult]=useState(false);
  const {userDetails}=useContext(setUserDetailsContext);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    localStorage.removeItem('mcqResponse'); 
    if(userDetails.id==""){
      Swal.fire("Please sign in otherwise your progress will not save","","warning");
    }
    fetch(`/questions/${subject}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setData(json);
        setLoading(false);
      });

  }, []);
  // const response = [];
  const setResponse = (option) => { 
    setSelectedOption(option); 
    let responseObject=localStorage.getItem('mcqResponse');
    if(responseObject){
          responseObject=JSON.parse(responseObject); 
          responseObject={...responseObject,[data[currIndex]._id]:option};
          localStorage.setItem('mcqResponse',JSON.stringify(responseObject));
    }else
          localStorage.setItem('mcqResponse',JSON.stringify({[data[currIndex]._id]:option}));
    
  };


  const handleClick = (type) => {
    if (type === -1) { 
      setSelectedOption('');
      setCurrIndex((val) => (val > 0 ? val - 1 : val));
    }
    if (type === 1) {   
      setSelectedOption('');
      setCurrIndex((val) => (val === data.length - 1 ? val : val + 1));
    }
  };
  const postScore= async(score)=>{    
    const percentage=(score*100.0)/data.length;
    // console.log(percentage)
    if(userDetails.id!==""){
          try{
              const res = await fetch(`/score/${userDetails.id}`, {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({score:percentage.toFixed(2),subject:subject})
            });
            const data = await res.json(); 
          }catch(err){
            console.log('something went wrong !');
          } 
    }
  } 

  const handleSubmit = async ({isTimerExpired}) => { 
    let submitForm;
    if(!isTimerExpired){
      submitForm= window.confirm("Are you sure? Want to submit test ?");
      if(submitForm===false) return;
    }
    
    
    let mcqResponse=localStorage.getItem('mcqResponse');
    if(!mcqResponse){  
      postScore(result.current.score);
      setShowResult(true); 
      setLoading(true);  
      return;
    }
    mcqResponse=JSON.parse(localStorage.getItem('mcqResponse'));
    const keys=Object.keys(mcqResponse);
    data.map((ques) => {
      keys.forEach((id) => {
        if(id==ques._id) {
          if(ques.correctAns ==mcqResponse[id]){
                result.current.score+=1;
                result.current.correctAnswers+=1;  
          }
          else{
              result.current.wrongAnswers+=1;
          }    
        }
      });
    });
    postScore(result.current.score);
    setShowResult(true); 
    setLoading(true); 
   
  };
  return (
    <>
      {!loading && (
        <div className="container testCard  mt-4 d-flex justify-content-center">
          <div className="card testCard border border-primary testCardLeft">
            <div className="card-header  d-flex justify-content-between">
              <span>Question No: {currIndex + 1} / {data.length}</span>
              <QuizTimer duration={data.length*60} onTimerExpired={handleSubmit}/>
            </div>
            <div className="card-body ">
              <p>{data[currIndex].question}</p>
              <div className="ms-3 options">
                <p className={selectedOption===1?"active":""} onClick={() => setResponse(1)}>
                  A. {data[currIndex].option1}
                </p>
                <p className={selectedOption===2?"active":""} onClick={() => setResponse(2)}>
                  B. {data[currIndex].option2}
                </p>
                <p className={selectedOption===3?"active":""} onClick={() => setResponse(3)}>
                  C. {data[currIndex].option3}
                </p>
                <p className={selectedOption===4?"active":""} onClick={() => setResponse(4)}>
                  D. {data[currIndex].option4}
                </p>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button
                type="button/rest"
                className={`btn btn-outline-primary ${currIndex==0?"disabled":''}`}
                onClick={() => handleClick(-1)}
              >
                &laquo; Previous
              </button>
              { currIndex===data.length-1?(<button
                                        type="button"
                                        className={`btn btn-outline-success  `}
                                        onClick={() => handleSubmit({isTimerExpired:false})}
                                    >
                                        Submit
                                    </button>)
              :(             
              <button
                type="button"
                className={`btn btn-outline-primary`}
                onClick={() => handleClick(+1)}
              >
                Save & Next &raquo;
              </button>)}
            </div>
          </div>
        </div>
      )} 

      {showResult&&(  
         <div className="container mt-3 result d-flex justify-content-center align-items-center flex-column">
          <h3>Result</h3><hr/>
          <p>
            Total Question: <span>{data.length}</span>
          </p>
          <p>
            Total Score:<span> {result.current.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.current.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.current.wrongAnswers}</span>
          </p>
        </div>)}
    </>
  );
}

export default TestCard;
