import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthSelector, clearState, loginUser } from "../redux/features/_Index";
import { LoginSchema } from "../utils/validations/Validator";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(AuthSelector);

    const initialValue = {
        Email: "",
        Password: "",
    };

    useEffect(() => {
        dispatch(clearState());
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
        if (isSuccess) {
            dispatch(clearState());
            navigate("/", false);
        }
    }, [isError, isSuccess]);

    return (
        <>
            <ToastContainer />
            <Formik
                initialValues={initialValue}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    dispatch(loginUser(values));
                }}
            >
                {(formik) => (
                    <Form
                        className="mx-auto d-flex flex-column justify-content-center border rounded-3 my-4 p-3"
                        style={{ width: "500px" }}
                    >
                        <div className="form-group mt-3">
                            <label htmlFor="Email">Email</label>
                            <Field
                                type="text"
                                name="Email"
                                placeholder="Email"
                                autoComplete="off"
                                className={`mt-2 form-control
                                ${formik.touched.Email && formik.errors.Email ? "is-invalid" : ""}`}
                                onChange={formik.handleChange}
                            />
                            <ErrorMessage
                                component="div"
                                name="Email"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="form-group mt-3 ">
                            <label htmlFor="Password">Password</label>
                            <Field
                                type="Password"
                                name="Password"
                                placeholder="Password"
                                className={`mt-2 form-control
                                ${
                                    formik.touched.Password && formik.errors.Password
                                        ? "is-invalid"
                                        : ""
                                }`}
                                onChange={formik.handleChange}
                            />
                            <ErrorMessage
                                component="div"
                                name="Password"
                                className="invalid-feedback"
                            />
                        </div>
                        <div className="row my-4">
                            <div className="col d-flex justify-content-center">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="form2Example31"
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="form2Example31">
                                        Show password
                                    </label>
                                </div>
                            </div>

                            <div className="col text-center">
                                <Link to="/resetpassword">Forgot password?</Link>
                            </div>
                        </div>
                        {isFetching ? (
                            <div
                                className="spinner-border text-primary"
                                role="status"
                                style={{ margin: "0 auto" }}
                            ></div>
                        ) : null}
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Sign in
                        </button>

                        <div className="text-center">
                            <p>
                                Not a member? <Link to="/register">Register</Link>
                            </p>
                            <p>or sign up with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="bi bi-facebook"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="bi bi-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="bi bi-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="bi bi-github"></i>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
