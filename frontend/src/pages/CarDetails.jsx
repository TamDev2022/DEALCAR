import Moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { matchPath, useLocation, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swiper from "swiper/bundle";
import CarApi from "../api/CarApi";
import { CarFuel, CarTransmission, formatPrice, stypes } from "../components/common/Common";
import { CommonErr } from "../components/common/CommonErr";
import carPhotoDefault from "../static/images/upload/defaultCar.png";

function CarDetails() {
    const currentDate = Moment(new Date()).format("YYYY-MM-DD");
    const currentDateTimestamp = new Date();
    const location = useLocation();

    // console.log(location.pathname);
    // console.log(matchPath("/car/:carName/:carId", location.pathname));

    const stype = matchPath("/car/:carName/:carId", location.pathname) ? stypes.SD : stypes.WD;
    const isSD = matchPath("/car/:carName/:carId", location.pathname) ? true : false;

    // console.log("stype: " + stype + " - isSD: " + isSD);

    const [dataCar, setDataCar] = useState(null);
    const swiperCar = useRef(null);
    let { carId } = useParams();
    const [state, setState] = useState({
        err: CommonErr.INNIT,
        errMsg: "",

        isTimeBooking: true,
        totalTime: 4,
        totalDay: 1,
        startTimeBooking: 0,
        endTimeBooking: 0,
    });

    useEffect(() => {
        new Swiper(swiperCar.current, {
            // Install modules
            slidesPerView: 1,
            spaceBetween: 15,
            threshold: 15,
            speed: 400,
            navigation: {
                nextEl: ".next-img",
                prevEl: ".prev-img",
            },
            loop: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            preventClicks: false,
            preventClicksPropagation: false,
        });

        (async () => {
            try {
                let res = await CarApi.GetCarDetail(carId);
                if (res.success) {
                    setDataCar(res.data);
                } else {
                    throw new Error("failed");
                }
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {};
    }, []);

    const bookingTimes = [];
    for (var i = 0; i < 1440; i = i + 30) {
        const time = i;
        const hour = (time - (time % 60)) / 60;
        const hourLabel = hour < 10 ? `0${hour}` : `${hour}`;
        const min = time % 60;
        const minLabel = min < 10 ? `0${min}` : `${min}`;
        bookingTimes.push({ value: time, label: `${hourLabel}:${minLabel}` });
    }

    const [stateTime, setStateTime] = useState({
        startTime: 1020,
        endTime: 1020 + 180,
    });

    const [stateDate, setStateDate] = useState({
        startDate: currentDate,
        endDate: Moment(new Date(new Date().valueOf() + 86400000)).format("YYYY-MM-DD"),
    });

    const onStartTimeChange = (e) => {
        setStateTime({ ...stateTime, startTime: Number(e.target.value) });
        const TimeBooking = HandleTimeBooking(
            stateDate.startDate,
            stateDate.endDate,
            e.target.value,
            stateTime.endTime
        );
        if (!TimeBooking.isBooking) {
            setState({ ...state, isTimeBooking: false });
        } else {
            setState({ ...state, isTimeBooking: true });
        }
    };

    const onEndTimeChange = (e) => {
        setStateTime({ ...stateTime, endTime: Number(e.target.value) });
        const TimeBooking = HandleTimeBooking(
            stateDate.startDate,
            stateDate.endDate,
            stateTime.startTime,
            e.target.value
        );
        if (!TimeBooking.isBooking) {
            setState({ ...state, isTimeBooking: false });
        } else {
            setState({ ...state, isTimeBooking: true });
        }
    };
    const onChangestartDate = (e) => {
        if (e.target.value > stateDate.endDate) {
            setStateDate({
                startDate: e.target.value,
                endDate: Moment(e.target.value, "YYYY-MM-DD").add(1, "d").format("YYYY-MM-DD"),
            });
            setState({ ...state, isTimeBooking: true, totalDay: 1 });
        } else if (e.target.value >= currentDate) {
            setStateDate({
                ...stateDate,
                startDate: e.target.value,
            });
            const TimeBooking = HandleTimeBooking(
                e.target.value,
                stateDate.endDate,
                stateTime.startTime,
                stateTime.endTime
            );
            if (!TimeBooking.isBooking) {
                setState({ ...state, isTimeBooking: false, totalDay: TimeBooking.totalDay });
            } else {
                setState({ ...state, isTimeBooking: true, totalDay: TimeBooking.totalDay });
            }
        }
    };
    const onChangeendDate = (e) => {
        if (e.target.value >= currentDate) {
            setStateDate({ ...stateDate, endDate: e.target.value });
            const TimeBooking = HandleTimeBooking(
                stateDate.startDate,
                e.target.value,
                stateTime.startTime,
                stateTime.endTime
            );
            if (!TimeBooking.isBooking) {
                setState({ ...state, isTimeBooking: false, totalDay: TimeBooking.totalDay });
            } else {
                setState({ ...state, isTimeBooking: true, totalDay: TimeBooking.totalDay });
            }
        }
    };

    const HandleTimeBooking = (startDate, endDate, startTime, endTime) => {
        let timeS = Moment(startDate)
            .add(startTime / 60, "h")
            .toDate()
            .getTime();

        let timeE = Moment(endDate)
            .add(endTime / 60, "h")
            .toDate()
            .getTime();

        let totalDay;
        if (endDate == startDate) {
            totalDay = 1;
        } else {
            totalDay = Moment.duration(Moment(endDate).diff(Moment(startDate))).asDays();
        }

        let time;
        if (startTime + 180 >= 1440) {
            time = Moment(startDate)
                .add(startTime / 60, "h")
                .add(3, "h")
                .toDate()
                .getTime();
        } else {
            time = Moment(startDate)
                .add(startTime / 60, "h")
                .add(3, "h")
                .toDate()
                .getTime();
        }
        if (time <= timeE) {
            return { isBooking: true, totalDay };
        } else {
            return { isBooking: false, totalDay };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let timeS = Moment(stateDate.startDate)
            .add(stateTime.startTime / 60, "h")
            .toDate()
            .getTime();

        let timeE = Moment(stateDate.endDate)
            .add(stateTime.endTime / 60, "h")
            .toDate()
            .getTime();

        // console.log(Moment(timeE).toDate() + " - " + Moment(timeS).toDate());
        const dataPost = {
            carId,
            startTimeBooking: timeS,
            endTimeBooking: timeE,
        };

        (async () => {
            try {
                let res = await CarApi.PostBookingCarId(dataPost);
                // console.log(res);
                if (res.success) {
                    console.log(res);
                    state.err = CommonErr.SUCCESS;
                    toast.success(res.message);
                }
                // else {
                //     state.err = CommonErr.FAIL;
                //     toast.success(res.message);
                // }
            } catch (error) {
                state.err = CommonErr.FAIL;
                toast.error(error.response.data.message);
            }
        })();
    };

    return (
        <>
            <div className="booking-container">
                <div className="content-detail">
                    <div className="slide-box">
                        <div className="m-container">
                            <div className="swiper-button-next next-img">
                                <i className="bi bi-chevron-compact-right" />
                            </div>
                            <div className="swiper-button-prev prev-img">
                                <i className="bi bi-chevron-compact-left" />
                            </div>
                            <div ref={swiperCar} className="swiper-container swiper-car">
                                <div className="swiper-wrapper car-item">
                                    {dataCar && dataCar.photos.length > 0 ? (
                                        dataCar.photos.map((item, index) => (
                                            <div key={`sll_${index}`} className="swiper-slide">
                                                <div className="fix-img">
                                                    <img
                                                        src={item && item.thumbUrl}
                                                        alt={item && item.name}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="swiper-slide">
                                            <div className="fix-img">
                                                <img src={carPhotoDefault} alt={"car default"} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-detail">
                    {dataCar && (
                        <div className="info-car ">
                            <div className="group-name">
                                <h1 className="title-car">{dataCar.name}</h1>
                            </div>
                            <div className="group-line">
                                <StarRatings
                                    rating={dataCar && dataCar.rating ? dataCar.rating.avg : 0}
                                    starRatedColor="#00a550"
                                    starDimension="17px"
                                    starSpacing="1px"
                                />
                                <div className="bar-line"> </div>
                                <p>
                                    {dataCar.totalTrips > 0 ? (
                                        <span className="value">{dataCar.totalTrips} chuyến</span>
                                    ) : (
                                        `chưa có chuyến nào`
                                    )}
                                </p>
                            </div>
                            <div className="group-label">
                                <span>{CarTransmission[dataCar.optionsTransmission]}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="content-detail">
                    {dataCar && (
                        <div className="info-car--desc">
                            <div className="group">
                                <span className="lstitle-new">ĐẶC ĐIỂM</span>
                                <div className="ctn-desc-new">
                                    <ul className="features">
                                        <li>
                                            <i className="ic ic-chair" /> Số ghế:
                                            {dataCar.seat}
                                        </li>
                                        <li>
                                            <i className="ic ic-trans" /> Truyền động:{" "}
                                            {CarTransmission[dataCar.optionsTransmission]}
                                        </li>
                                        <li>
                                            <i className="ic ic-diesel" /> Nhiên liệu:{" "}
                                            {CarFuel[dataCar.optionsFuel]}
                                        </li>
                                        {dataCar.optionsFuelConsumption > 0 && (
                                            <li>
                                                <i className="ic ic-fuel-consumption" /> Mức tiêu
                                                thụ nhiêu liệu: {dataCar.optionsFuelConsumption}{" "}
                                                lít/100km
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {dataCar.desc && dataCar.desc !== "" && (
                                <div className="group">
                                    <span className="lstitle-new">MÔ TẢ</span>
                                    <div className="ctn-desc-new">
                                        <pre>{dataCar.desc}</pre>
                                    </div>
                                </div>
                            )}
                            {dataCar.features && dataCar.features.length > 0 && (
                                <div className="group">
                                    <span className="lstitle-new">TÍNH NĂNG</span>
                                    <div className="ctn-desc-new">
                                        <ul className="accessories">
                                            {dataCar.features.map(function (feature, i) {
                                                return (
                                                    <li key={i}>
                                                        <img
                                                            className="img-ico car-img-sw"
                                                            src={feature.logo}
                                                            alt="DealCar - Thuê xe tự lái"
                                                        />
                                                        {feature.name}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {isSD && (
                                <React.Fragment>
                                    <div className="group">
                                        <span className="lstitle-new">
                                            GIẤY TỜ THUÊ XE (BẢN GỐC)
                                        </span>
                                        {dataCar.requiredPapers &&
                                            dataCar.requiredPapers.length > 0 && (
                                                <div className="ctn-desc-new">
                                                    <ul className="required">
                                                        {dataCar.requiredPapers.map((paper) => (
                                                            <li key={paper.id}>
                                                                <img
                                                                    className="img-ico car-img-sw"
                                                                    src={paper.logo}
                                                                    alt="DealCar - Thuê xe tự lái"
                                                                />
                                                                {paper.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        {(!dataCar.requiredPapers ||
                                            dataCar.requiredPapers.length === 0) && (
                                            <div className="ctn-desc-new">
                                                <p>Không yêu cầu giấy tờ</p>
                                            </div>
                                        )}
                                    </div>
                                    {dataCar.mortgages && dataCar.mortgages.length > 0 && (
                                        <div className="group">
                                            <span className="lstitle-new">TÀI SẢN THẾ CHẤP</span>
                                            <div className="ctn-desc-new">
                                                {dataCar.mortgages.map((mortgage) => (
                                                    <pre key={mortgage.id}>{mortgage.name}</pre>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                            {dataCar.notes && dataCar.notes !== "" && (
                                <div className="group">
                                    <span className="lstitle-new">ĐIỀU KHOẢN</span>
                                    <div className="ctn-desc-new clause">
                                        <pre>{dataCar.notes}</pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="rent-box ">
                    {isSD ? (
                        <div className="price-car">
                            {dataCar && dataCar.priceOrigin != dataCar.price && (
                                <span className="real">{dataCar.priceOrigin / 1000}K</span>
                            )}
                            {dataCar && <h3>{dataCar.price / 1000}K/ngày</h3>}
                        </div>
                    ) : (
                        <div className="price-car">
                            {dataCar && dataCar.wdShort.priceOrigin != dataCar.wdShort.price && (
                                <span className="real">
                                    {dataCar.wdShort.priceOrigin / 1000}/ 4h
                                </span>
                            )}
                            {dataCar && <h3>{dataCar.wdShort.price / 1000}K/ 4h</h3>}
                        </div>
                    )}
                    <div className="choose-date date-start">
                        <label>Ngày bắt đầu</label>
                        <div className="wrap-input date">
                            <input
                                type="date"
                                value={stateDate.startDate}
                                onChange={onChangestartDate}
                            />
                        </div>
                        <div className="wrap-input time">
                            <select onChange={onStartTimeChange} value={stateTime.startTime}>
                                {bookingTimes.map((time) => (
                                    <option key={`s_${time.value}`} value={time.value}>
                                        {time.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="choose-date date-end">
                        <label>Ngày kết thúc</label>
                        <div className="wrap-input date">
                            <input
                                type="date"
                                value={stateDate.endDate}
                                onChange={onChangeendDate}
                            />
                        </div>
                        <div className="wrap-input time">
                            <select onChange={onEndTimeChange} value={stateTime.endTime}>
                                {bookingTimes.map((time) => (
                                    <option key={`e_${time.value}`} value={time.value}>
                                        {time.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {!state.isTimeBooking && (
                        <div className="err-mess">
                            Thời gian thuê xe không hợp lệ. Tối thiểu 3 tiếng.
                        </div>
                    )}
                    <div className="location">
                        <p>Địa điểm nhận xe: </p>
                        <i className="bi bi-geo-alt">{dataCar && dataCar.locationAddrS}</i>
                    </div>
                    <div className="calculation-price ">
                        <h3>Chi tiết giá</h3>
                        <div className="price-basic d-flex justify-content-between">
                            <p>Đơn giá thuê</p>
                            {isSD ? (
                                <p>{dataCar && formatPrice(dataCar.price)}/ngày</p>
                            ) : (
                                <p>{dataCar && formatPrice(dataCar.wdShort.price)}/ 4h</p>
                            )}
                        </div>
                        <div className="total-time d-flex justify-content-between">
                            <p>Thời gian</p>
                            {isSD ? <p>{state.totalDay} ngày</p> : <p>{state.totalTime}h</p>}
                        </div>
                        <div className="total-all d-flex justify-content-between border-top border-primary pt-2">
                            <p>Tổng cộng</p>
                            {isSD ? (
                                <p>{dataCar && formatPrice(dataCar.price * state.totalDay)}</p>
                            ) : (
                                <p>
                                    {dataCar &&
                                        formatPrice((dataCar.wdShort.price * state.totalTime) / 4)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="wrap-btn ">
                        <button
                            className="btn btn-success"
                            onClick={handleSubmit}
                            disabled={!state.isTimeBooking || !dataCar || dataCar.status != 2}
                        >
                            Đặt xe
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
        </>
    );
}
export default CarDetails;
