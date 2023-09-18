import { setAppErrorAC, setAppStatusAC } from "app/app-reducer";
import { ErrorUtilsDispatchType } from "../../utils/promise-handler-utils";

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC({ error: error.message }));
  dispatch(setAppStatusAC({ status: "failed" }));
};
