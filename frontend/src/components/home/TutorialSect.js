import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import step1 from "../../static/images/media/homev1/step-1.svg";
import step2 from "../../static/images/media/homev1/step-2.svg";
import step3 from "../../static/images/media/homev1/step-3.svg";
import step4 from "../../static/images/media/homev1/step-4.svg";

function TutorialSect() {
    const data = [
        {
            src: step1,
            alt: "Đặt xe",
            detail: "Đặt xe với CarDeal",
        },
        {
            src: step2,
            alt: "Nhận giao xe",
            detail: "Nhận hoặc giao xe tận nơi",
        },
        {
            src: step3,
            alt: "Trải nghiệm",
            detail: "Trải nghiệm chuyến đi",
        },
        {
            src: step4,
            alt: "Kết thúc",
            detail: "Kết thúc giao dịch",
        },
    ];
    const [tutorialCar, setTutorialCar] = useState([data]);
    return (
        <>
            <div className="tutorial__sect">
                <div className="m-container">
                    <h3 className="title-car">Hướng dẫn thuê xe</h3>
                    <Link to="" className="link-tutorial link-none">
                        <div className="step-box-wrap">
                            {data.map((item, index) => (
                                <div key={index} className="step-box-item">
                                    <div className="step-img">
                                        <div className="fix-img">
                                            <img src={item.src} alt={item.alt} />
                                        </div>
                                    </div>
                                    <div className="step-detail">
                                        <h3>{item.detail}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default React.memo(TutorialSect);
