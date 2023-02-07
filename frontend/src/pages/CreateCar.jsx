import { customAlphabet } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CarApi from "../api/CarApi";
import LocationApi from "../api/LocationApi";
import {
    convertDateToTimeStamp,
    convertTimeStampToDate,
    getBase64,
    stypes,
} from "../components/common/Common";
import SelectPDW from "../components/location/SelectPDW";
import carPhotoDefault from "../static/images/upload/defaultCar.png";

// url= "/create-car"
function CreateCar() {
    const [StateCreateCar, setStateCreateCar] = useState({
        location: {
            provinceId: "",
            districtId: "",
            wardId: "",
            street: "",
        },
        name: "",
        seat: 0,
        sd: 1,
        wd: 0,
        optionsTransmission: 1,
        optionsFuel: 1,
        optionsFuelConsumption: 0,
        brand: { id: 1, name: "Audi" },
        features: [],
        requiredPapers: [],
        photos: [],
        papers: [],
        price: 0,
        desc: "",
        notes: "",
        startTime: convertDateToTimeStamp(new Date()),
        endTime: convertDateToTimeStamp(new Date()),
    });
    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataDistricts, setDataDistricts] = useState([]);
    const [dataWards, setDataWards] = useState([]);
    const carDrive = [
        { stype: stypes.SD, value: "Tự lái" },
        { stype: stypes.WD, value: "Tài xế" },
    ];
    const [isSD, setIsSD] = useState([]);
    const [carTN, setCarTN] = useState([]);
    const [carBrand, setCarBrand] = useState([]);
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    useEffect(() => {
        (async () => {
            try {
                let res = await LocationApi.getProvinces();
                if (res.success === true) {
                    setStateCreateCar({
                        ...StateCreateCar,
                        location: {
                            ...StateCreateCar.location,
                            districtId: "",
                        },
                    });
                    setDataProvinces(res.data);
                } else {
                    throw new Error(res.message);
                }
            } catch (error) {}
        })();
        return () => {};
    }, []);

    useEffect(() => {
        (async () => {
            try {
                if (StateCreateCar.location.provinceId != "") {
                    let res = await LocationApi.getDistrictByProvince(
                        StateCreateCar.location.provinceId
                    );
                    if (res.success === true) {
                        setDataDistricts(res.data);
                    } else {
                        throw new Error(res.message);
                    }
                }

                setStateCreateCar({
                    ...StateCreateCar,
                    location: {
                        ...StateCreateCar.location,
                        districtId: "",
                    },
                });
            } catch (error) {}
        })();
        return () => {};
    }, [StateCreateCar.location.provinceId]);

    useEffect(() => {
        (async () => {
            try {
                if (StateCreateCar.location.districtId != "") {
                    let res = await LocationApi.getWardByDistrict(
                        StateCreateCar.location.districtId
                    );
                    if (res.success === true) {
                        setDataWards(res.data);
                    } else {
                        throw new Error(res.message);
                    }
                }

                setStateCreateCar({
                    ...StateCreateCar,
                    location: {
                        ...StateCreateCar.location,
                        wardId: "",
                    },
                });
            } catch (error) {}
        })();
        return () => {};
    }, [StateCreateCar.location.districtId]);

    useEffect(() => {
        (async () => {
            try {
                let res = await CarApi.GetFeature();
                if (res.success === true) {
                    setCarTN(res.data);
                    console.log(res);
                } else {
                    throw new Error(res.message);
                }
            } catch (error) {}
        })();

        (async () => {
            try {
                let res = await CarApi.GetBrand();
                if (res.success === true) {
                    setCarBrand(res.data);
                    setStateCreateCar({
                        ...StateCreateCar,
                        brand: { id: res.data[0].id, name: res.data[0].name },
                    });
                    console.log(res);
                } else {
                    throw new Error(res.message);
                }
            } catch (error) {}
        })();
        return () => {};
    }, []);

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

    const handleChangeStreet = (e) => {
        setStateCreateCar({
            ...StateCreateCar,
            location: { ...StateCreateCar.location, street: e.target.value },
        });
    };

    const handleChangeNameCar = (e) => {
        setStateCreateCar({ ...StateCreateCar, name: e.target.value });
    };

    const handleChangeBrand = (e) => {
        // console.log(JSON.parse(e.target.value));
        const result = JSON.parse(e.target.value);
        setStateCreateCar({
            ...StateCreateCar,
            brand: { id: result.id, name: result.name },
        });
    };

    const handleChangeStypeCar = (e) => {
        console.log(e.target.value);
        if (stypes.SD == e.target.value) {
            setStateCreateCar({ ...StateCreateCar, sd: 1, wd: 0 });
            setIsSD(true);
        } else {
            setStateCreateCar({ ...StateCreateCar, sd: 0, wd: 1 });
            setIsSD(false);
        }
    };

    const handleChangeSeat = (e) => {
        setStateCreateCar({ ...StateCreateCar, seat: e.target.value });
    };

    const handleChangeTransmision = (e) => {
        setStateCreateCar({ ...StateCreateCar, optionsTransmission: e.target.value });
    };
    const handleChangeFuel = (e) => {
        setStateCreateCar({ ...StateCreateCar, optionsFuel: e.target.value });
    };

    const handleChangeFuelConsumption = (e) => {
        setStateCreateCar({ ...StateCreateCar, optionsFuelConsumption: e.target.value });
    };

    const handleChangePrice = (e) => {
        setStateCreateCar({ ...StateCreateCar, price: e.target.value });
    };

    const handleChangeStartTime = (e) => {
        setStateCreateCar({ ...StateCreateCar, startTime: convertDateToTimeStamp(e.target.value) });
    };
    const handleChangeEndTime = (e) => {
        setStateCreateCar({ ...StateCreateCar, endTime: convertDateToTimeStamp(e.target.value) });
    };

    const handleChangeFeature = (e) => {
        var updatedList = [...StateCreateCar.features];
        if (e.target.checked) {
            const { _id, ...otherInfo } = JSON.parse(e.target.getAttribute("item-value"));
            updatedList = [...StateCreateCar.features, otherInfo];
        } else {
            updatedList.splice(StateCreateCar.features.indexOf(e.target.value), 1);
        }
        setStateCreateCar({ ...StateCreateCar, features: updatedList });
    };
    const handleChangeDesc = (e) => {
        setStateCreateCar({ ...StateCreateCar, desc: e.target.value });
    };

    const handleChangeNotes = (e) => {
        setStateCreateCar({ ...StateCreateCar, notes: e.target.value });
    };

    const handleChoosePaperCard = async (e) => {
        e.preventDefault();
        let leng = StateCreateCar.papers.length;
        var arrFile = Object.entries(Object.entries(e.target.files).slice(0, 5 - leng));
        var dataPhoto = [];
        if (leng < 5) {
            for (const [index, [key, value]] of arrFile) {
                let imgBase64 = await getBase64(value);
                const nanoid = customAlphabet(alphabet, 5);
                dataPhoto.push({
                    id: nanoid(),
                    url: imgBase64,
                });
            }
            setStateCreateCar({
                ...StateCreateCar,
                papers: StateCreateCar.papers.concat(dataPhoto),
            });
        } else {
            console.log("tối đa 5 ảnh ");
        }
    };

    const handlePopImagePaper = (e, index) => {
        e.preventDefault();
        // console.log(index);
        const x = StateCreateCar.papers;
        x.splice(index, 1);
        setStateCreateCar({
            ...StateCreateCar,
            papers: x,
        });
    };

    const handleChooseCar = async (e) => {
        e.preventDefault();
        let leng = StateCreateCar.photos.length;
        var arrFile = Object.entries(Object.entries(e.target.files).slice(0, 8 - leng));
        var dataPhoto = [];
        if (leng < 8) {
            for (const [index, [key, value]] of arrFile) {
                let imgBase64 = await getBase64(value);
                let nanoid = customAlphabet(alphabet, 8);
                dataPhoto.push({
                    id: nanoid(),
                    thumbUrl: imgBase64,
                    fullUrl: imgBase64,
                });
            }
            setStateCreateCar({
                ...StateCreateCar,
                photos: StateCreateCar.photos.concat(dataPhoto),
            });
        } else {
            console.log("tối đa 8 ảnh ");
        }
    };

    const handlePopImageCar = (e, index) => {
        e.preventDefault();
        // console.log(index);
        const x = StateCreateCar.photos;
        x.splice(index, 1);
        setStateCreateCar({
            ...StateCreateCar,
            photos: x,
        });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(StateCreateCar);
            const res = await CarApi.PostCreateCar(StateCreateCar);
            toast.success(res.message);
            console.log(res);
        } catch (error) {
            console.log(error);
            toast.success("Đăng ký xe không thành công");
        }
    };

    return (
        <>
            <div className="container-create-car my-5">
                <div className="row d-flex justify-content-center">
                    <div className="">
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
                                <label className="form-label">Địa chỉ nhận xe</label>
                                <input
                                    type="text"
                                    name="street"
                                    className="form-control"
                                    placeholder="street"
                                    value={StateCreateCar.location.street}
                                    onChange={handleChangeStreet}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên xe</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="name"
                                    value={StateCreateCar.name}
                                    onChange={handleChangeNameCar}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hãng xe</label>
                                <div className="d-flex">
                                    <select
                                        className="form-select"
                                        name="brand"
                                        value={JSON.stringify(StateCreateCar.brand)}
                                        onChange={handleChangeBrand}
                                    >
                                        {carBrand.map((item, index) => (
                                            <option
                                                key={index}
                                                value={JSON.stringify({
                                                    id: item.id,
                                                    name: item.name,
                                                })}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại xe</label>
                                <select
                                    className="form-select"
                                    name="drive"
                                    value={StateCreateCar.stype}
                                    onChange={handleChangeStypeCar}
                                >
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
                                    value={StateCreateCar.seat}
                                    onChange={handleChangeSeat}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Truyền động</label>
                                <select
                                    className="form-select"
                                    value={StateCreateCar.optionsTransmission}
                                    onChange={handleChangeTransmision}
                                >
                                    <option value="1">Số tự động</option>
                                    <option value="2">Số sàn</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Nhiên liệu</label>
                                <select
                                    className="form-select"
                                    value={StateCreateCar.optionsFuel}
                                    onChange={handleChangeFuel}
                                >
                                    <option value="1">Xăng</option>
                                    <option value="2">Dầu diesel</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Mức tiêu thụ nhiêu liệu / 100km
                                </label>
                                <input
                                    type="text"
                                    name="MTT"
                                    className="form-control"
                                    placeholder="MTT/100km"
                                    value={StateCreateCar.optionsFuelConsumption}
                                    onChange={handleChangeFuelConsumption}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giá ({isSD ? "/ngày" : "/4h"})</label>
                                <input
                                    type="text"
                                    name="Price"
                                    className="form-control"
                                    placeholder={isSD ? "Price/ ngày" : "Price/ 4h"}
                                    value={StateCreateCar.price}
                                    onChange={handleChangePrice}
                                />
                            </div>
                            <div className="choose-date d-flex mb-3 justify-content-between">
                                <div className="start-time w-50 pe-3">
                                    <label className="form-label">Ngày bắt đầu</label>
                                    <div className="wrap-input date ">
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={convertTimeStampToDate(StateCreateCar.startTime)}
                                            onChange={handleChangeStartTime}
                                        />
                                    </div>
                                </div>
                                <div className="end-time w-50 ps-3">
                                    <label className="form-label">Ngày kết thúc</label>
                                    <div className="wrap-input date ">
                                        <input
                                            className="form-control"
                                            type="date"
                                            value={convertTimeStampToDate(StateCreateCar.endTime)}
                                            onChange={handleChangeEndTime}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tính năng</label>
                                <div className="feature-box border rounded-2 p-5">
                                    {carTN.map((option, index) => (
                                        <div className="form-check" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value={option.id}
                                                item-value={JSON.stringify(option)}
                                                onChange={handleChangeFeature}
                                            />
                                            <img
                                                className="img-ico car-img-sw"
                                                src={option.logo}
                                                alt="DealCar - Thuê xe tự lái"
                                            />
                                            <span
                                                className="form-check-label"
                                                htmlFor="flexCheckChecked"
                                            >
                                                {option.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <textarea
                                    type="text"
                                    name="Description"
                                    rows={4}
                                    className="form-control"
                                    placeholder=" Huyndai Elantra số tự động đăng kí tháng 06/2018. Xe gia đình mới đẹp, nội thất nguyên bản, sạch sẽ, bảo dưỡng thường xuyên, rửa xe miễn phí cho khách.
                                    Xe rộng rãi, an toàn, tiện nghi, phù hợp cho gia đình du lịch. Xe trang bị hệ thống cảm biến lùi, gạt mưa tự động, đèn pha tự động, camera hành trình, hệ thống giải trí AV cùng nhiều tiện nghi khác..."
                                    value={StateCreateCar.desc}
                                    onChange={handleChangeDesc}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Điều khoản</label>
                                <textarea
                                    type="text"
                                    name="Policy"
                                    rows={4}
                                    className="form-control"
                                    placeholder="Không sử dụng xe vào mục đích phi pháp. Lái xe cẩn thận, giữ xe sạch sẽ, trả xe đúng giờ. Phụ thu 500k nếu hút thuốc lá trong xe."
                                    value={StateCreateCar.notes}
                                    onChange={handleChangeNotes}
                                />
                            </div>
                            <div className="mb-3 ">
                                <label className="form-label">Giấy tờ xe</label>
                                <input
                                    className="form-control"
                                    style={{ width: "90px" }}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    name="BtnFile"
                                    onChange={handleChoosePaperCard}
                                />
                            </div>
                            <div className="img-car-list mb-3">
                                {StateCreateCar.papers.length > 0 &&
                                    StateCreateCar.papers.map((item, index) => (
                                        <div className="box-car" key={index}>
                                            <img src={item.url} alt={index} />
                                            <span
                                                type="button"
                                                onClick={(e) => handlePopImagePaper(e, index)}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                            <div className="mb-3 ">
                                <label className="form-label">Hình ảnh</label>
                                <input
                                    className="form-control"
                                    style={{ width: "90px" }}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    name="BtnFile"
                                    onChange={handleChooseCar}
                                />
                            </div>
                            <div className="img-car-list mb-3">
                                {StateCreateCar.photos.length <= 0 ? (
                                    <div className="box-car">
                                        <img src={carPhotoDefault} alt="Image car default" />
                                    </div>
                                ) : (
                                    StateCreateCar.photos.map((item, index) => (
                                        <div className="box-car" key={index}>
                                            <img src={item.thumbUrl} alt={index} />
                                            <span
                                                type="button"
                                                onClick={(e) => handlePopImageCar(e, index)}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="mb-3 d-flex justify-content-center ">
                                <button type="submit" className="btn btn-primary">
                                    Đăng Ký
                                </button>
                            </div>
                        </form>
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

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn xóa</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export default CreateCar;
