import axios, { AxiosResponse } from "axios";
import { AppThunk, RootState } from "app/store";
import { setAppErrorAC, setAppStatusAC } from "../app/app-reducer";
import { ResponseType } from "../api/todolist-api";
import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { addTaskAC, changeTaskEntityStatusAC } from "../features/TodolistList/tasks-reducer";
import { changeTodolistEntityStatusAC } from "../features/TodolistList/todolists-reducer";

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
    action: AnyAction | null,
    todolistId: string | null,
    taskId: string | null,
  ): AppThunk =>
  async (dispatch) => {
    try {
      todolistId &&
        !taskId &&
        dispatch(
          changeTodolistEntityStatusAC({
            todolistId,
            status: "loading",
          }),
        );
      todolistId &&
        taskId &&
        dispatch(
          changeTaskEntityStatusAC({
            todolistId,
            taskId,
            status: "loading",
          }),
        );
      const res = await promise;
      if (res.data.resultCode === 0) {
        // @ts-ignore
        action ? dispatch(action) : dispatch(addTaskAC({ task: res.data.data.item }));
        dispatch(setAppStatusAC({ status: "succeeded" }));
        todolistId &&
          !taskId &&
          dispatch(
            changeTodolistEntityStatusAC({
              todolistId,
              status: "succeeded",
            }),
          );
        todolistId &&
          taskId &&
          dispatch(
            changeTaskEntityStatusAC({
              todolistId,
              taskId,
              status: "succeeded",
            }),
          );
      } else {
        const errorMessage = res.data.messages.length ? res.data.messages[0] : "Some error occurred";
        new Error(errorMessage);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      todolistId &&
        !taskId &&
        dispatch(
          changeTodolistEntityStatusAC({
            todolistId,
            status: "succeeded",
          }),
        );
      todolistId &&
        taskId &&
        dispatch(
          changeTaskEntityStatusAC({
            todolistId,
            taskId,
            status: "succeeded",
          }),
        );
    }
  };
export type ErrorUtilsDispatchType = Dispatch<AnyAction>;
