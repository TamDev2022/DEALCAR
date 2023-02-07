import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper/bundle";

import features1 from "../../static/images/media/homev1/features-1.jpg"
import features2 from "../../static/images/media/homev1/features-2.jpg"
import features3 from "../../static/images/media/homev1/features-3.jpg"
import features4 from "../../static/images/media/homev1/features-4.jpg"
import features5 from "../../static/images/media/homev1/features-5.jpg"
import features6 from "../../static/images/media/homev1/features-6.jpg"


function FeatureSect() {
    const [featureItem, setFeatureItem] = useState([]);
    const data = [
        {
            src: features1,
            alt: "feature 1",
        },
        {
            src: features2,
            alt: "feature 2",
        },
        {
            src: features3,
            alt: "feature 3",
        },
        {
            src: features4,
            alt: "feature 4",
        },
        {
            src: features5,
            alt: "feature 5",
        },
        {
            src: features6,
            alt: "feature 6",
        },
    ];
    const swiper = useRef(null);
    var swiperC = null;
    useEffect(() => {
        setFeatureItem(data);
        swiperC = new Swiper(swiper.current, {
            // Install modules
            slidesPerView: 3.5,
            spaceBetween: 15,
            threshold: 15,
            speed: 400,
            navigation: {
                nextEl: ".next-ft",
                prevEl: ".prev-ft",
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
            <div className="features__sect has-insurance">
                <div className="m-container">
                    <h3 className="title-car">Tính năng nổi bật</h3>
                    <div className="swiper-button-next next-ft" role="button">
                        <i className="bi bi-chevron-right"></i>
                    </div>
                    <div className="swiper-button-prev prev-ft" role="button">
                        <i className="bi bi-chevron-left"></i>
                    </div>
                    <div
                        ref={swiper}
                        className="swiper-container swiper-features swiper-container-horizontal"
                    >
                        <div className="swiper-wrapper feature-item">
                            {featureItem.map((item, index) => (
                                <div key={index} className="swiper-slide feature-img">
                                    <div className="fix-img">
                                        <img src={item.src} alt={item.alt} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(FeatureSect);
