import Home from "./Components/Home";
import About from "./Components/About";
import Practice from "./Components/Practice";
import TestCard from "./Components/TestCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
// import questions from "./Components/Questions";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import Footer from "./Components/Footer";
import AdminPanel from "./Components/Admin Panel/AdminPanel";
import setUserDetailsContext from "./Context/setUserDetailsContext";
import setSubjectContext from "./Context/setSubjectContext";
import { useState } from "react";
import ProfileCard from "./Components/user Profile/ProfileCard";
import profileTemplate from './Components/Images/profileTemplate.png';
import PerformanceAnalysis from "./Components/user Profile/PerformanceAnalysis";



function App() {
 
    const [subject,setSubject] = useState(""); 
    const [userDetails,setUserDetails] = useState({
      id:"",
      userName:"",
      email:"",
      mobile:""
    }); 
   
  return (
    <>
      <Router>
        <setUserDetailsContext.Provider value={{userDetails,setUserDetails}} >
            <setSubjectContext.Provider value={{subject,setSubject}} >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/practice" element={<Practice />} />
            <Route exact path="/test" element={<TestCard subject={subject} />} />
            <Route exact path="/adminpanel" element={<AdminPanel />}/> 
            <Route exact path="/user/profile" element={<ProfileCard profileImage={profileTemplate} username={userDetails.userName} bio={'A self motivated learner'} mobile={userDetails.mobile} email={userDetails.email}/>}/> 
            <Route exact path="/user/performance" element={<PerformanceAnalysis />}/> 
           
            <Route path="*" element={<><div className="container my-5 justify-self-center">
              <h1 className="text-danger justify-items-center justify-self-center  ">oops that page  not found</h1></div> </>} />
          </Routes>
          <SideBar />
          <LoginForm />
          <SignUpForm />
          <Footer/>
          </setSubjectContext.Provider>
        </setUserDetailsContext.Provider>
      </Router>
    </>
  );
}

export default App;
