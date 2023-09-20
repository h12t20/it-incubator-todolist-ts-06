import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";

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
