import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import setUserDetailsContext from "../Context/setUserDetailsContext";
import Swal from 'sweetalert2';
const LoginForm = () => {
  const {setUserDetails} = useContext(setUserDetailsContext);
  const {userDetails}=useContext(setUserDetailsContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    role:"Student",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const loginData = async (e) => {
    e.preventDefault();
    const {role, email, password } = user;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.status === 404 || !data) {
      // window.alert("invalid data");
      Swal.fire('Invalid data', '', 'warning');
    } else { 
      setUserDetails({  
        id:data.id,
        userName:data.name,
        email:data.email,
        mobile:data.mobile
      });
      localStorage.setItem('user',JSON.stringify({
        id:data.id,
        userName:data.name,
        email:data.email,
        mobile:data.mobile
      }));
      Swal.fire('successful login ', '', 'success');
      document.getElementById("loginDismiss").click();
      navigate("/");
    }
  };

  return (
    <>
      <div
        className="modal fade "
        id="login"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                <span style={{ color: "rgb(66 200 255)" }}>Q</span>UIZZY
              </h4>
              <button
                type="button"
                className="btn-close"
                id="loginDismiss"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className=" container form-signin">
                <form method="post" onSubmit={(e) => loginData(e)}>
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    <strong>Please Log-In </strong>
                  </div>

                  <select
                    className="form-select"
                    aria-label="Default select example" 
                    name="role"
                    value={user.role}
                    onChange={inputHandle}
                  >
                    <option defaultValue>Open this select menu</option>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="form-floating mt-2">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={user.email}
                      onChange={inputHandle}
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mt-2">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={user.password}
                      onChange={inputHandle}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="checkbox mb-3 mt-2">
                    <input type="checkbox" value="remember-me" />
                    <label> Remember me</label>
                  </div>
                  <button className="btn  btn-outline-primary" type="submit">
                    Log in
                  </button>
                </form>
              </div>
        
            </div>
            <div className="modal-footer">
              <h6 className="text-muted">Don't have an account?</h6>
              <button
                type="button"
                className="btn btn-outline-warning me-2"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#signup"
              >
                Sign-up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
