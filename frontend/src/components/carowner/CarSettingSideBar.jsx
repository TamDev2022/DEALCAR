import React from "react";
import { NavLink } from "react-router-dom";
export default function CarSettingSideBar(props) {
    const { car } = props;
    return (
        <div className="sidebar sidebar-settings hide-on-med-and-down">
            <ul>
                <li className="heading">
                    <p>THÔNG TIN CHUNG</p>
                </li>
                <li>
                    <NavLink
                        className={() => (props.handler === "#infosetting" ? "active" : "")}
                        to={`/carsetting/${props.carId}#infosetting`}
                    >
                        <i className="ic ic-infomation"></i> Thông tin
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={() => (props.handler === "#photossetting" ? "active" : "")}
                        to={`/carsetting/${props.carId}#photossetting`}
                    >
                        <i className="ic ic-photo"></i> Hình ảnh
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={() => (props.handler === "#paperssetting" ? "active" : "")}
                        to={`/carsetting/${props.carId}#paperssetting`}
                    >
                        <i className="ic ic-license"></i> Giấy tờ xe
                        {props.reddot && <span className="has-reddot"></span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={() => (props.handler === "#tripssetting" ? "active" : "")}
                        to={`/carsetting/${props.carId}#tripssetting`}
                    >
                        <i className="ic ic-management"></i> Quản lý chuyến
                    </NavLink>
                </li>

                <li className={`heading ${car.sd !== 1 ? "text-disabled" : ""}`}>
                    <p>CHO THUÊ TỰ LÁI</p>
                    {car.sd === 1 && car.timeApprovedSD === 0 && (
                        <span className="status">
                            <span className="status orange-dot"></span>Đang chờ duyệt
                        </span>
                    )}
                </li>

                {car.sd === 1 && (
                    <div style={{ transition: ".3s ease all" }}>
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#pricesetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#pricesetting`}
                            >
                                <i className="ic ic-setting-price"></i> Giá cho thuê
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#calendarsetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#calendarsetting`}
                            >
                                <i className="ic ic-setting-calendar"></i> Lịch xe
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#rentingtimesetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#rentingtimesetting`}
                            >
                                <i className="ic ic-thunderbolt"></i> Thiết lập thời gian cho thuê
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                className={props.handler === "#deliverysetting" ? "active" : ""}
                                to={`/carsetting/${props.carId}#deliverysetting`}
                            >
                                <i className="ic ic-delivery"></i> Giao xe tận nơi
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#policiessetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#policiessetting`}
                            >
                                <i className="ic ic-policy"></i> Thủ tục cho thuê
                            </NavLink>
                        </li>
                    </div>
                )}

                <li className={`heading ${car.wd !== 1 ? "text-disabled" : ""}`}>
                    <p>CHO THUÊ CÓ TÀI XẾ </p>
                    {car.wd === 1 && car.timeApprovedWD === 0 && (
                        <span className="status">
                            <span className="status orange-dot"></span>Đang chờ duyệt
                        </span>
                    )}
                </li>
                {car.wd === 1 && (
                    <div style={{ transition: ".3s ease all" }}>
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#wdpricesetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#wdpricesetting`}
                            >
                                <i className="ic ic-setting-price"></i> Giá cho thuê
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#wdcalendarsetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#wdcalendarsetting`}
                            >
                                <i className="ic ic-setting-calendar"></i> Lịch xe
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#wdrentingtimesetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#wdrentingtimesetting`}
                            >
                                <i className="ic ic-thunderbolt"></i> Thiết lập thời gian cho thuê
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={() =>
                                    props.handler === "#wdpoliciessetting" ? "active" : ""
                                }
                                to={`/carsetting/${props.carId}#wdpoliciessetting`}
                            >
                                <i className="ic ic-policy"></i> Thủ tục cho thuê
                            </NavLink>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    );
}
