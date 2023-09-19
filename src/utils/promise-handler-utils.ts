import axios, { AxiosResponse } from "axios";
import { AppThunk, RootState } from "app/store";
import { setAppErrorAC, setAppStatusAC } from "../app/app-reducer";
import { ResponseType } from "../api/todolist-api";
import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { changeTaskEntityStatusAC } from "../features/TodolistList/tasks-reducer";
import { changeTodolistEntityStatusAC } from "../features/TodolistList/todolists-reducer";
import { TaskType } from "../api/task-api";

export type ThunkReturnType = {
  task?: TaskType;
  todolistId?: string;
  taskId?: string;
  title?: string;
  value?: boolean;
  isInitialized?: boolean;
};

export const handleServerNetworkError = (
  err: unknown,
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
): void => {
  let errorMessage = "Some error occurred";
  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(setAppErrorAC({ error: errorMessage }));
  dispatch(setAppStatusAC({ status: "failed" }));
};
export const promiseHandler =
  <R>(
    promise: Promise<AxiosResponse<ResponseType<R>, ResponseType>>,
    payload: ThunkReturnType | null,
    todolistId: string | null,
    taskId: string | null,
    rejectWithValue: any,
  ): AppThunk =>
  async (dispatch) => {
    try {
      todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({ todolistId, status: "loading" }));
      todolistId && taskId && dispatch(changeTaskEntityStatusAC({ todolistId, taskId, status: "loading" }));
      const res = await promise;
      // @ts-ignore
      const task = payload ? null : res.data.data.item;
      if (res.data.resultCode === 0) {
        // @ts-ignore
        dispatch(setAppStatusAC({ status: "succeeded" }));
        todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({ todolistId, status: "succeeded" }));
        todolistId && taskId && dispatch(changeTaskEntityStatusAC({ todolistId, taskId, status: "succeeded" }));
        if (payload) return { ...payload };
        else return { task, todolistId };
      } else {
        const errorMessage = res.data.messages.length ? res.data.messages[0] : "Some error occurred";
        new Error(errorMessage);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({ todolistId, status: "failed" }));
      todolistId && taskId && dispatch(changeTaskEntityStatusAC({ todolistId, taskId, status: "failed" }));
      return rejectWithValue(null);
    }
  };
export type ErrorUtilsDispatchType = Dispatch<AnyAction>;
