import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";
import { BaseResponse } from "../types/types";

export const handleServerAppError = <T>(
  data: BaseResponse<T>,
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
};
