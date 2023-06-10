import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate,} from "react-router-dom";
import logo from './Images/global-education1.png';

import LoginForm from './LoginForm';
import setUserDetailsContext from '../Context/setUserDetailsContext';


function Navbar() { 
    let location = useLocation();
    const navigate = useNavigate();
    const {userDetails,setUserDetails} = useContext(setUserDetailsContext);
    const handleLogout=()=>{
        window.location.href='/';
        setUserDetails({id:"",userName:"",email:"",mobile:""});
        localStorage.removeItem('user');
        // navigate("/about");
    } 
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUserDetails(foundUser);
        }
      },[]);
    return (
        <>
            <nav className="navbar sticky-top bg-body-tertiary navbar-dark bg-dark navbar-expand-lg">
                <div className="container-fluid">
                    <div className='navLogo d-inline'>
                        <img src={logo} alt="logo" ></img>
                    </div>
                    <Link className="navbar-brand" to="/"><b style={{ color: "rgb(130 219 255)" }}>Q</b>UIZZY</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/practice" ? "active" : ""} `} to="/practice">Practice</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/adminpanel">Admin</Link>
                            </li> */}
                            <li><Link className={`nav-link ${location.pathname === "" ? "active" : ""} `} data-bs-toggle="offcanvas" to="#offcanvasRight" role="button" aria-controls="offcanvasRight">
                                Contact Us
                            </Link></li>
                    
                        </ul>
                        {userDetails.userName !== "" ?
                            <button type="button" className="btn btn-outline-info me-5  dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userDetails.userName.split(' ')[0]}
                                </Link>
                                <ul className="dropdown-menu">
                                   {userDetails.userName.split(' ')[0]!="Admin"?<li><Link className="dropdown-item" to="/user/profile">Profile</Link></li>:""}
                                   {userDetails.userName.split(' ')[0]!="Admin"?<li><Link className="dropdown-item" to="/user/performance">Performance</Link></li>:""}
                                   {userDetails.userName.split(' ')[0]=="Admin"?<li><Link className="dropdown-item" to="/adminpanel">AdminPanel</Link></li>:''}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#" onClick={handleLogout}>Logout</Link></li>
                                </ul>

                            </button>
                            : <>
                                <button type="button" className="btn btn-outline-light"><Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#login" to='/login'>Login</Link></button>
                                <button type="button" className="btn btn-outline-warning ms-3 me-4"><Link className="nav-link active" data-bs-toggle="modal" data-bs-target="#signup">Sign Up</Link></button>
                            </>

                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;

