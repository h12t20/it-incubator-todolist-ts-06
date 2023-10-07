import { useAppDispatch, useAppSelector } from "common/hooks/hook";
import { useCallback } from "react";
import { logout } from "../login/auth-reducer";
import { isLoggedInSelector, statusSelector } from "common/selectors/selectors";

export const useHeader = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const status = useAppSelector(statusSelector);
  const dispatch = useAppDispatch();
  const onLogOutHandler = useCallback(() => dispatch(logout()), []);
  return {
    status,
    isLoggedIn,
    onLogOutHandler,
  };
};
