import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import TestCard from './TestCard';
import setSubjectContext from '../Context/setSubjectContext';


const Practice = () => { 
 
const {subject,setSubject}  = useContext(setSubjectContext);
  
  return (
    <>
      <div className="container mt-4">
      
        <div className="card text-center mt-3">
          <div className="card-header">
            Practice Test 1
          </div>
          <div className="card-body">
            <h5 className="card-title">C++ Programming</h5>
            {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
            <Link to="/test" className="btn btn-primary"   onClick={()=>setSubject("C++ Programming")}>Start</Link>
          </div>
        
        </div>
        <div className="card text-center mt-3">
          <div className="card-header">
            Practice Test 2
          </div>
          <div className="card-body">
            <h5 className="card-title">Mathematics</h5>
            {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
            <Link to="/test" className="btn btn-primary" onClick={()=>setSubject("Mathematics")}>Start</Link>
          </div>
        
        </div> 
         
        <div className="card text-center mt-3">
          <div className="card-header">
            Practice Test 3
          </div>
          <div className="card-body">
            <h5 className="card-title">Operating System</h5>
            {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
            <Link to="/test" className="btn btn-primary" onClick={()=>setSubject("Operating System")}>Start</Link>
          </div>
        
        </div>
      </div>
    </>
  )
}

export default Practice
