import { authAPI, LoginParamsType } from "common/api/auth-api";
import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "../TodolistList/tasks-reducer";

export const login = createAppAsyncThunk<
  {
    value: boolean;
  },
  LoginParamsType
>("auth/logIn", async (loginParams: LoginParamsType) => {
  const res = await authAPI.login(loginParams);
  if (res.data.resultCode === ResultCode.success) {
    return { value: true };
  } else throw new Error(res.data.messages[0]);
});
export const logout = createAppAsyncThunk<
  {
    value: boolean;
  },
  null
>("auth/logOut", async (_) => {
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.success) {
    return { value: false };
  } else throw new Error(res.data.messages[0]);
});
export const initializeApp = createAppAsyncThunk<
  {
    value: boolean;
  },
  null
>("auth/initialized", async (_) => {
  const res = await authAPI.me();
  if (res.data.resultCode === ResultCode.success) {
    return { value: true };
  } else throw new Error(res.data.messages[0]);
});
const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action: AnyAction) => action.type.startsWith("auth") && action.type.endsWith("fulfilled"),
      (state, action) => {
        state.isLoggedIn = action.payload.value;
      },
    );
  },
});
export const authReducer = slice.reducer;
