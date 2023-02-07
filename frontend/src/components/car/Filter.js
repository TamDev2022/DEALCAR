import React from "react";
import { formatPrice, stypes } from "../../components/common/Common";

function Filter(props) {
    const stateFilter = props.stateFilter;
    const dataProvinces = props.dataProvinces;
    const dataDistricts = props.dataDistricts;
    const dataWards = props.dataWards;

    // handle change value filter
    const handleChangeProvince = (e) => {
        props.handleChangeProvince(e.target.value);
    };

    const handleChangeDistrict = (e) => {
        props.handleChangeDistrict(e.target.value);
    };

    const handleChangeWard = (e) => {
        props.handleChangeWard(e.target.value);
    };

    const handleChageDriver = (e) => {
        props.handleChageDriver(e.target.value);
    };

    const handleChangePrice = (e) => {
        props.handleChangePrice(e.target.value);
    };

    const handleChangeDate = (e) => {
        props.handleChangeDate(e.target.value);
    };

    const handleChangeSeat = (e) => {
        props.handleChangeSeat(e.target.value);
    };

    return (
        <div className="filter-container">
            <div className="filter-item filter-location">
                <div className="location-option provinces">
                    <label>Thành phố, tỉnh</label>
                    <select
                        id="select-provinces"
                        className="form-select"
                        aria-label="Thành phố, tỉnh"
                        onChange={handleChangeProvince}
                    >
                        <option value="">Thành phố, tỉnh</option>
                        {dataProvinces.map((option, index) => (
                            <option key={index} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="location-option districts">
                    <label>Quận, huyện</label>
                    <select
                        id="select-districts"
                        className="form-select"
                        aria-label="Quận, huyện"
                        onChange={handleChangeDistrict}
                        value={stateFilter.location.district}
                    >
                        <option value="">Quận, huyện</option>
                        {dataDistricts.map((option, index) => (
                            <option key={index} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="location-option wards">
                    <label>Phường, xã</label>
                    <select
                        id="select-wards"
                        className="form-select"
                        aria-label="Phường, xã"
                        onChange={handleChangeWard}
                        value={stateFilter.location.ward}
                    >
                        <option value="">Phường, Xã</option>
                        {dataWards.map((option, index) => (
                            <option key={index} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="filter-item filter-driver">
                <label>Tài xế</label>
                <select className="form-select" onChange={handleChageDriver}>
                    <option value={stypes.SD}>Tự lái</option>
                    <option value={stypes.WD}>Có tài xế</option>
                </select>
            </div>
            <div className="filter-item filter-price">
                <label>Giá</label>
                <input
                    type="range"
                    min={0}
                    max={5000000}
                    step={100000}
                    name="Price"
                    value={stateFilter.price}
                    className="form-range"
                    onChange={handleChangePrice}
                />
                <span>{formatPrice(stateFilter.price)}</span>
            </div>
            <div className="filter-item filter-date">
                <label>Ngày</label>
                <input type="date" value={stateFilter.dateStart} onChange={handleChangeDate} />
            </div>
            <div className="filter-item filter-seat">
                <div className="seat-box">
                    <label className="label-box" htmlFor="seat-4">
                        <div className="thumnail">
                            <img
                                src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-4-sedan.png"
                                alt=""
                            />
                        </div>
                        <span>4 ghế</span>
                    </label>
                    <input
                        type={"radio"}
                        id="seat-4"
                        name="seat-option"
                        className="seat-radio"
                        value={4}
                        onChange={handleChangeSeat}
                    />
                </div>
                <div className="seat-box">
                    <label className="label-box" htmlFor="seat-5">
                        <div className="thumnail">
                            <img
                                src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-5-suv.png"
                                alt=""
                            />
                        </div>
                        <span>5 ghế</span>
                    </label>
                    <input
                        type={"radio"}
                        id="seat-5"
                        name="seat-option"
                        className="seat-radio"
                        value={5}
                        onChange={handleChangeSeat}
                    />
                </div>
                <div className="seat-box">
                    <label className="label-box" htmlFor="seat-7">
                        <div className="thumnail">
                            <img
                                src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-suv.png"
                                alt=""
                            />
                        </div>
                        <span>7 ghế</span>
                    </label>
                    <input
                        type={"radio"}
                        id="seat-7"
                        name="seat-option"
                        className="seat-radio"
                        value={7}
                        onChange={handleChangeSeat}
                    />
                </div>

                <div className="seat-box">
                    <label className="label-box" htmlFor="seat-other">
                        <div className="thumnail">
                            <img
                                src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-mpv.png"
                                alt=""
                            />
                        </div>
                        <span>Khác</span>
                    </label>
                    <input
                        type={"radio"}
                        id="seat-other"
                        name="seat-option"
                        className="seat-radio"
                        value={0}
                        onChange={handleChangeSeat}
                    />
                </div>
                <div className="seat-box">
                    <label className="label-box" htmlFor="seat-all">
                        <div className="thumnail">
                            <img
                                src="https://n1-cstg.mioto.vn/m/vehicle-types/mf-7-mpv.png"
                                alt=""
                            />
                        </div>
                        <span>Tất cả</span>
                    </label>
                    <input
                        type={"radio"}
                        id="seat-all"
                        name="seat-option"
                        className="seat-radio"
                        value={-100}
                        defaultChecked={true}
                        onChange={handleChangeSeat}
                    />
                </div>
            </div>
        </div>
    );
}

export default Filter;
