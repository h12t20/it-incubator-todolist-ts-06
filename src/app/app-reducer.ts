import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorType, RequestStatusType } from "common/types/types";

const initialState = {
  status: "idle",
  error: null as ErrorType,
  isInitialized: false,
};
const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: ErrorType }>) {
      state.error = action.payload.error;
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});
export const { setAppStatusAC, setAppErrorAC, setIsInitializedAC } = slice.actions;
export const appReducer = slice.reducer;
