import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import carPhotoDefault from "../static/images/upload/defaultCar.png";
import CarApi from "../api/CarApi";

import { CarStatus, formatPrice, formatTitleInUrl } from "../components/common/Common";
import { CommonErr } from "../components/common/CommonErr";
import { LoadingInline, LoadingPage } from "../components/common/Loading";
import { MessagePage, MessageBox } from "../components/common/MessageBox";
import InfiniteScroll from "react-infinite-scroller";
import { Modal } from "react-bootstrap";

// url= "/dashboard"
function Dashboard() {
    const [StateDash, setStateDash] = useState({
        cars: [],
        user: [],
        statusFeature: 1,
        err: CommonErr.INNIT,
        errMsg: "",
        isShowConfirmRemove: false,
        activeCarId: 0,
        filterStatus: 0,
        cancelReasons: null,
        ip_cancel_reason: "t0",
        ip_comment: "",
        showMessageBox: false,
        loadMore: true,
    });

    useEffect(() => {
        setStateDash({
            ...StateDash,
            err: CommonErr.LOADING,
        });
        switch (StateDash.statusFeature) {
            case 1:
                try {
                    setStateDash({
                        ...StateDash,
                        err: CommonErr.LOADING,
                    });
                    const pos = StateDash.cars.length;
                    CarApi.GetCarsManagement(StateDash, pos).then((resp) => {
                        // console.log(resp);
                        if (resp.success) {
                            setStateDash({
                                ...StateDash,
                                cars: StateDash.cars.concat(resp.data),
                                err: CommonErr.SUCCESS,
                            });
                        } else {
                            setStateDash({
                                ...StateDash,
                                err: CommonErr.FAIL,
                            });
                        }
                    });
                } catch (error) {
                    console.log(error);
                    setStateDash({
                        ...StateDash,
                        err: CommonErr.FAIL,
                    });
                }
                break;
            case 2:
                break;
            default:
                break;
        }
    }, [StateDash.statusFeature, StateDash.filterStatus]);

    const onClickCarManagement = (e) => {
        e.preventDefault();
        setStateDash({
            ...StateDash,
            statusFeature: 1,
        });
    };

    const onClickUserManagement = (e) => {
        e.preventDefault();
        setStateDash({
            ...StateDash,
            statusFeature: 2,
        });
    };

    const getCarsMoreManagement = () => {
        const nextPos = StateDash.cars.length;
        console.log(nextPos);
        CarApi.GetCarsManagement(StateDash, nextPos).then((resp) => {
            if (resp.success && resp.data.length > 0) {
                setStateDash({
                    ...StateDash,
                    cars: StateDash.cars.concat(resp.data),
                    err: CommonErr.SUCCESS,
                });
            } else {
                setStateDash({
                    ...StateDash,
                    loadMore: false,
                    err: CommonErr.FAIL,
                });
            }
        });
    };

    const onFilterStatusChange = (event) => {
        window.scroll(0, 0);
        setStateDash({
            ...StateDash,
            cars: [],
            filterStatus: event.target.value * 1,
            loadMore: true,
        });
    };

    return (
        <>
            <div className="container-dash">
                <div className="wrap-feature">
                    <div className="box-content">
                        <button className="btn w-100" onClick={onClickCarManagement}>
                            Quản lý xe
                        </button>
                    </div>
                    <div className="box-content">
                        <button className="btn w-100" onClick={onClickUserManagement}>
                            Quản doanh user
                        </button>
                    </div>
                </div>
                <div className="wrap-content">
                    <div className="filter-box">
                        <div className="content-filter">
                            <div className="line-form">
                                <label className="label">Trạng Thái </label>
                                <div className="wrap-select">
                                    <select className="form-select" onChange={onFilterStatusChange}>
                                        <option value="0">Tất cả</option>
                                        <option value="1">Đang chờ duyệt</option>
                                        <option value="2">Đang hoạt động</option>
                                        <option value="3">Đã bị từ chối </option>
                                        <option value="5">Đang tạm ngừng</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Feature
                        StateDash={StateDash}
                        getCarsMoreManagement={getCarsMoreManagement}
                        properties={StateDash.cars.slice()}
                    />
                </div>
            </div>
        </>
    );
}

export default Dashboard;

function Feature(props) {
    switch (props.StateDash.statusFeature) {
        case 1:
            let properties = props.properties;
            if (properties) {
                if (props.StateDash.filterStatus !== 0) {
                    properties = properties.filter((car) => {
                        return car.status === props.StateDash.filterStatus;
                    });
                }
                if (properties.length > 0) {
                    return (
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={props.getCarsMoreManagement}
                            hasMore={props.StateDash.loadMore == true}
                            loader={
                                <ul key={0}>
                                    <LoadingInline />
                                </ul>
                            }
                        >
                            <div className="listing-car">
                                {properties.map((car, index) => (
                                    <CarItem key={index} car={car} id={car._id} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    );
                } else {
                    return <MessagePage message={"Không tìm thấy xe nào."} />;
                }
            } else {
                return (
                    <MessagePage
                        message={
                            "Bạn chưa có xe nào. Hãy đăng kí xe ngay để có cơ hội kiếm thêm thu nhập hàng tháng."
                        }
                    />
                );
            }
            break;
        default:
            return <></>;
            break;
    }
}

function CarItem(props) {
    return props.car ? (
        <div className="trip-box-manage">
            <div className="box-wrap">
                <div className="item-car status-trips">
                    <p className="status">{CarStatus[props.car.status]}</p>
                    <div className="car-img">
                        <div className="fix-img">
                            <Link
                                to={`/car/${props.car.sd === 0 ? "wd/" : ""}${formatTitleInUrl(
                                    props.car.name
                                )}/${props.car._id}`}
                            >
                                <img
                                    src={
                                        props.car.photos.length > 0
                                            ? props.car.photos[0].thumbUrl
                                            : carPhotoDefault
                                    }
                                    alt={`Cho thuê xe tự lái ${props.car.name}`}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="desc-car">
                    <div className="desc-content">
                        <h2>{props.car.name}</h2>
                        <div className="wrap-line">
                            <StarRatings
                                rating={props.car.rating.avg}
                                starRatedColor="#00a550"
                                starDimension="17px"
                                starSpacing="1px"
                            />
                            <div className="bar-line"></div>
                            <p>{props.car.totalTrips} chuyến </p>
                        </div>
                        {props.car.sd === 1 && (
                            <p className="cost">
                                Giá tự lái:
                                <span className="price">{formatPrice(props.car.price)}</span>
                            </p>
                        )}
                        {props.car.wd === 1 && (
                            <p className="cost">
                                Giá có tài xế:{" "}
                                <span className="price">
                                    {formatPrice(props.car.wdShort.price)}
                                </span>
                            </p>
                        )}
                        {props.car.locationAddr !== "" && (
                            <p className="marginTop-xs">
                                <i className="ic ic-sm-car-location"></i>
                                {props.car.locationAddr}
                            </p>
                        )}
                    </div>
                    <div className="desc-btn">
                        <Link
                            className={"btn btn-secondary btn--m"}
                            to={`/car/${props.car.sd === 0 ? "wd/" : ""}${formatTitleInUrl(
                                props.car.name
                            )}/${props.car._id}`}
                        >
                            Xem chi tiết
                        </Link>
                        <Link
                            className={"btn btn-primary btn--m"}
                            to={`/carsetting/${props.car._id}`}
                        >
                            Quản lý xe
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}
