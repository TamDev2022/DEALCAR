import Moment from "moment";
import { useEffect, useState } from "react";
import LocationApi from "../api/LocationApi";
import CarApi from "../api/CarApi";
import { stypes } from "../components/common/Common";
import { CommonErr } from "../components/common/CommonErr";
import { Outlet } from "react-router-dom";
import { Filter, ListView } from "../components/car/_Index";

// url= "/find-car"
function CarFinding() {
    const [stateFilter, setStateFilter] = useState({
        err: CommonErr.INNIT,
        errMsg: "",
        errMsgBox: "",
        stype: stypes.SD,
        location: {
            provinceId: "",
            districtId: "",
            wardId: "",
        },
        dateStart: Moment(new Date()).format("YYYY-MM-DD"),
        price: 0,
        seat: -100,
        pos: 0,
        more: 1,
        // cars:[]
        // dataProvinces: [],
        // dataDistricts: [],
        // dataWards: [],
    });

    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataDistricts, setDataDistricts] = useState([]);
    const [dataWards, setDataWards] = useState([]);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let res = await LocationApi.getProvinces();
                if (res.success === true) {
                    setStateFilter({
                        ...stateFilter,
                        location: {
                            ...stateFilter.location,
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
                if (stateFilter.location.provinceId != "") {
                    let res = await LocationApi.getDistrictByProvince(
                        stateFilter.location.provinceId
                    );
                    if (res.success === true) {
                        setDataDistricts(res.data);
                    } else {
                        throw new Error(res.message);
                    }
                }
                // else {
                //     setDataDistricts([]);
                // }

                setStateFilter({
                    ...stateFilter,
                    location: {
                        ...stateFilter.location,
                        districtId: "",
                    },
                });
            } catch (error) {}
        })();
        return () => {};
    }, [stateFilter.location.provinceId]);

    useEffect(() => {
        (async () => {
            try {
                if (stateFilter.location.districtId != "") {
                    let res = await LocationApi.getWardByDistrict(stateFilter.location.districtId);
                    if (res.success === true) {
                        setDataWards(res.data);
                    } else {
                        throw new Error(res.message);
                    }
                }
                // else {
                //     setDataWards([]);
                // }

                setStateFilter({
                    ...stateFilter,
                    location: {
                        ...stateFilter.location,
                        wardId: "",
                    },
                });
            } catch (error) {}
        })();
        return () => {};
    }, [stateFilter.location.districtId]);

    // handle change value filter
    const handleChangeProvince = (value) => {
        setStateFilter({
            ...stateFilter,
            location: { ...stateFilter.location, provinceId: value, districtId: "" },
            pos: 0,
        });
        setDataDistricts([]);
        setDataWards([]);
        setCars([]);
    };

    const handleChangeDistrict = (value) => {
        setStateFilter({
            ...stateFilter,
            location: { ...stateFilter.location, districtId: value, wardId: "" },
            pos: 0,
        });
        setDataWards([]);
        setCars([]);
    };

    const handleChangeWard = (value) => {
        setStateFilter({
            ...stateFilter,
            location: { ...stateFilter.location, wardId: value },
            pos: 0,
        });
        setCars([]);
    };

    const handleChageDriver = (value) => {
        setStateFilter({
            ...stateFilter,
            stype: +value,
            pos: 0,
        });
        setCars([]);
    };

    const handleChangePrice = (value) => {
        setStateFilter({
            ...stateFilter,
            price: +value,
            pos: 0,
        });
        setCars([]);
    };

    const handleChangeDate = (value) => {
        setStateFilter({
            ...stateFilter,
            dateStart: value,
            pos: 0,
        });
        setCars([]);
    };

    const handleChangeSeat = (value) => {
        setStateFilter({
            ...stateFilter,
            seat: value,
            pos: 0,
        });
        setCars([]);
    };

    useEffect(() => {
        CarApi.GetFilterCar(stateFilter).then((res) => {
            console.log(res);
            if (res.data) {
                setCars(res.data);
                setStateFilter({ ...stateFilter, pos: res.data.length });
            }
        });
    }, [stateFilter.seat]);

    const HandleMoreCarList = async () => {
        // let filterCar = { ...stateFilter, pos: cars.length };
        CarApi.GetFilterCar(stateFilter).then((res) => {
            console.log(res);
            if (res.data.length > 0) {
                setCars(cars.concat(res.data));
                setStateFilter({ ...stateFilter, pos: cars.length + res.data.length });
            }
        });
    };

    return (
        <>
            <div className="find-car-container">
                <Filter
                    stateFilter={stateFilter}
                    dataProvinces={dataProvinces}
                    dataDistricts={dataDistricts}
                    dataWards={dataWards}
                    handleChangeProvince={handleChangeProvince}
                    handleChangeDistrict={handleChangeDistrict}
                    handleChangeWard={handleChangeWard}
                    handleChageDriver={handleChageDriver}
                    handleChangePrice={handleChangePrice}
                    handleChangeDate={handleChangeDate}
                    handleChangeSeat={handleChangeSeat}
                />

                <ListView
                    cars={cars}
                    stateFilter={stateFilter}
                    HandleMoreCarList={HandleMoreCarList}
                />
            </div>
        </>
    );
}

export default CarFinding;
