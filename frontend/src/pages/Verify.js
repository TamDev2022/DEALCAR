import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthSelector, clearState, confirmRegister } from "../redux/features/_Index";

// url= "/"
function Verify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isSuccess, isError, isFetching, isLogged, errorMessage } =
        useSelector(AuthSelector);
    const [code, setCode] = useState("");

    const VerifyCodeHandle = (e) => {
        e.preventDefault();
        dispatch(confirmRegister({ VerifyCode: code }));
    };

    useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
        if (isSuccess) {
            dispatch(clearState());
            navigate("/login", false);
        }
    }, [isError, isSuccess]);

    const codeOnChange = (e) => {
        setCode(e.target.value);
    };
    return (
        <>
            <ToastContainer />
            <div
                className="my-4 mx-auto d-flex flex-column justify-content-center border rounded-3"
                style={{ width: "500px" }}
            >
                <form className="m-4">
                    <input
                        className="form-control"
                        type="text"
                        name="VerifyCode"
                        placeholder="Code"
                        value={code}
                        onChange={codeOnChange}
                    />
                    <button
                        type="button"
                        className="btn btn-primary my-2"
                        onClick={VerifyCodeHandle}
                    >
                        Xác nhận
                    </button>
                </form>
            </div>
        </>
    );
}

export default Verify;
