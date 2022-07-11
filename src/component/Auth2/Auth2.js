import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth2.css";
import icon from "../../assets/icons/assignment_turned_in_FILL1.svg";
import PasswordStrengthBar from "react-password-strength-bar";

function Auth2() {
  const [passwordType, setPasswordType] = useState("password");
  let url = "";
  //   change password type
  const changePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        dob: "",
        subscribe: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        dob: Yup.date().max(new Date()).required("DOB is required"),
        subscribe: Yup.boolean(),
      })}
      onSubmit={(fields) => {
        alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
      }}
      render={({
        errors,
        status,
        touched,
        handleChange,
        values,
        handleBlur,
      }) => (
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
                      <img
                        className="img-icon"
                        alt="clipboard-icon"
                        src={icon}
                      />{" "}
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
                  <div className="modal-body"></div>
                  <Form>
                    <div className="form-group mb-20">
                      <label htmlFor="email">
                        Email <span className="required">*</span>
                      </label>
                      <Field
                        name="email"
                        value={values.email}
                        type="text"
                        className={
                          "form-control" +
                          (errors.email && touched.email ? " is-invalid" : "") +
                          (!errors.email && touched.email ? " is-valid" : "")
                        }
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleBlur(e)}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group mb-20">
                      <label htmlFor="password">
                        Create a Password <span className="required">*</span>
                      </label>
                      <div className="input-group mb-20">
                        <Field
                          name="password"
                          id="password"
                          placeholder="at least 8 characters"
                          type={passwordType}
                          onChange={(e) => handleChange(e)}
                          className={
                            "form-control" +
                            (errors.password && touched.password
                              ? " is-invalid"
                              : "") +
                            (!errors.password && touched.password
                              ? " is-valid"
                              : "")
                          }
                        />

                        <div className="input-group-append">
                          <button
                            className={
                              `btn btn-eye-icon` +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "") +
                              (!errors.password && touched.password
                                ? " is-valid"
                                : "")
                            }
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
                        password={values.password}
                        minLength={8}
                        onChangeScore={(score, feedback) => {
                          console.log(score, feedback);
                        }}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group mb-20">
                      <label htmlFor="dob">
                        Date of birth <span className="required">*</span>
                      </label>
                      <Field
                        type="text"
                        className={
                          "form-control" +
                          (errors.dob && touched.dob ? " is-invalid" : "") +
                          (!errors.dob && touched.dob ? " is-valid" : "")
                        }
                        onFocus={(e) => (e.target.type = "date")}
                        name="dob"
                        id="dob"
                        placeholder="MM/DD/YYYY"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <p className="note">
                      We want to give you a special treat on your Birthday
                    </p>
                    <div className="form-group mb-20">
                      <label htmlFor="subscribe">
                        <Field type="checkbox" name="subscribe" />
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
                  </Form>
                </div>
                <div className="modal-footer text-center">
                  <p>
                    <span className="already-text">
                      Already have an account?
                    </span>{" "}
                    <a className="login-a" href={url}>
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default Auth2;
