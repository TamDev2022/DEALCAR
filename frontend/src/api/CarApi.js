import { stypes, LoadLimit } from "../components/common/Common";
import axiosClient from "./AxiosClient";
import StorageKeys from "../constants/StorageKeys";
class CarApi {
    GetListCar = (pos) => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            params: {
                pos: pos,
            },
        };
        const url = "car/sd";
        return axiosClient.get(url, config);
    };

    GetListCarWithDriver = (pos) => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            params: {
                pos: pos,
            },
        };
        const url = "car/wd";
        return axiosClient.get(url, config);
    };

    GetFilterCar = (filter) => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            params: {
                provinceId: filter.location.provinceId,
                districtId: filter.location.districtId,
                wardId: filter.location.wardId,
                seat: filter.seat,
                price: filter.price,
                date: filter.dateStart,
                pos: filter.pos,
                limit: LoadLimit.MoreCar,
            },
        };
        let url = "";
        if (filter.stype == stypes.SD) url = "car/filter/sd";
        else url = "car/filter/wd";
        return axiosClient.get(url, config);
    };

    GetTopCar = () => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };
        const url = "car/topcar/sd";
        return axiosClient.get(url, config);
    };

    GetTopCarWithDriver = () => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };
        const url = "car/topcar/wd";
        return axiosClient.get(url, config);
    };

    GetMoreCarList = (filter) => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            params: {
                provinceId: filter.location.provinceId,
                districtId: filter.location.districtId,
                wardId: filter.location.wardId,
                seat: filter.seat,
                price: filter.price,
                date: filter.dateStart,
                pos: filter.pos + 1,
                limit: LoadLimit.MoreCar,
            },
        };
        let url = "";
        if (filter.stype == stypes.SD) url = "car/filter/sd";
        else url = "car/filter/wd";
        return axiosClient.get(url, config);
    };

    GetCarDetail = (carId) => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            params: {
                carId,
            },
        };
        const url = "car/detail";
        return axiosClient.get(url, config);
    };

    PostBookingCarId = (data) => {
        const token = JSON.parse(localStorage.getItem(StorageKeys.access));
        let config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const url = "car/booking";
        return axiosClient.post(url, data, config);
    };

    PostCreateCar = (data) => {
        const token = JSON.parse(localStorage.getItem(StorageKeys.access));
        let config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const url = "car/create-car";
        return axiosClient.post(url, data, config);
    };

    GetOwnerCar = (filterStatus, pos) => {
        const token = JSON.parse(localStorage.getItem(StorageKeys.access));
        let config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
            params: {
                filterStatus: filterStatus,
                pos: pos,
                limit: LoadLimit.LimitCar,
            },
        };
        const url = "car/owner";
        return axiosClient.get(url, config);
    };

    GetCarsManagement = (filter, pos) => {
        const token = JSON.parse(localStorage.getItem(StorageKeys.access));
        let config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
            params: {
                // provinceId: filter.location.provinceId,
                // districtId: filter.location.districtId,
                // wardId: filter.location.wardId,
                // seat: filter.seat,
                // price: filter.price,
                filterStatus: filter.filterStatus,
                pos: pos,
                limit: LoadLimit.LimitCar,
            },
        };
        const url = "car/admin/manage-car";
        return axiosClient.get(url, config);
    };

    PutCarsManagement = (carId, statusUpdate) => {
        const token = JSON.parse(localStorage.getItem(StorageKeys.access));
        let config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const data = {
            carId,
            status: statusUpdate,
        };
        console.log(data);
        const url = "car/setting/update";
        return axiosClient.put(url, data, config);
    };

    RemoveCar = (carId) => {
        const token = JSON.parse(localStorage.getItem(StorageKeys.access));
        let config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const data = { carId };
        const url = "car/owner/remove-car";

        return axiosClient.put(url, data, config);
    };

    GetFeature = () => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };
        const url = "car/feature";
        return axiosClient.get(url, config);
    };

    GetBrand = () => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };
        const url = "car/brand";
        return axiosClient.get(url, config);
    };
}
export default new CarApi();
