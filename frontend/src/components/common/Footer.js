import clsx from "clsx";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="bg-light text-center text-white border-top">
                <div className="container p-4 pb-0">
                    <section className="mb-4">
                        <Link
                            className="btn btn-primary btn-floating rounded-circle m-1"
                            style={{ backgroundColor: "#3b5998", border: "none" }}
                            to="#!"
                            role="button"
                        >
                            <i className="bi bi-facebook"></i>
                        </Link>

                        <Link
                            className="btn btn-primary btn-floating rounded-circle m-1"
                            style={{ backgroundColor: "#55acee", border: "none" }}
                            to="#!"
                            role="button"
                        >
                            <i className="bi bi-twitter"></i>
                        </Link>

                        <Link
                            className="btn btn-primary btn-floating rounded-circle m-1"
                            style={{ backgroundColor: "#dd4b39", border: "none" }}
                            to="#!"
                            role="button"
                        >
                            <i className="bi bi-google"></i>
                        </Link>

                        <Link
                            className="btn btn-primary btn-floating rounded-circle m-1"
                            style={{ backgroundColor: "#ac2bac", border: "none" }}
                            to="#!"
                            role="button"
                        >
                            <i className="bi bi-instagram"></i>
                        </Link>

                        <Link
                            className="btn btn-primary btn-floating rounded-circle m-1"
                            style={{ backgroundColor: "#0082ca", border: "none" }}
                            to="#!"
                            role="button"
                        >
                            <i className="bi bi-linkedin"></i>
                        </Link>
                        <Link
                            className="btn btn-primary btn-floating rounded-circle m-1"
                            style={{ backgroundColor: "#333333", border: "none" }}
                            to="#!"
                            role="button"
                        >
                            <i className="bi bi-github"></i>
                        </Link>
                    </section>
                </div>

                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                    © 2020 Copyright:
                    <Link className="text-white" to="https://mdbootstrap.com/">
                        MDBootstrap.com
                    </Link>
                </div>
            </footer>
        </>
    );
}

export default Footer;
