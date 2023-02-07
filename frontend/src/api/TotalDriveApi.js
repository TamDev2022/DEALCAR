import axiosClient from "./AxiosClient";

class TotalDriveAPI{
    GetTotalDrive = () => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };
        const url = `totaldrivecity`;
        return axiosClient.get(url, config);
    };
}
export default new TotalDriveAPI();
