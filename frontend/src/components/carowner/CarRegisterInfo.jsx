import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectPDW from "../components/location/SelectPDW";
import LocationApi from "../api/LocationApi";
import carPhotoDefault from "../static/images/upload/defaultCar.png";
import { Editor } from "@tinymce/tinymce-react";
import { TextEditor } from "../components/editor/TextEditor";
import CarApi from "../api/CarApi";
import { stypes } from "../components/common/Common";

// url= "/create-car"
function CarRegisterInfo(props) {
    const handleChangeProvince = (value) => {
        setStateCreateCar({
            ...StateCreateCar,
            location: { ...StateCreateCar.location, provinceId: value, districtId: "" },
        });
        setDataDistricts([]);
        setDataWards([]);
    };

    const handleChangeDistrict = (value) => {
        setStateCreateCar({
            ...StateCreateCar,
            location: { ...StateCreateCar.location, districtId: value, wardId: "" },
        });
        setDataWards([]);
    };

    const handleChangeWard = (value) => {
        setStateCreateCar({
            ...StateCreateCar,
            location: { ...StateCreateCar.location, wardId: value },
        });
    };
    const handleChooseCar = () => {};

    const onChangeDescription = (e) => {
        setStateCreateCar({ ...StateCreateCar, desc: e.target.getContent() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await CarApi.PostCreateCar(
            JSON.stringify({ desc: StateCreateCar.desc.toString() })
        );
        console.log(res);
    };

    return (
        <>
            <div className="container mb-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-6">
                        <form onSubmit={handleSubmit}>
                            <SelectPDW
                                StateCreateCar={StateCreateCar}
                                dataProvinces={dataProvinces}
                                dataDistricts={dataDistricts}
                                dataWards={dataWards}
                                handleChangeProvince={handleChangeProvince}
                                handleChangeDistrict={handleChangeDistrict}
                                handleChangeWard={handleChangeWard}
                            />
                            <div className="mb-3">
                                <label className="form-label">Tên</label>
                                <input
                                    type="text"
                                    name="Name"
                                    className="form-control"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hãng xe</label>
                                <div className="d-flex">
                                    <select className="form-select" name="BrandId">
                                        {carBrand.map((option, index) => (
                                            <option key={index} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại xe</label>
                                <select className="form-select" name="drive">
                                    {carDrive.map((option, index) => (
                                        <option key={index} value={option.stype}>
                                            {option.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số ghế</label>
                                <input
                                    type="number"
                                    name="SG"
                                    className="form-control"
                                    min={0}
                                    defaultValue={0}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Truyền động</label>
                                <select
                                    className="form-select"

                                    // onChange={this.onTransmisionChange.bind(this)}
                                    // value={this.props.transmision}
                                >
                                    <option value="1">Số tự động</option>
                                    <option value="2">Số sàn</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nhiên liệu</label>
                                <select
                                    className="form-select"
                                    // onChange={onFuelChange.bind(this)}
                                    // value={props.fuel}
                                >
                                    <option value="1">Xăng</option>
                                    <option value="2">Dầu diesel</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mức tiêu thụ nhiêu liệu)</label>
                                <input
                                    type="text"
                                    name="MTT"
                                    className="form-control"
                                    placeholder="MTT/100km"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Giá</label>
                                <input
                                    type="text"
                                    name="Price"
                                    className="form-control"
                                    placeholder="Price"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tính năng</label>
                                <select className="form-select" name="TN">
                                    {carTN.map((option, index) => (
                                        <option key={index} value={option.id}>
                                            {option.val}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <textarea
                                    type="text"
                                    name="Description"
                                    rows={4}
                                    className="form-control"
                                    placeholder="Description"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Địa chỉ nhận xe</label>
                                <input
                                    type="text"
                                    name="AddressBooking"
                                    className="form-control"
                                    placeholder="Address"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Điều khoản</label>
                                <textarea
                                    type="text"
                                    name="Rules"
                                    className="form-control"
                                    placeholder="Policy"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hình ảnh</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    name="ImgCar"
                                    className="form-control"
                                    placeholder="Images"
                                    onChange={handleChooseCar}
                                />
                            </div>

                            <TextEditor onChange={onChangeDescription} />

                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">
                                    Đăng Ký
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarRegisterInfo;
