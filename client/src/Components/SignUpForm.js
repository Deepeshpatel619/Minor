import React, { useState } from "react";
import Swal from 'sweetalert2';
const SignUpForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const inputHandle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const resetHandle = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    });
  };
  const postData = async (e) => {
    e.preventDefault();
    // console.log(e)
    const { firstName, lastName, email, phone, password, cpassword } = user;
    const name = firstName + " " + lastName;
    const response = await fetch("/register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        cpassword,
      }),
    });

    const data = await response.json();

    if (response.status === 422 || !data) {
      // console.log("Invalid data ")
      // window.alert(data["message"]);
      Swal.fire(data['message'], '', 'warning');
      // console.log(data)
    } else {
      // window.alert("succes");
      Swal.fire('successful signup', '', 'success');
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="signup"
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
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <main>
                <div>
                  <div className="col-md-12">
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Please sign-up </strong>
                    </div>
                    <form
                      method="post"
                      className="needs-validation"
                      onSubmit={(e) => postData(e)}
                    >
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <label htmlFor="firstName" className="form-label">
                            First name
                          </label>
                          <input
                            name="firstName"
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First name"
                            value={user.firstName}
                            onChange={inputHandle}
                            required
                          />
                          <div className="invalid-feedback">
                            Valid first name is required.
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <label htmlFor="lastName" className="form-label">
                            Last name
                          </label>
                          <input
                            name="lastName"
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last name"
                            value={user.lastName}
                            onChange={inputHandle}
                            required
                          />
                          <div className="invalid-feedback">
                            Valid last name is required.
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">
                            Email{" "}
                          </label>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="you@example.com"
                            value={user.email}
                            onChange={inputHandle}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a valid email address.
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="phone" className="form-label">
                            Mobile number{" "}
                          </label>
                          <input
                            name="phone"
                            type="number"
                            className="form-control"
                            id="phone"
                            placeholder="Mobile number"
                            value={user.phone}
                            onChange={inputHandle}
                          />
                          <div className="invalid-feedback">
                            Please enter a valid Mobile number.
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="password"
                            value={user.password}
                            onChange={inputHandle}
                            required
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="cpassword" className="form-label">
                            {" "}
                            Confirm password
                          </label>
                          <input
                            name="cpassword"
                            type="password"
                            className="form-control"
                            id="cpassword"
                            placeholder="confirm password"
                            value={user.cpassword}
                            onChange={inputHandle}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter same password as in password.
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="reset"
                          className="btn btn-outline-danger me-2"
                          onClick={resetHandle}
                        >
                          reset
                        </button>
                        <button
                          type="submit"
                          className="btn btn-outline-success"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
