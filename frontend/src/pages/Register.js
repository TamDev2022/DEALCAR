import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AvatarDefault } from "../constants/ImageDefault";
import { AuthSelector, registerUser, clearState } from "../redux/features/_Index";
import { RegisterSchema } from "../utils/validations/Validator";
import { toast, ToastContainer } from "react-toastify";
export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, isSuccess, isFetching, errorMessage } = useSelector(AuthSelector);

    var [FileSelect, setFileSelect] = useState({
        ImageSrc: AvatarDefault,
    });

    const initialValue = {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        PhoneNumber: "",
        Address: "",
        Avatar: "",
    };

    const chooseAvatarHandle = (e) => {
        if (e.target.files && e.target.files[0]) {
            let ImageFile = e.target.files[0];
            console.log(ImageFile);
            var reader = new FileReader();

            reader.onload = (x) => {
                if (reader.readyState === 2) {
                    setFileSelect({
                        ImageSrc: reader.result,
                    });
                    // console.log(reader.result);
                }
            };
            reader.readAsDataURL(ImageFile);
        } else {
            setFileSelect({
                ImageSrc: AvatarDefault,
            });
        }
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
            navigate("/verification", false);
        }
    }, [isError, isSuccess]);

    return (
        <>
            <ToastContainer />
            <div className="container d-flex justify-content-center my-5">
                <Formik
                    initialValues={initialValue}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                        const data = {
                            ...values,
                            Avatar: FileSelect.ImageSrc,
                        };
                        dispatch(registerUser(data));
                    }}
                >
                    {({ touched, errors, values, handleChange }) => (
                        <Form
                            className="row p-4 border rounded-3 position-relative"
                            style={{ width: "500px" }}
                        >
                            <div className="my-4">
                                <div className="col-lg-12 text-center">
                                    <h1 className="text-center">Register Form</h1>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="FirstName">First Name</label>
                                <Field
                                    type="text"
                                    name="FirstName"
                                    placeholder="First Name"
                                    autoComplete="off"
                                    className={`mt-2 form-control ${
                                        touched.FirstName && errors.FirstName ? "is-invalid" : ""
                                    }`}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="FirstName"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group mt-3 ">
                                <label htmlFor="LastName">Last Name</label>
                                <Field
                                    type="text"
                                    name="LastName"
                                    placeholder="Last Name"
                                    autoComplete="off"
                                    className={`mt-2 form-control ${
                                        touched.LastName && errors.LastName ? "is-invalid" : ""
                                    }`}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />

                                <ErrorMessage
                                    component="div"
                                    name="LastName"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group mt-3 ">
                                <label htmlFor="Email">Email</label>
                                <Field
                                    type="Email"
                                    name="Email"
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                    className={`mt-2 form-control ${
                                        touched.Email && errors.Email ? "is-invalid" : ""
                                    }`}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
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
                                    className={`mt-2 form-control ${
                                        touched.Password && errors.Password ? "is-invalid" : ""
                                    }`}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="Password"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="form-group mt-3 ">
                                <label htmlFor="PhoneNumber">Phone Number</label>
                                <Field
                                    type="tel"
                                    name="PhoneNumber"
                                    placeholder="Phone Number"
                                    autoComplete="off"
                                    className={`mt-2 form-control ${
                                        touched.PhoneNumber && errors.PhoneNumber
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="PhoneNumber"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="Address">Address</label>
                                <Field
                                    type="text"
                                    name="Address"
                                    placeholder="Address"
                                    autoComplete="off"
                                    className={`mt-2 form-control ${
                                        touched.Address && errors.Address ? "is-invalid" : ""
                                    }`}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                                <ErrorMessage
                                    component="div"
                                    name="Address"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label htmlFor="Avatar">Avatar</label>
                                <div className="wrapper-box-avatar d-flex align-items-center">
                                    <div className="wrapper-upload-btn mt-2">
                                        <button className="btn">
                                            <Field
                                                accept="image/*"
                                                type="file"
                                                name="Avatar"
                                                className={`choose-file ${
                                                    touched.Avatar && errors.Avatar
                                                        ? "is-invalid"
                                                        : ""
                                                }`}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    chooseAvatarHandle(e);
                                                }}
                                                style={{ width: "100px" }}
                                            />
                                            Upload
                                        </button>
                                    </div>

                                    <div className="form-group ms-5">
                                        <img
                                            src={FileSelect.ImageSrc}
                                            alt="Avatar"
                                            className="border rounded "
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <ErrorMessage
                                component="div"
                                name="Avatar"
                                className="invalid-feedback"
                            />
                            {isFetching ? (
                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                    style={{ margin: "0 auto" }}
                                ></div>
                            ) : null}
                            <button type="submit" className="btn btn-primary btn-block mt-4">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
