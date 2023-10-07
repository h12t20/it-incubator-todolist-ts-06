import { authAPI, LoginParamsType } from "features/login/auth-api";
import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "../TodolistList/tasks-reducer";
import { securityAPI } from "./sequrity-api";

export const login = createAppAsyncThunk<{ value: boolean }, LoginParamsType>(
  "auth/logIn",
  async (loginParams: LoginParamsType, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const res = await authAPI.login(loginParams);
    if (res.data.resultCode === ResultCode.success) {
      return { value: true };
    } else {
      if (res.data.resultCode === ResultCode.captcha) {
        dispatch(captcha());
      }
      throw new Error(res.data.messages[0]);
    }
  },
);
export const logout = createAppAsyncThunk<{
  value: boolean;
}>("auth/logOut", async () => {
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.success) {
    return { value: false };
  } else throw new Error(res.data.messages[0]);
});
export const initializeApp = createAppAsyncThunk<{
  value: boolean;
}>("auth/initialized", async () => {
  const res = await authAPI.me();
  if (res.data.resultCode === ResultCode.success) {
    return { value: true };
  } else throw new Error(res.data.messages[0]);
});
export const captcha = createAppAsyncThunk<{
  url: string;
}>("securityAPI/captcha", async () => {
  const res = await securityAPI.captcha();
  return { url: res.data.url };
});
const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, captchaURL: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(captcha.fulfilled, (state, action) => {
        return {
          ...state,
          captchaURL: action.payload.url,
        };
      })
      .addMatcher(
        (action: AnyAction) => action.type.startsWith("auth") && action.type.endsWith("fulfilled"),
        (state, action) => {
          state.isLoggedIn = action.payload.value;
        },
      );
  },
});
export const authReducer = slice.reducer;
