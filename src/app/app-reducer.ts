import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { ErrorType, RequestStatusType } from "common/types/types";
import { changeTodoTitle, fetchTodolist } from "../features/TodolistList/todolists-reducer";
import { fetchTasks, removeTasks, updateTask } from "../features/TodolistList/tasks-reducer";
import { logout } from "../features/login/auth-reducer";
import { createAppAsyncThunk } from "../common/utils";
import { loadSetting, Setting } from "../common/localStorage/localStorage";

const initialState = {
  status: "idle",
  error: null as ErrorType,
  isInitialized: false,
  sortType: "by Date",
  theme: "Light",
};
export const getSetting = createAppAsyncThunk<Setting>("app/setting", async () => {
  const res = loadSetting();
  if (res) {
    return res;
  } else throw new Error("Local storage error");
});
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
    setSortTypeAC(state, action: PayloadAction<{ sortType: string }>) {
      state.sortType = action.payload.sortType;
    },
    setThemeAC(state, action: PayloadAction<{ theme: string }>) {
      state.theme = action.payload.theme;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSetting.fulfilled, (state, action) => {
        return {
          ...state,
          theme: action.payload.theme,
          sortType: action.payload.sort,
        };
      })
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
        (action: AnyAction) => action.type.startsWith("auth/initialized") && !action.type.endsWith("pending"),
        (state) => {
          state.isInitialized = true;
        },
      );
  },
});
export const { setAppStatusAC, setAppErrorAC, setSortTypeAC, setThemeAC } = slice.actions;
export const appReducer = slice.reducer;
