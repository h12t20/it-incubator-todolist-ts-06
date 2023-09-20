import { ResponseType } from "../api/todolist-api";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { setAppErrorAC, setAppStatusAC } from "../app/app-reducer";

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
};
