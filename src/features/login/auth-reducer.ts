import { authAPI, LoginParamsType } from "common/api/auth-api";
import { setIsInitializedAC } from "app/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { promiseHandler } from "common/utils/promise-handler-utils";
import { createAppAsyncThunk } from "common/utils";
import { clearDataAC } from "../TodolistList/todolists-reducer";

export const login = createAppAsyncThunk<
  {
    payload: {
      value: boolean;
    };
  },
  LoginParamsType
>("auth/logIn", async (loginParams: LoginParamsType, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return dispatch<any>(
    promiseHandler({
      promise: authAPI.login(loginParams),
      payload: { value: true },
      showError: false,
    }),
  );
});
export const logout = createAppAsyncThunk<
  {
    payload: {
      value: boolean;
    };
  },
  null
>("auth/logOut", (_, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return dispatch<any>(
    promiseHandler({
      promise: authAPI.logout().then((res) => {
        if (res.data.resultCode === 0) dispatch(clearDataAC());
        return res;
      }),
      payload: { value: false },
    }),
  );
});
export const initializeApp = createAppAsyncThunk<
  {
    payload: {
      value: boolean;
    };
  },
  null
>("auth/initialized", (_, thunkAPI) => {
  const { dispatch } = thunkAPI;
  return dispatch<any>(
    promiseHandler({
      promise: authAPI.me().finally(() => dispatch(setIsInitializedAC({ isInitialized: true }))),
      payload: { value: true },
      showError: false,
    }),
  );
});
const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.payload.value;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.payload.value;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.payload.value;
      });
  },
});
export const authReducer = slice.reducer;
export const authThunks = { login, logout, initializeApp };
