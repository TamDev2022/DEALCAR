import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper/bundle";
import { stypes } from "../common/Common";

function Destination(props) {
    const swiper = useRef(null);
    const isSD = props.stype === stypes.SD;
    useEffect(() => {
        new Swiper(swiper.current, {
            slidesPerView: 5,
            spaceBetween: 15,
            threshold: 15,
            speed: 400,
            navigation: {
                nextEl: `${isSD ? ".next-sd-dest" : ".next-wd-dest"}`,
                prevEl: `${isSD ? ".prev-sd-dest" : ".prev-wd-dest"}`,
            },
            loop: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            preventClicks: false,
            preventClicksPropagation: false,
        });
    }, []);

    return (
        
        <div className={`destination__sect ${isSD ? "" : "wd-dest"}`}>
            <img src="https://netwebapi1.blob.core.windows.net/images-container/241338807_2300940316706206_3460706779179671872_n_20221021025714241338807_2300940316706206_3460706779179671872_n.webp"></img>
            <div className="m-container">
                <h3 className="title-car">
                    Địa điểm nổi bật - {isSD ? "Xe tự lái" : "Xe có tài xế "}
                </h3>
                <div className={`swiper-button-next ${isSD ? "next-sd-dest" : "next-wd-dest"}`}>
                    <i className="bi bi-chevron-compact-right"></i>
                </div>
                <div className={`swiper-button-prev ${isSD ? "prev-sd-dest" : "prev-wd-dest"}`}>
                    <i className="bi bi-chevron-compact-left"></i>
                </div>
                <div ref={swiper} className="swiper-container swiper-destination">
                    <div className="swiper-wrapper dest-item">
                        {props.topDests.map((dest, i) => {
                            return <DestinationItem key={i} dest={dest} stype={props.stype} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DestinationItem(props) {
    const dest = props.dest;

    return (
        <div className="swiper-slide dest-img box-car__item">
            <Link to={`${props.stype === stypes.SD ? "" : "/withdriver"}/city/${dest.city}`}>
                <div className="fix-img">
                    <img src={dest.image} alt={`Cho thuê xe tự lái ${dest.name}`} />
                    <h3>
                        {dest.name}
                        <span>{dest.totalCars}+ xe</span>
                    </h3>
                </div>
            </Link>
        </div>
    );
}
export default React.memo(Destination);
