import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swiper from "swiper/bundle";
import CardItem from "../car/CardItem";
import { stypes } from "../common/Common";

function CarAreaSect(props) {
    const navigate = useNavigate();

    const swiper = useRef(null);
    const isSD = props.stype === stypes.SD;

    useEffect(() => {
        new Swiper(swiper.current, {
            // Install modules
            slidesPerView: 3,
            spaceBetween: 15,
            threshold: 15,
            speed: 400,
            navigation: {
                nextEl: `${isSD ? ".next-sd-ca" : ".next-wd-ca"}`,
                prevEl: `${isSD ? ".prev-sd-ca" : ".prev-wd-ca"}`,
            },
            loop: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            preventClicks: false,
            preventClicksPropagation: false,
        });
    }, []);

    return (
        <>
            {/* Nổi bật - xe tự lái */}
            <div className="car-area__sect has-insurance">
                <div className="m-container">
                    <h3 className="title-car">
                        Xe nổi bật - {isSD ? "Xe tự lái" : "Xe có tài xế "}
                    </h3>
                    <div
                        className={`swiper-button-next ${isSD ? "next-sd-ca" : "next-wd-ca"}`}
                        role={"button"}
                    >
                        <i className="bi bi-chevron-compact-right"></i>
                    </div>
                    <div
                        className={`swiper-button-prev ${isSD ? "prev-sd-ca" : "prev-wd-ca"}`}
                        role={"button"}
                    >
                        <i className="bi bi-chevron-compact-left"></i>
                    </div>

                    <div ref={swiper} className="swiper-container swiper-car-area">
                        <div className="swiper-wrapper car-area-item">
                            {props.cars.map((item, index) => (
                                <div key={index} className="swiper-slide car-area-img">
                                    <CardItem stype={props.stype} car={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(CarAreaSect);
