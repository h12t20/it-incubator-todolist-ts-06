import { useAppDispatch, useAppSelector } from "../common/hooks/hook";
import { useEffect } from "react";
import { initializeApp } from "features/login/auth-reducer";
import { isInitializedSelector } from "common/selectors/selectors";

export const useApp = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, []);
  const isInitialized = useAppSelector(isInitializedSelector);
  return { isInitialized };
};
