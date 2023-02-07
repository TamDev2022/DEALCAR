import React, { useState, useEffect } from "react";
import { CommonErr } from "../common/CommonErr";
import { LoadingInline } from "../common/Loading";

export default function CarSettingPapers(props) {
    const [state, setState] = useState({
        err: CommonErr.INNIT,
        errMsg: "",
        papers: props.papers,
    });

    if (state.err === CommonErr.INNIT) {
        return <LoadingInline />;
    } else {
        return (
            <div className="content">
                <div className="content-container">
                    <h3 className="title">Giấy tờ xe</h3>
                    <p>Giấy tờ dùng cho mục đích quản lý. Thông tin này tuyệt đối được bảo mật.</p>
                    <div className="space m"></div>
                    {state.papers.map((paper, i) => (
                        // <CarPaper
                        //     key={i}
                        //     paper={paper}
                        //     carId={carId}
                        //     tag={{
                        //         //condition solve for last element no line in bottom
                        //         lineTag:
                        //             i !== state.papers.length - 1 ? <div className="line"></div> : "",
                        //         spacemTag:
                        //             i !== state.papers.length - 1 ? <div className="space m"></div> : "",
                        //     }}
                        // />
                        <></>
                    ))}
                </div>
            </div>
        );
    }
}
