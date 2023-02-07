import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AuthSelector, logoutUser, checkAuth, clearState } from "../../redux/features/_Index";
import logo from "../../static/images/upload/logo.png";

function Header() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, isFetching, isSuccess, isError, isLogged, errorMessage } =
        useSelector(AuthSelector);

    const [isClickDropOpt, setIsClickDropOpt] = useState(false);
    const wrapperRef = useRef(null);
    const handleClickDropOpt = () => {
        setIsClickDropOpt(isClickDropOpt ? false : true);
    };

    useEffect(() => {
        if (!isLogged) {
            dispatch(checkAuth());
        }
        dispatch(clearState());
    }, [isLogged]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsClickDropOpt(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, isClickDropOpt]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <>
            <header>
                <div className="pre-container px-3 py-1 border-bottom">
                    <div className="menu-header d-flex justify-content-end">
                        <div className="option">
                            <Link to="helper" className="nav-link">
                                Help
                            </Link>
                        </div>
                        <div className="option">
                            {!isLogged && (
                                <Link to="login" className="nav-link">
                                    Login
                                </Link>
                            )}
                        </div>
                        <div className="option">
                            {!isLogged && (
                                <Link to="register" className="nav-link">
                                    Sign up
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pre-container px-3">
                    <div className="wrap-menu-header">
                        <div className="wrap-flex-menu">
                            <div className="logo-header">
                                <Link to="/" className="nav-link">
                                    <img src={logo} alt="Deal-Car" />
                                </Link>
                            </div>

                            <div className="list-menu">
                                <div className="option line-bottom">
                                    <Link to="find-car" className="nav-link">
                                        Thuê xe
                                    </Link>
                                </div>

                                <div className="option line-bottom">
                                    <Link to="create-car" className="nav-link">
                                        Đăng ký xe
                                    </Link>
                                </div>
                            </div>

                            <div className="list-menu manage-menu">
                                {user.Role == "ADMIN" && (
                                    <div className="option line-bottom">
                                        <Link to="dashboard" className="nav-link">
                                            <i className="icon bi bi-speedometer2"></i>
                                            Dashboard
                                        </Link>
                                    </div>
                                )}

                                <div
                                    className={`option ${isClickDropOpt ? "is-click" : ""}`}
                                    ref={wrapperRef}
                                    onClick={handleClickDropOpt}
                                >
                                    {isLogged && (
                                        <div className="title-drop-option">
                                            <div className="avtuser">
                                                <img
                                                    className="rounded-circle me-1"
                                                    src={user.Avatar}
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {isLogged && (
                                        <div className="drop-option-container">
                                            <div className="drop-option">
                                                <Link to="profile" className="nav-link">
                                                    Tài khoản
                                                </Link>
                                            </div>
                                            <div className="drop-option">
                                                <Link to="mycars" className="nav-link">
                                                    Xe của tôi
                                                </Link>
                                            </div>
                                            <div className="drop-option">
                                                <Link to="mytrips" className="nav-link">
                                                    Chuyến của tôi
                                                </Link>
                                            </div>
                                            <div className="drop-option btn-opt">
                                                <button
                                                    className="btn border-0"
                                                    onClick={handleLogout}
                                                >
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
