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
import { UserTripsFilter } from "../components/carowner/UserTripFilter";

const viewMode = {
    TRIPS: 0,
    HISTORY: 1,
};

const defaultFilter = {
    sort: 3,
    userType: 0,
    status: 0,
    carId: "",
    fromTime: 0,
    toTime: 0,
    stype: 0, // 0:all 1:sd 2: wd
};

export function TripBar(props) {
    const [state, setState] = useState({ hasFilter: false });
    // const scomponentWillReceiveProps = (props) => {
    //     const hasFilter = props.checkHasFilter();
    //     setState({
    //         hasFilter: hasFilter,
    //     });
    // };

    return (
        <div className="finding-control form-default shadow">
            <div className="wrapper-find wrapper-new-trips">
                <div className="tab-trips">
                    <ul>
                        <li>
                            <button
                                className={
                                    "btn btn-info " +
                                    (props.mode === viewMode.TRIPS ? "active" : "deactive")
                                }
                                // onClick={props.viewMyTrips}
                            >
                                Chuyến hiện tại
                            </button>
                        </li>
                        <li>
                            <button
                                className={
                                    "btn btn-info " +
                                    (props.mode === viewMode.HISTORY ? "active" : "deactive")
                                }
                                // onClick={props.viewTripHistories}
                            >
                                Lịch sử chuyến
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="tab-filter">
                    <button
                        className={"btn btn-warning " + (state.hasFilter ? " has-dot-red" : "")}
                        // onClick={props.openFilter}
                    >
                        <i className="ic ic-filter-black"></i>
                        <span>Bộ lọc</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MyTrips() {
    const [stateMyTrip, setStateMyTrip] = useState({
        err: CommonErr.INNIT,
        mode: 0,
        trips: [],
        cars: [],
        carsForFilter: [],
        profiles: [],
        filter: [],
        isOpenFilterTrip: false,
    });

    const checkHasFilter = () => {
        const sortValue =
            this.state.filter && this.state.filter.sort > 0
                ? this.state.filter.sort
                : defaultFilter.sort;
        const userTypeValue =
            this.state.filter && this.state.filter.userType > 0
                ? this.state.filter.userType
                : defaultFilter.userType;
        const carId = this.state.filter && this.state.filter.carId ? this.state.filter.carId : "";
        const status =
            this.state.filter && this.state.filter.status > 0
                ? this.state.filter.status
                : defaultFilter.status;
        const fromTime =
            this.state.filter && this.state.filter.fromTime > 0
                ? this.state.filter.fromTime
                : defaultFilter.fromTime;
        const toTime =
            this.state.filter && this.state.filter.toTime > 0
                ? this.state.filter.toTime
                : defaultFilter.toTime;
        const stype =
            this.state.filter && this.state.filter.stype > 0
                ? this.state.filter.stype
                : defaultFilter.stype;

        return (
            sortValue != defaultFilter.sort ||
            userTypeValue != defaultFilter.userType ||
            carId != defaultFilter.carId ||
            status != defaultFilter.status ||
            fromTime != defaultFilter.fromTime ||
            toTime != defaultFilter.toTime ||
            stype != defaultFilter.stype
        );
    };

    const toggleFilterTrip = () => {
        setStateMyTrip({
            isOpenFilterTrip: !stateMyTrip.isOpenFilterTrip,
        });
    };
    return (
        <>
            <div className="container-mytrips">
                <TripBar mode={stateMyTrip.mode} />
            </div>
        </>
    );
}
