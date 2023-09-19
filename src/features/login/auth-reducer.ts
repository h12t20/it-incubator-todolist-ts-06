import { authAPI, LoginParamsType } from "api/auth-api";
import { setIsInitializedAC } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { promiseHandler } from "../../utils/promise-handler-utils";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";
import { clearDataAC } from "../TodolistList/todolists-reducer";

const initialState = { isLoggedIn: false };
// @ts-ignore
export const loginTC = createAppAsyncThunk<any, LoginParamsType>(
  "auth/logIn",
  async (loginParams: LoginParamsType, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return dispatch(promiseHandler(authAPI.login(loginParams), { value: true }, null, null, rejectWithValue));
  },
);

export const logoutTC = createAppAsyncThunk<any, any>("auth/logOut", (value: null, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return dispatch(
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

export const initializeAppTC = createAppAsyncThunk<any, any>("auth/initialized", async (value: null, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return dispatch(
    promiseHandler(
      authAPI.me().finally(() => dispatch(setIsInitializedAC({ isInitialized: true }))),
      { value: true },
      null,
      null,
      rejectWithValue,
    ),
  );
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedInAC(
      state,
      action: PayloadAction<{
        value: boolean;
      }>,
    ) {
      state.isLoggedIn = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(initializeAppTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      });
  },
});

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC;
export const authReducer = slice.reducer;
