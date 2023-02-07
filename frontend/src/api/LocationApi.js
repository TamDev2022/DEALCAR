import axiosClient from "./AxiosClient";

var versionAPI = 1;

class Location {
    getProvinces = () => {
        let config = {
            headers: {
                accept: "*/*",
            },
        };
        const url = `/loc/provinces`;
        return axiosClient.get(url, config);
    };

    getAllDistricts = () => {
        let config = {
            headers: {
                accept: "*/*",
            },
        };
        const url = `/loc/districts`;
        return axiosClient.get(url, config);
    };

    getDistrictByProvince = (id) => {
        let config = {
            headers: {
                accept: "*/*",
            },
            params: {
                code: `${id}`,
            },
        };
        const url = `/loc/districts-by-province`;
        return axiosClient.get(url, config);
    };

    getWardByDistrict = (id) => {
        let config = {
            headers: {
                accept: "*/*",
            },
            params: {
                code: `${id}`,
            },
        };
        const url = `/loc/wards-by-district`;
        return axiosClient.get(url, config);
    };

    getWardByProvince = (id) => {
        let config = {
            headers: {
                accept: "*/*",
            },
            params: {
                code: `${id}`,
            },
        };
        const url = `/loc/wards-by-province`;
        return axiosClient.get(url, config);
    };
}

export default new Location();
