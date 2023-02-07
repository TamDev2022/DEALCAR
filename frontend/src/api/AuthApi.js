import axiosClient from "./AxiosClient";

class AuthApi {
    Login = (data) => {
        let config = {
            headers: {},
        };
        const url = "auth/token";
        return axiosClient.post(url, data, config);
    };

    Register = (data) => {
        let config = {
            headers: {},
        };
        const url = "auth/register";
        return axiosClient.post(url, data, config);
    };

    VerifyToken = (token) => {
        let config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const url = "auth/verify-token";
        return axiosClient.get(url, config);
    };

    RefreshToken = (reftoken) => {
        let config = {
            headers: {
                authorization: `Bearer ${reftoken}`,
            },
        };
        const url = "auth/refresh-token";
        return axiosClient.post(url, config);
    };

    ConfirmRegister = (data) => {
        let config = {
            headers: {},
        };
        const url = "auth/confirm-register";
        return axiosClient.post(url, data, config);
    };
    ResendVerifyCode = (data) => {
        let config = {
            headers: {},
        };
        const url = "auth/resend-verifycode";
        return axiosClient.post(url, data, config);
    };
}
export default new AuthApi();
