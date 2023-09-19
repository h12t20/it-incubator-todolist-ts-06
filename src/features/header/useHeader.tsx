import { useAppDispatch, useAppSelector } from "app/hook";
import { useCallback } from "react";
import { logoutTC } from "../login/auth-reducer";
import { isLoggedInSelector, statusSelector } from "app/selectors";

export const useHeader = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const status = useAppSelector(statusSelector);
  const dispatch = useAppDispatch();
  const onLogOutHandler = useCallback(() => dispatch(logoutTC({})), []);
  return {
    status,
    isLoggedIn,
    onLogOutHandler,
  };
};
