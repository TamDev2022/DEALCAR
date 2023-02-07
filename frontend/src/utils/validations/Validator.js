import * as Yup from "yup";
const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const RegisterSchema = Yup.object().shape({
    FirstName: Yup.string().required("FirstName is required"),
    LastName: Yup.string().required("LastName is required"),
    Email: Yup.string().email("Invalid email address format").required("Email is required"),
    Password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required"),
    PhoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Phone number is required"),
    Address: Yup.string(),
    Avatar: Yup.string(),
});

const LoginSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid email address format").required("Email is required"),
    Password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required"),
});

const ResetPassSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid email address format").required("Email is required"),
});

export { RegisterSchema, LoginSchema, ResetPassSchema };
