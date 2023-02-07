import React from "react";
import DatePicker from "react-datepicker";
import { stypes } from "../common/Common";

class UserTripsFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter,
            carsForFilter: this.props.carsForFilter,
            isShowFilter: false,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            filter: props.filter,
            carsForFilter: props.carsForFilter,
        });
        if (Object.keys(this.props.filter).length === 0) {
            this.setState({
                isShowFilter: false,
            });
        } else {
            this.setState({
                isShowFilter: true,
            });
        }
    }

    resetFilter() {
        this.props.resetFilter();
        this.setState({
            isShowFilter: false,
        });
    }

    onFilterChange(event) {
        var filter;
        if (event.target.name !== "carId") {
            filter = {
                ...this.props.filter,
                carId: "",
                [event.target.name]: event.target.value,
            };
        } else {
            filter = {
                ...this.props.filter,
                [event.target.name]: event.target.value,
            };
        }
        this.props.setFilter(filter);
        this.props.getTrips(filter);
        this.setState({
            isShowFilter: true,
        });
    }

    onFromTimeChange(date) {
        const filter = {
            ...this.props.filter,
            fromTime: date.valueOf(),
        };
        this.props.setFilter(filter);
        this.props.getTrips(filter);
    }

    onToTimeChange(date) {
        const filter = {
            ...this.props.filter,
            toTime: date.valueOf(),
        };
        this.props.setFilter(filter);
        this.props.getTrips(filter);
    }

    render() {
        const hasFilter = this.props.checkHasFilter();
        const viewMode = this.props.viewMode;
        const mode = this.props.mode;
        const carsForFilter = this.state.carsForFilter;
        const stype = this.state.filter.stype;
        const isShowFilter = this.state.isShowFilter;

        const sortValue =
            this.state.filter && this.state.filter.sort > 0
                ? this.state.filter.sort
                : this.props.defaultFilter.sort;
        const userTypeValue =
            this.state.filter && this.state.filter.userType > 0
                ? this.state.filter.userType
                : this.props.defaultFilter.userType;
        const carId =
            this.state.filter && this.state.filter.carId
                ? this.state.filter.carId
                : this.props.defaultFilter.carId;
        const status =
            this.state.filter && this.state.filter.status > 0
                ? this.state.filter.status
                : this.props.defaultFilter.status;
        const fromTime =
            this.state.filter && this.state.filter.fromTime > 0
                ? this.state.filter.fromTime
                : this.props.defaultFilter.fromTime;
        const toTime =
            this.state.filter && this.state.filter.toTime > 0
                ? this.state.filter.toTime
                : this.props.defaultFilter.toTime;

        return (
            <div className="content-filter">
                <div className="rent-car" style={{ paddingTop: "0px" }}>
                    <span className="slstitle">Chế độ</span>
                    <div className="line-radio line-form">
                        <label className="custom-radio custom-control">
                            <input
                                className="custom-control-input"
                                type="radio"
                                name="stype"
                                value={stypes.SD}
                                checked={stype === stypes.SD.toString()}
                                onChange={this.onFilterChange.bind(this)}
                            />
                            <span className="custom-control-indicator" />
                            <span className="custom-control-description">Tự lái</span>
                        </label>
                        <label className="custom-radio custom-control">
                            <input
                                className="custom-control-input"
                                type="radio"
                                name="stype"
                                value={stypes.WD}
                                checked={stype === stypes.WD.toString()}
                                onChange={this.onFilterChange.bind(this)}
                            />
                            <span className="custom-control-indicator" />
                            <span className="custom-control-description">Có tài xế</span>
                        </label>
                    </div>

                    {isShowFilter && mode == viewMode.TRIPS && (
                        <span className="slstitle">Sắp xếp</span>
                    )}
                    {isShowFilter && mode == viewMode.TRIPS && (
                        <div className="line-form">
                            <div className="wrap-select">
                                <select
                                    name="sort"
                                    onChange={this.onFilterChange.bind(this)}
                                    value={sortValue}
                                >
                                    <option value="3">Ưu tiên thay đổi</option>
                                    <option value="1">Ưu tiên thời gian đặt</option>
                                    <option value="2">Ưu tiên thời gian khởi hành</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {isShowFilter && (
                        <div>
                            {" "}
                            <span className="slstitle">Lọc theo</span>
                            <div className="line-form">
                                <div className="wrap-select">
                                    <select
                                        name="userType"
                                        onChange={this.onFilterChange.bind(this)}
                                        value={userTypeValue}
                                    >
                                        <option value="0">Tất cả</option>
                                        <option value="1">Chuyến thuê</option>
                                        <option value="2">Chuyến cho thuê</option>
                                    </select>
                                </div>
                            </div>
                            <span className="slstitle">Trạng thái</span>
                            <div className="line-form">
                                <div className="wrap-select">
                                    {mode == viewMode.TRIPS ? (
                                        <select
                                            name="status"
                                            onChange={this.onFilterChange.bind(this)}
                                            value={status}
                                        >
                                            <option value="0">Tất cả</option>
                                            <option value="1">Chờ duyệt</option>
                                            <option value="2">Đã duyệt</option>
                                            <option value="3">Đã đặt cọc</option>
                                            <option value="4">Đang thuê</option>
                                            <option value="5">Đã kết thúc</option>
                                        </select>
                                    ) : (
                                        <select
                                            name="status"
                                            onChange={this.onFilterChange.bind(this)}
                                            value={status}
                                        >
                                            <option value="0">Tất cả</option>
                                            <option value="1">Chờ duyệt</option>
                                            <option value="2">Đã từ chối</option>
                                            <option value="3">Đã duyệt</option>
                                            <option value="4">Đang đặt cọc</option>
                                            <option value="5">Đã hủy</option>
                                            <option value="6">Đang thuê</option>
                                            <option value="7">Đã kết thúc</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {isShowFilter && mode == viewMode.HISTORY && (
                        <span className="slstitle">Bắt đầu</span>
                    )}
                    {isShowFilter && mode == viewMode.HISTORY && (
                        <div className="line-form">
                            {fromTime && fromTime > 0 ? (
                                <div className="wrap-input datepicker">
                                    <DatePicker
                                        selected={new Date(fromTime)}
                                        timeFormat="HH:mm"
                                        dateFormat="dd/MM/yyyy"
                                        onChange={this.onFromTimeChange.bind(this)}
                                    />
                                </div>
                            ) : (
                                <div className="wrap-input datepicker">
                                    <DatePicker
                                        timeFormat="HH:mm"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Bất kì"
                                        onChange={this.onFromTimeChange.bind(this)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {isShowFilter && mode === viewMode.HISTORY && (
                        <span className="slstitle">Kết thúc</span>
                    )}
                    {isShowFilter && mode === viewMode.HISTORY && (
                        <div className="line-form">
                            {toTime && toTime > 0 ? (
                                <div className="wrap-input datepicker">
                                    <DatePicker
                                        selected={new Date(toTime)}
                                        timeFormat="HH:mm"
                                        dateFormat="dd/MM/yyyy"
                                        onChange={this.onToTimeChange.bind(this)}
                                    />
                                </div>
                            ) : (
                                <div className="wrap-input datepicker">
                                    <DatePicker
                                        timeFormat="HH:mm"
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Bất kì"
                                        onChange={this.onToTimeChange.bind(this)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {isShowFilter && userTypeValue !== 1 && (
                        <span className="slstitle">Theo xe</span>
                    )}
                    {isShowFilter && userTypeValue !== 1 && (
                        <div className="line-form">
                            <div className="wrap-select">
                                <select
                                    name="carId"
                                    onChange={this.onFilterChange.bind(this)}
                                    value={carId}
                                >
                                    <option value="">Tất cả</option>
                                    {carsForFilter &&
                                        carsForFilter.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    )}
                    <div className="space m"></div>
                    <a
                        className={`btn btn-default btn--m btn-reset ${
                            hasFilter ? "has-dot-red" : ""
                        }`}
                        style={{ width: "100%" }}
                        onClick={this.resetFilter.bind(this)}
                    >
                        <i className="ic ic-reset"></i> Bỏ lọc
                    </a>
                </div>
            </div>
        );
    }
}
export default UserTripsFilter;
