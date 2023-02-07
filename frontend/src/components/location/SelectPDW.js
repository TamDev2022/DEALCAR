import React, { useState, useEffect } from "react";

export default function SelectPDW(props) {
    const handleChangeProvince = (e) => {
        props.handleChangeProvince(e.target.value);
    };

    const handleChangeDistrict = (e) => {
        props.handleChangeDistrict(e.target.value);
    };

    const handleChangeWard = (e) => {
        props.handleChangeWard(e.target.value);
    };
    return (
        <>
            <div className="pwd-container">
                <div className="location-option provinces">
                    <label>Thành phố, tỉnh</label>
                    <select
                        id="select-provinces"
                        className="form-select"
                        aria-label="Thành phố, tỉnh"
                        onChange={handleChangeProvince}
                    >
                        <option value="">Thành phố, tỉnh</option>
                        {props.dataProvinces.map((option, index) => (
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
                        value={props.StateCreateCar.location.district}
                    >
                        <option value="">Quận, huyện</option>
                        {props.dataDistricts.map((option, index) => (
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
                        value={props.StateCreateCar.location.ward}
                    >
                        <option value="">Phường, Xã</option>
                        {props.dataWards.map((option, index) => (
                            <option key={index} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}
