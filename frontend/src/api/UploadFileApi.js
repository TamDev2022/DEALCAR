import axiosClient from "./AxiosClient";

class UploadFileApi {
    postFile = (data) => {
        let config = {
            headers: {
                "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryzuW5nPZQFQCwQtg4",
            },
        };
        const url = "file/upload";
        return axiosClient.post(url, data, config);
    };

    getFile = () => {
        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        };
        const url = "file/getfile";
        return axiosClient.get(url, config);
    };
}
export default new UploadFileApi();
