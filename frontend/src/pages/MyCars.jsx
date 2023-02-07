import React, { useEffect, useState, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import StarRatings from "react-star-ratings";
import CarApi from "../api/CarApi";
import carPhotoDefault from "../static/images/upload/defaultCar.png";

import { CarStatus, formatPrice, formatTitleInUrl } from "../components/common/Common";
import { CommonErr } from "../components/common/CommonErr";
import { LoadingInline, LoadingPage } from "../components/common/Loading";
import { MessagePage, MessageBox } from "../components/common/MessageBox";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function MyCars() {
    const [StateMyCar, setStateMyCar] = useState({
        cars: [],
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
        window.scrollTo(0, 0);
        try {
            setStateMyCar({
                ...StateMyCar,
                err: CommonErr.LOADING,
            });
            const pos = StateMyCar.cars.length;
            CarApi.GetOwnerCar(0, pos).then((resp) => {
                // console.log(resp);
                if (resp.success) {
                    setStateMyCar({
                        ...StateMyCar,
                        cars: StateMyCar.cars.concat(resp.data),
                        err: CommonErr.SUCCESS,
                    });
                } else {
                    setStateMyCar({
                        ...StateMyCar,
                        err: CommonErr.FAIL,
                    });
                }
            });
        } catch (error) {
            console.log(error);
            setStateMyCar({
                ...StateMyCar,
                err: CommonErr.FAIL,
            });
        }
    }, []);

    const getOwnerCarsMore = () => {
        const nextPos = StateMyCar.cars.length;
        console.log(nextPos);
        CarApi.GetOwnerCar(0, nextPos).then((resp) => {
            if (resp.success && resp.data.length > 0) {
                setStateMyCar({
                    ...StateMyCar,
                    cars: StateMyCar.cars.concat(resp.data),
                    err: CommonErr.SUCCESS,
                });
            } else {
                setStateMyCar({
                    ...StateMyCar,
                    loadMore: false,
                    err: CommonErr.FAIL,
                });
            }
        });
    };

    const showConfirmRemove = (carId) => {
        console.log(carId);
        // CarApi.getCarSetting({ carId: carId }).then((res) => {
        //     if (res.success) {
        //         setStateMyCar({
        //             ...StateMyCar,
        //             removeReason: res.message,
        //         });
        //     } else {
        //         setStateMyCar({
        //             ...StateMyCar,
        //             err: CommonErr.FAIL,
        //         });
        //     }
        // });

        setStateMyCar({
            ...StateMyCar,
            isShowConfirmRemove: true,
            activeCarId: carId,
        });
    };

    const hideConfirmRemove = () => {
        setStateMyCar({
            ...StateMyCar,
            isShowConfirmRemove: false,
            activeCarId: 0,
            err: CommonErr.INNIT,
            errMsg: "",
        });
    };

    const handleInputChange = (event) => {
        setStateMyCar({
            ...StateMyCar,
            [event.target.name]: event.target.value,
        });
    };

    const isValidRemoveCar = () => {
        if (
            !StateMyCar.ip_cancel_reason ||
            StateMyCar.ip_cancel_reason === "" ||
            StateMyCar.ip_cancel_reason === "0"
        ) {
            return false;
        }
        if (
            StateMyCar.ip_cancel_reason === "t0" &&
            (!StateMyCar.ip_comment || StateMyCar.ip_comment === "")
        ) {
            return false;
        }
        return true;
    };

    const removeCar = () => {
        // if (!isValidRemoveCar()) {
        //     showMessageBox();
        //     setStateMyCar({
        //         ...StateMyCar,
        //         err: CommonErr.FAIL,
        //         errMsg: "Vui lòng chọn lý do hoặc ghi rõ lý do của bạn.",
        //     });
        //     return;
        // }

        const { activeCarId, ip_cancel_reason, ip_comment } = StateMyCar;

        setStateMyCar({
            ...StateMyCar,
            err: CommonErr.LOADING,
        });

        // console.log(activeCarId);
        CarApi.RemoveCar(activeCarId).then((resp) => {
            // hideConfirmRemove();
            if (resp.success == true) {
                console.log(resp);
                setStateMyCar({
                    ...StateMyCar,
                    cars: resp.data.cars,
                    err: CommonErr.SUCCESS,
                    isShowConfirmRemove: false,
                    activeCarId: 0,
                    errMsg: "",
                });
            } else {
                setStateMyCar({
                    ...StateMyCar,
                    err: CommonErr.FAIL,
                    isShowConfirmRemove: false,
                    activeCarId: 0,
                    errMsg: "",
                });
            }
        });
    };

    const onFilterStatusChange = (event) => {
        setStateMyCar({ ...StateMyCar, filterStatus: event.target.value * 1 });
    };

    const showMessageBox = () => {
        setStateMyCar({
            ...StateMyCar,
            showMessageBox: true,
        });
    };

    const hideMessageBox = () => {
        setStateMyCar({
            ...StateMyCar,
            showMessageBox: false,
        });
    };

    return (
        <>
            <div className="body has-filter">
                <div className="filter-trips" style={{ width: "325px" }}>
                    <div className="content-filter">
                        <div className="rent-car">
                            <div className="line-form">
                                <label className="label">Trạng Thái </label>
                                <div className="wrap-select">
                                    <select onChange={onFilterStatusChange}>
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
                </div>
                <div className="module-map module-car min-height-no-footer">
                    <BoxList
                        StateMyCar={StateMyCar}
                        getOwnerCarsMore={getOwnerCarsMore}
                        showConfirmRemove={showConfirmRemove}
                    />
                </div>

                <Modal
                    show={StateMyCar.isShowConfirmRemove}
                    onHide={hideConfirmRemove}
                    dialogClassName="modal-sm modal-dialog"
                >
                    <Modal.Header closeButton={true} closeLabel={""}>
                        <Modal.Title>Xác nhận xoá xe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-default form-s">
                            {/* <div className="line-form">
                                <div className="wrap-select">
                                    <select name="ip_cancel_reason" onChange={handleInputChange}>
                                        {removeReason &&
                                            removeReason.map((reason) => (
                                                <option value={reason.reason}>{reason.desc}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div className="line-form">
                                <div className="wrap-input mb-3">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Vui lòng nhập lý do hoặc lời nhắn"
                                        name="ip_comment"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div> */}

                            <div className="clear"></div>
                            <div className="space m"></div>
                            <p className="textAlign-center has-more-btn d-flex justify-content-end">
                                <button className="btn btn-danger btn--m me-2" onClick={removeCar}>
                                    Xoá
                                </button>
                                <button className="btn btn-info btn--m" onClick={hideConfirmRemove}>
                                    Hủy
                                </button>
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>

                <MessageBox
                    show={StateMyCar.showMessageBox}
                    hideModal={StateMyCar.hideMessageBox}
                    message={StateMyCar.errMsg}
                    error={StateMyCar.err}
                />
            </div>
        </>
    );
}
export default MyCars;

function BoxList({ StateMyCar, getOwnerCarsMore, showConfirmRemove }) {
    if (StateMyCar.err === CommonErr.LOADING) {
        return <LoadingPage />;
    } else {
        var properties = StateMyCar.cars.slice();
        // console.log(properties);
        if (properties) {
            if (StateMyCar.filterStatus !== 0) {
                properties = properties.filter((car) => {
                    return car.status === StateMyCar.filterStatus;
                });
            }
            if (properties.length > 0) {
                return (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={getOwnerCarsMore}
                        hasMore={StateMyCar.loadMore == true}
                        loader={
                            <ul key={0}>
                                <LoadingInline />
                            </ul>
                        }
                    >
                        <div className="listing-car">
                            {properties.map((car, index) => (
                                <CarItem
                                    key={index}
                                    car={car}
                                    id={car._id}
                                    showConfirmRemove={showConfirmRemove}
                                />
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
    }
}

function CarItem(props) {
    return props.car ? (
        <div className="trip-box">
            <button
                className="func-remove btn btn-danger rounded-circle"
                onClick={() => {
                    props.showConfirmRemove(props.car._id);
                }}
            >
                <i className="bi bi-trash"></i>
            </button>
            <div className="box-wrap">
                <div className="item-car status-trips">
                    <p className="status">{CarStatus[props.car.status]}</p>
                    <div className="car-img">
                        <div className="fix-img">
                            <a
                                href={`/car/${props.car.sd === 0 ? "wd/" : ""}${formatTitleInUrl(
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
                            </a>
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
                                Giá tự lái:{" "}
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
                            to={`/carsetting/${props.car._id}#infosetting`}
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
