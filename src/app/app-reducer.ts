import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { ErrorType, RequestStatusType } from "common/types/types";
import { changeTodoTitle, fetchTodolist } from "../features/TodolistList/todolists-reducer";
import { fetchTasks, removeTasks, updateTask } from "../features/TodolistList/tasks-reducer";
import { logout } from "../features/login/auth-reducer";

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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded";
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed";
      })
      .addMatcher(
        isRejected(fetchTodolist, changeTodoTitle, fetchTasks, updateTask, removeTasks, logout),
        (state, action: AnyAction) => {
          state.error = action.payload
            ? action.payload.messages[0]
            : action.error.message
            ? action.error.message
            : "Some error";
        },
      )
      .addMatcher(
        (action: AnyAction) => action.type.startsWith("auth/initialized"),
        (state) => {
          state.isInitialized = true;
        },
      );
  },
});
export const { setAppStatusAC, setAppErrorAC } = slice.actions;
export const appReducer = slice.reducer;
