import React from "react";

export function LoadingPage() {
    return (
        <div style={{ height: "100vh", textAlign: "center", padding: "10vh" }}>
            <div className="blah">
                <div className="lds-css">
                    <div className="lds-ellipsis" style={{ width: "100%", height: "100%" }}>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LoadingInlineSmall() {
    return (
        <div
            className="blah"
            style={{
                width: "50px",
            }}
        >
            <div className="lds-css">
                <div className="lds-ellipsis">
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LoadingInline() {
    return (
        <div className="blah">
            <div className="lds-css">
                <div className="lds-ellipsis">
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
