import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { AuthReducer } from "./features/_Index";
const reducer = {
    auth: AuthReducer,
};
export const store = configureStore({
    reducer,
    middleware: [thunk],
});
