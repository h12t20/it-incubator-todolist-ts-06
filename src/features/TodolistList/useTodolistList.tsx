import { useCallback, useEffect } from "react";
import { createTodolistTC, fetchTodolistTC } from "./todolists-reducer";
import { useAppDispatch, useAppSelector } from "app/hook";
import { isLoggedInSelector, todolistsSelector } from "app/selectors";

export const useTodolistList = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    setTodolist();
  }, []);
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(todolistsSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistTC(title));
    },
    [dispatch],
  );
  const setTodolist = useCallback(() => {
    dispatch(fetchTodolistTC());
  }, [dispatch]);
  return {
    todolists,
    addTodolist,
    isLoggedIn,
  };
};
