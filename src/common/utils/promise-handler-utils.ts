import { AxiosResponse } from "axios";
import { setAppStatusAC } from "../../app/app-reducer";
import { changeTaskEntityStatusAC, ResultCode } from "features/TodolistList/tasks-reducer";
import { changeTodolistEntityStatusAC } from "features/TodolistList/todolists-reducer";
import { BaseResponse, TaskType } from "../types/types";
import { handleServerAppError } from "./handle-server-app-error";
import { handleServerNetworkError } from "./handle-server-network-error";
import { AppThunk } from "../../app/store";

export type ThunkReturnType = {
  task?: TaskType;
  todolistId?: string;
  taskId?: string;
  title?: string;
  value?: boolean;
  isInitialized?: boolean;
};
export type PromiseHandlerType<R> = {
  promise: Promise<AxiosResponse<BaseResponse<R>, BaseResponse>>;
  rejectWithValue?: any;
  payload?: ThunkReturnType | null;
  todolistId?: string;
  taskId?: string;
  showError?: boolean;
};
export const promiseHandler =
  <R>(arg: PromiseHandlerType<R>): AppThunk =>
  async (dispatch) => {
    const { promise, rejectWithValue, payload, todolistId, taskId, showError = true } = arg;
    try {
      dispatch(setAppStatusAC({ status: "loading" }));
      todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({ todolistId, status: "loading" }));
      todolistId && taskId && dispatch(changeTaskEntityStatusAC({ todolistId, taskId, status: "loading" }));
      const res = await promise;
      const item = payload ? null : res.data.data.item;
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatusAC({ status: "succeeded" }));
        todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({ todolistId, status: "succeeded" }));
        todolistId && taskId && dispatch(changeTaskEntityStatusAC({ todolistId, taskId, status: "succeeded" }));
        if (payload) return payload;
        else return { item, todolistId };
      } else {
        showError ? handleServerAppError(res.data, dispatch) : dispatch(setAppStatusAC({ status: "failed" }));
        return rejectWithValue(showError ? null : res.data);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({ todolistId, status: "failed" }));
      todolistId && taskId && dispatch(changeTaskEntityStatusAC({ todolistId, taskId, status: "failed" }));
      return rejectWithValue(null);
    }
  };
