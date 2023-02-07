import React, { useState } from "react";
import { CarFuel, CarTransmission } from "../common/Common";
import { CommonErr } from "../common/CommonErr";
import { LoadingInline } from "../common/Loading";
import { MessageBox } from "../common/MessageBox";

export default function CarSettingInfo(props) {
    const [state, setState] = useState({
        err: CommonErr.SUCCESS,
        errMsg: "",
        updateErrMsg: "",
        isOpenAddressBox: false,
        car: props.car,
    });

    function onFuelRateChange(event) {
        setState({
            fuelConsumption: event.target.value,
        });
    }

    function onDescChange(event) {
        setState({
            desc: event.target.value,
        });
    }

    function onFeaturesChange(event) {
        const featuresAll = state.featuresAll.slice();
        for (var i = 0; i < featuresAll.length; ++i) {
            const feature = featuresAll[i];
            if (event.target.value === feature.id) {
                feature.checked = event.target.checked;
            }
        }
        setState({
            featuresAll: featuresAll,
        });
    }

    // address
    function onAddressLocationUpdate(location) {
        setState({
            address: location.address,
            lat: location.lat,
            lng: location.lng,
            cityId: location.cityId,
            districtId: location.districtId,
            wardId: location.wardId,
            street: location.street,
        });
    }

    function onAddressFocus(event) {
        if (!state.address || state.address === "") {
            toogleLocationPicker();
            event.target.blur();
        }
    }

    function onAddressChange(event) {
        setState({
            address: event.target.value,
        });
        if (!event.target.value || event.target.value === "") {
            toogleLocationPicker();
            event.target.blur();
        }
    }

    function toogleLocationPicker() {
        setState({
            isShowLocationPicker: !state.isShowLocationPicker,
        });
    }

    function hideMessageBox() {
        setState({
            updateErrMsg: "",
        });
    }

    function showAddressBox() {
        setState({
            isOpenAddressBox: true,
        });
    }

    function closeAddressBox() {
        setState({
            isOpenAddressBox: false,
        });
    }

    function callingUpdateCarInfo() {}

    function updateCarInfo() {}

    if (state.err === CommonErr.INNIT) {
        return <LoadingInline />;
    } else {
        const {
            car,
            featuresAll,
            cityId,
            wardId,
            districtId,
            street,
            lat,
            lng,
            isOpenAddressBox,
            address,
        } = state;
        return (
            <div className="content">
                {/* {state.err === CommonErr.LOADING && <LoadingOverlay />} */}
                {state.updateErrMsg && state.updateErrMsg !== "" && (
                    <MessageBox
                        error={state.err}
                        message={state.updateErrMsg}
                        show={state.updateErrMsg && state.updateErrMsg !== ""}
                        hideModal={hideMessageBox}
                    />
                )}
                <div className="content-container">
                    <div className="space m clear"></div>
                    <div className="form-default">
                        <div className="position-relative pos-1">
                            <div className="line-form">
                                <h3 className="title">Địa chỉ xe</h3>
                                {/* <FormAddressBox
                                    show={isOpenAddressBox}
                                    close={closeAddressBox}
                                    cityId={cityId}
                                    wardId={wardId}
                                    districtId={districtId}
                                    street={street}
                                    address={address}
                                    onUpdate={onAddressLocationUpdate}
                                    locAddress={{ lat, lng }}
                                /> */}
                                <div className="wrap-input has-ico-search">
                                    <i onClick={showAddressBox} className="ic ic-map"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={address}
                                        disabled={true}
                                        placeholder={"Địa chỉ mặc định để giao nhận xe."}
                                        style={{ background: "#fff" }}
                                    />
                                </div>
                            </div>
                            {/* {state.address !== "" && state.lat !== 0 && state.lng !== 0 && (
                                <CarMapLocation
                                    address={state.address}
                                    location={{ lat: state.lat, lng: state.lng }}
                                />
                            )} */}
                        </div>
                        <div className="space m clear"></div>
                        {/* --> */}
                    </div>
                    <h3>Thông tin cơ bản</h3>
                    <div className="form-default">
                        <div className="col-1 clear">
                            <div className="line-form">
                                <label className="label">Số ghế</label>
                                <div className="wrap-input">
                                    <input
                                        type="number"
                                        name="SG"
                                        className="form-control"
                                        value={car.seat}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="line-form">
                                <label className="label">Truyền động</label>
                                <div className="wrap-input">
                                    <input
                                        className="form-control"
                                        type="text"
                                        // value={CarTransmission[car.optionsTransmission]}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-1 clear">
                            <div className="line-form">
                                <label className="label">Loại nhiên liệu</label>
                                <div className="wrap-input">
                                    <input
                                        type="text"
                                        className="form-control"
                                        // value={CarFuel[car.optionsFuel]}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="line-form">
                                <label className="label">Mức tiêu thụ nhiên liệu (lít/100km)</label>
                                <div className="wrap-input">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={state.fuelConsumption}
                                        onChange={onFuelRateChange}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space m clear"></div>
                    <h3>Mô tả</h3>
                    <div className="form-default">
                        <div className="line-form end">
                            <textarea
                                className="textarea form-control"
                                wrap="hard"
                                onChange={onDescChange}
                                placeholder="Huyndai Elantra số tự động đăng kí tháng 06/2018.
                            Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách.
                            Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch.
                            Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."
                                value={state.desc}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="space m clear"></div>
                    <h3>Tính năng</h3>
                    <div className="car-feature__sect">
                        <div className="list-feature">
                            {/* {featuresAll &&
                                featuresAll.map((option) => {
                                    return (
                                        <div className="squaredThree have-label" key={option.id}>
                                            <input
                                                id={option.id}
                                                type="checkbox"
                                                checked={option.checked ? true : false}
                                                value={option.id}
                                                onChange={onFeaturesChange}
                                                name="filter-car-feature"
                                            />
                                            <label className="description" htmlFor={option.id}>
                                                <div className="thumbnail">
                                                    <img
                                                        className="img-fluid"
                                                        src={option.logo}
                                                        alt={option.name}
                                                    />
                                                    <span style={{ fontSize: ".875rem" }}>
                                                        {option.name}
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    );
                                })} */}
                        </div>
                    </div>
                    <div className="space m"></div>
                    <div className="line"></div>
                    <a className="btn btn-primary btn--m" onClick={callingUpdateCarInfo}>
                        Lưu thay đổi
                    </a>
                </div>
            </div>
        );
    }
}
