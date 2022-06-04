import icon from "../../assets/icons/assignment_turned_in_FILL1.svg";
import "./Login.css";
import React, { useState, useEffect, useRef } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import validator from "validator";

function Login() {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [passwordType, setPasswordType] = useState("password");
  const emailRef = useRef();
  const passwordRef = useRef();
  const dobRef = useRef();
  const subscribeRef = useRef();

  // by default email is focused
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  //   on submit it will validate the inputs
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const dob = dobRef.current.value;
    const isSubscribed = subscribeRef.current.checked;

    const isEmailValid = validator.isEmail(email);
    const isPasswordValid = password.length >= 8;

    if (!isEmailValid) {
      emailRef.current.focus();
      setEmailError("Please provide a valid email.");
    } else {
      setEmailError(false);
    }

    if (!isPasswordValid) {
      isEmailValid && passwordRef.current.focus();
      setPasswordError("Password should be more than 8 characters.");
    } else {
      setPasswordError(false);
    }
  };
  //   change password type
  const changePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  let url = "";

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4 bg-white mt-50 card-body">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Login Here
          </button>
        </div>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="exampleModalLabel">
                  <img className="img-icon" alt="clipboard-icon" src={icon} />{" "}
                  Sign up
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-offers">
                <p>
                  <span>
                    Become a member — you'll enjoy exclusive deals, offers,
                    invites and rewards.
                  </span>
                </p>
              </div>
              <div className="modal-body">
                {/* print success and error message */}
                {/* {successMsg && <p className="successMsg alert alert-success">{successMsg}</p>} */}
                {/* {errorMsg && <p className="errorMsg  alert alert-danger">{errorMsg}</p>} */}
                {/* form is initiated */}
                <form onSubmit={handleOnSubmit} noValidate>
                  <div className="form-group mb-20">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${emailError && "is-invalid"} ${
                        emailError === false && "is-valid"
                      }`}
                      name="email"
                      id="email"
                      placeholder="exampler@handler.com"
                      ref={emailRef}
                      // value={state.username}
                      autoComplete="off"
                      // onChange={handleInputChange}
                    />
                    <small className={`${emailError && "invalid-feedback"} `}>
                      {!!emailError && emailError}
                    </small>
                    <small className={`${!emailError && "valid-feedback"} `}>
                      {!emailError && "You're good to go"}
                    </small>
                  </div>
                  <div className="form-group mb-20">
                    <label htmlFor="password">
                      Create a Password <span className="required">*</span>
                    </label>
                    <div className="input-group mb-20">
                      <input
                        type={passwordType}
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="at least 8 characters"
                        ref={passwordRef}
                        // value={state.password}
                        autoComplete="off"
                        // onChange={handleInputChange}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-eye-icon"
                          type="button"
                          onClick={changePasswordType}
                        >
                          {passwordType === "password" ? (
                            <i className="bi bi-eye-slash-fill"></i>
                          ) : (
                            <i className="bi bi-eye-fill"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    <PasswordStrengthBar
                      className="password-sidebar mt-10"
                      // password={state.password}
                      minLength={8}
                      onChangeScore={(score, feedback) => {
                        console.log(score, feedback);
                      }}
                    />
                    <small>{!!passwordError && passwordError}</small>
                  </div>
                  <div className="form-group mb-20">
                    <label htmlFor="dob">
                      Date of birth <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      className="form-control"
                      name="dob"
                      id="dob"
                      placeholder="MM/DD/YYYY"
                      ref={dobRef}
                      max={new Date().toISOString().slice(0, 10)}
                      // value={state.dob}
                      autoComplete="off"
                      // onChange={handleInputChange}
                    />
                  </div>
                  <p className="note">
                    We want to give you a special treat on your Birthday
                  </p>
                  <div className="form-group mb-20">
                    <label htmlFor="subscribe">
                      <input
                        type="checkbox"
                        name="subscribe"
                        ref={subscribeRef}
                        // value={state.subscribe}
                        // onChange={handleInputChange}
                      />{" "}
                      Subscribe to Newsletter
                    </label>
                  </div>
                  <div className="form-group mb-20">
                    <button
                      type="submit"
                      className="btn btn-lg form-control btn-login"
                    >
                      Become a member
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer text-center">
                <p>
                  <span className="already-text">Already have an account?</span>{" "}
                  <a className="login-a" href={url}>
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
