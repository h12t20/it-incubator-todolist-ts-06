import { useAppDispatch, useAppSelector } from "./hook";
import { useEffect } from "react";
import { initializeApp } from "features/login/auth-reducer";
import { isInitializedSelector } from "app/selectors";

export const useApp = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, []);
  const isInitialized = useAppSelector(isInitializedSelector);
  return { isInitialized };
};
