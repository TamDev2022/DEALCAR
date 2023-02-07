import Moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { matchPath, useLocation, useParams, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Swiper from "swiper/bundle";
import CarApi from "../api/CarApi";
import {
    CarFuel,
    CarTransmission,
    formatPrice,
    stypes,
    CarStatus,
} from "../components/common/Common";
import { CommonErr } from "../components/common/CommonErr";
import { MessageBox } from "../components/common/MessageBox";
import carPhotoDefault from "../static/images/upload/defaultCar.png";
import StorageKeys from "../constants/StorageKeys";
import CarSettingInfo from "../components/carowner/CarSettingInfo";
import CarSettingPhoto from "../components/carowner/CarSettingPhoto";
import CarSettingSideBar from "../components/carowner/CarSettingSideBar";
import CarSettingPapers from "../components/carowner/CarSettingPages";

function CarSetting() {
    const currentDate = Moment(new Date()).format("YYYY-MM-DD");
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem(StorageKeys.user));

    const navigate = useNavigate();
    const stype = matchPath("/carsetting/:carId", location.pathname) ? stypes.SD : stypes.WD;
    const isSD = matchPath("/carsetting/:carId", location.pathname) ? true : false;

    let { carId } = useParams();

    const [state, setState] = useState({
        err: CommonErr.INNIT,
        errMsg: "",
    });

    useEffect(() => {
        (async () => {
            try {
                let res = await CarApi.GetCarDetail(carId);
                if (res.success) {
                    setState({ ...state, car: res.data });
                } else {
                    throw new Error("failed");
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const getSpecificSetting = (state) => ({
        "#infosetting": <CarSettingInfo car={state.car} />,
        "#photossetting": <CarSettingPhoto photos={state.car.photos} />,
        "#paperssetting": <CarSettingPapers papers={state.car.papers} />,
    });

    const handler = location.hash;
    return (
        <>
            <div className="car-setting-container">
                <div className="dealcar-layout">
                    <MessageBox
                        error={state.err}
                        message={state.errMsg}
                        show={state.errMsg && state.errMsg !== ""}
                    />
                    <div className="body-container">
                        {state.car && (
                            <CarSettingSideBar car={state.car} carId={carId} handler={handler} />
                        )}
                        {state.car && getSpecificSetting(state)[handler]}
                    </div>
                </div>
            </div>
        </>
    );
}
export default CarSetting;
