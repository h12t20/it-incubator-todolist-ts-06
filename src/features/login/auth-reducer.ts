import { authAPI, LoginParamsType } from "common/api/auth-api";
import { setIsInitializedAC } from "app/app-reducer";
import { createSlice } from "@reduxjs/toolkit";
import { promiseHandler } from "common/utils/promise-handler-utils";
import { createAppAsyncThunk } from "common/utils";
import { clearDataAC } from "../TodolistList/todolists-reducer";

export const login = createAppAsyncThunk<{ value: boolean }, LoginParamsType>(
  "auth/logIn",
  async (loginParams: LoginParamsType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return dispatch<any>(
      promiseHandler(authAPI.login(loginParams), { value: true }, null, null, rejectWithValue, false),
    );
  },
);
export const logout = createAppAsyncThunk<
  {
    value: boolean;
  },
  null
>("auth/logOut", (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return dispatch<any>(
    promiseHandler(
      authAPI.logout().then((res) => {
        if (res.data.resultCode === 0) dispatch(clearDataAC());
        return res;
      }),
      { value: false },
      null,
      null,
      rejectWithValue,
    ),
  );
});
export const initializeApp = createAppAsyncThunk<
  {
    value: boolean;
  },
  null
>("auth/initialized", (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return dispatch<any>(
    promiseHandler(
      authAPI.me().finally(() => dispatch(setIsInitializedAC({ isInitialized: true }))),
      { value: true },
      null,
      null,
      rejectWithValue,
      false,
    ),
  );
});
const slice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      });
  },
});
export const authReducer = slice.reducer;
export const authThunks = { login, logout, initializeApp };
