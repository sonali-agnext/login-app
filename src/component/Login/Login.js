import icon from "../../assets/icons/assignment_turned_in_FILL1.svg";
import "./Login.css";
import React, { useState, useEffect, useRef } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import validator from "validator";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dobRef = useRef();
  const subscribeRef = useRef();

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [dobError, setDobError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [submitCount, setSubmitCount] = useState(1);
  const [eventType, setEventType] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [emailTouched, setEmailTouched] = useState(null);
  const [passwordTouched, setPasswordTouched] = useState(null);
  const [dobTouched, setDobTouched] = useState(null);

  const invalidEmail =
    (emailError && emailTouched) || (emailError && isSubmitted);
  const invalidPassword =
    (passwordError && passwordTouched) || (passwordError && isSubmitted);
  const invalidDob = (dobError && dobTouched) || (dobError && isSubmitted);

  useEffect(() => {
    if (eventType === "submit") {
      if (emailError) {
        emailRef.current.focus();
        return;
      } else if (passwordError) {
        passwordRef.current.focus();
        return;
      } else if (dobError) {
        dobRef.current.focus();
        return;
      }
    }
  }, [emailError, passwordError, submitCount, eventType, dobError]);

  const validateEmail = (email, eventType) => {
    setEventType(eventType);
    const isEmailValid = validator.isEmail(email);

    if (!isEmailValid) {
      setEmailError("Please provide a valid email.");
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };

  const validatePassword = (password, eventType) => {
    setEventType(eventType);
    setPassword(password);
    const isPasswordValid = password.length >= 8;

    if (!isPasswordValid) {
      setPasswordError("Password should be more than 8 characters.");
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  };

  const validateDob = (dob, eventType) => {
    setEventType(eventType);
    const isDobValid = !validator.isEmpty(dob);

    if (!isDobValid) {
      setDobError("Date of birth cannot be empty.");
      return false;
    } else {
      setDobError(false);
      return true;
    }
  };

  const handleOnSubmit = (event) => {
    setIsSubmitted(true);
    event.preventDefault();
    setSubmitCount((state) => state + 1);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const dob = dobRef.current.value;
    const isSubscribed = subscribeRef.current.checked;

    const isEmailValid = validateEmail(email, event.type);
    const isPasswordValid = validatePassword(password, event.type);
    const isDobValid = validateDob(dob, event.type);

    if ((isEmailValid, isPasswordValid, isDobValid)) {
      console.log({ email, password, dob, isSubscribed });

      emailRef.current.value = "";
      passwordRef.current.value = "";
      dobRef.current.value = "";
      subscribeRef.current.checked = false;

      setEmailError(null);
      setPasswordError(null);
      setDobError(null);
      setPassword("");
    }
  };
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
                <form onSubmit={handleOnSubmit} noValidate>
                  <div className="form-group mb-20">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        invalidEmail && "is-invalid"
                      } ${emailError === false && "is-valid"}`}
                      name="email"
                      id="email"
                      placeholder="exampler@handler.com"
                      ref={emailRef}
                      autoComplete="off"
                      onBlur={(e) => {
                        setEmailTouched(true);
                        validateEmail(e.target.value, e.type);
                      }}
                      onChange={(e) => validateEmail(e.target.value, e.type)}
                    />
                    <small className={`${invalidEmail && "invalid-feedback"} `}>
                      {!!invalidEmail && emailError}
                    </small>
                    <small className={`${!invalidEmail && "valid-feedback"} `}>
                      {!invalidEmail && "You're good to go"}
                    </small>
                  </div>
                  <div className="form-group mb-20">
                    <label htmlFor="password">
                      Create a Password <span className="required">*</span>
                    </label>
                    <div className="input-group mb-20">
                      <input
                        type={passwordType}
                        className={`form-control ${
                          invalidPassword && "is-invalid"
                        } ${passwordError === false && "is-valid"}`}
                        name="password"
                        id="password"
                        placeholder="at least 8 characters"
                        ref={passwordRef}
                        autoComplete="off"
                        onBlur={(e) => {
                          setPasswordTouched(true);
                          validatePassword(e.target.value, e.type);
                        }}
                        onChange={(e) =>
                          validatePassword(e.target.value, e.type)
                        }
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
                      <small
                        className={`${invalidPassword && "invalid-feedback"} `}
                      >
                        {!!invalidPassword && passwordError}
                      </small>
                      <small
                        className={`${!invalidPassword && "valid-feedback"} `}
                      >
                        {!invalidPassword && "You're good to go"}
                      </small>
                    </div>

                    <PasswordStrengthBar
                      className="password-sidebar mt-10"
                      minLength={8}
                      password={password}
                    />
                  </div>
                  <div className="form-group mb-20">
                    <label htmlFor="dob">
                      Date of birth <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => {
                        setDobTouched(true);
                        e.target.type = "text";
                        validateDob(e.target.value, e.type);
                      }}
                      className={`form-control ${invalidDob && "is-invalid"} ${
                        dobError === false && "is-valid"
                      }`}
                      name="dob"
                      id="dob"
                      placeholder="MM/DD/YYYY"
                      ref={dobRef}
                      max={new Date().toISOString().slice(0, 10)}
                      autoComplete="off"
                      onChange={(e) => validateDob(e.target.value, e.type)}
                    />
                    <small className={`${!!invalidDob && "invalid-feedback"} `}>
                      {!!invalidDob && dobError}
                    </small>
                    <small className={`${!dobError && "valid-feedback"} `}>
                      {!invalidDob && "You're good to go"}
                    </small>
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
                      />
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
                  <span className="already-text">Already have an account?</span>
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
