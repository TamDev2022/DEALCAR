import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthApi from "../../../api/AuthApi";
import StorageKeys from "../../../constants/StorageKeys";

export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
    try {
        const res = await AuthApi.Register(data);
        if (res.success) {
            console.log(res);
            localStorage.setItem(StorageKeys.user, JSON.stringify(res.data.user));
            return res.data;
        } else {
            return thunkAPI.rejectWithValue(res.data);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const res = await AuthApi.Login(data);
        if (res.success) {
            localStorage.setItem(StorageKeys.access, JSON.stringify(res.data.AccessToken));
            localStorage.setItem(StorageKeys.refresh, JSON.stringify(res.data.RefreshToken));
            localStorage.setItem(StorageKeys.user, JSON.stringify(res.data.user));
            return res.data;
        } else {
            return thunkAPI.rejectWithValue(res.data);
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (thunkAPI) => {
    try {
        const access = JSON.parse(localStorage.getItem(StorageKeys.access));
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            return thunkAPI.rejectWithValue({
                success: false,
                message: "Error locastorage item user",
            });
        }
        if (access) {
            const res = await AuthApi.VerifyToken(access);

            if (res.success) {
                return { ...res, user };
            } else {
                const refresh = JSON.parse(localStorage.getItem(StorageKeys.refresh));
                const resRef = await AuthApi.VerifyToken(refresh);

                if (resRef.success) {
                    localStorage.setItem(
                        StorageKeys.access,
                        JSON.stringify(resRef.data.AccessToken)
                    );
                    return resRef;
                } else {
                    return thunkAPI.rejectWithValue(resRef.data);
                }
            }
        }
        return thunkAPI.rejectWithValue("");
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const confirmRegister = createAsyncThunk("auth/confirm-register", async (data, thunkAPI) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            return thunkAPI.rejectWithValue({
                success: false,
                message: "Error connect server",
            });
        } else {
            const NewData = { ...data, Email: user.Email };
            const res = await AuthApi.ConfirmRegister(NewData);
            if (res.success) {
                return { ...res, user };
            }
        }
    } catch (error) {
        const res = error.response.data;
        const user = JSON.parse(localStorage.getItem("user"));
        const reSendData = { Email: user.Email };

        if (res.verifyCodeExpired) {
            const resSend = await AuthApi.ResendVerifyCode(reSendData);
            console.log(resSend);
            localStorage.clear();
            return thunkAPI.rejectWithValue(resSend.message);
        }
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        user: {
            FirstName: "",
            LastName: "",
            Email: "",
            Avatar: "",
            Role: "",
        },
        isFetching: false,
        isSuccess: false,
        isError: false,
        isLogged: false,
        errorMessage: "",
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
        logoutUser: (state) => {
            localStorage.clear();
            state.user = {
                FirstName: "",
                LastName: "",
                Email: "",
                Avatar: "",
                Role: "",
            };
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = false;
            state.isLogged = false;
            state.errorMessage = "";

            return state;
        },
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, { payload }) => {
            console.log("payload", payload);
            state.user = { ...payload.user };
            state.isFetching = false;
            state.isSuccess = true;
            state.isLogged = true;
            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            console.log("payload", payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload ? payload.message : "";
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            console.log("payload", payload);
            state.user = { ...payload.user };
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [registerUser.rejected]: (state, { payload }) => {
            console.log("payload", payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload ? payload.message : "";
        },
        [registerUser.pending]: (state) => {
            state.isFetching = true;
        },
        [checkAuth.fulfilled]: (state, { payload }) => {
            console.log("payload", payload);
            state.user = { ...payload.user };
            state.isLogged = true;
            return state;
        },
        [checkAuth.rejected]: (state, { payload }) => {
            console.log("payload", payload);
            state.isLogged = false;
            state.isError = false;
            state.errorMessage = payload ? payload.message : "";
        },
        [checkAuth.pending]: (state) => {
            state.isFetching = true;
        },
        [confirmRegister.fulfilled]: (state, { payload }) => {
            console.log("payload", payload);
            state.user = { ...payload.user };
            state.isSuccess = true;
            return state;
        },
        [confirmRegister.rejected]: (state, { payload }) => {
            console.log("payload", payload);
            state.isLogged = false;
            state.isError = true;
            state.errorMessage = payload;
        },
        [confirmRegister.pending]: (state) => {
            state.isFetching = true;
        },
    },
});

export const { clearState, logoutUser } = AuthSlice.actions;
export const AuthSelector = (state) => state.auth;
export default AuthSlice.reducer;
