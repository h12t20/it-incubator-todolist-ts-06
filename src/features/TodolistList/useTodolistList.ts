import { useCallback, useEffect } from "react";
import { createTodolist, fetchTodolist } from "./todolists-reducer";
import { useAppDispatch, useAppSelector } from "app/hook";
import { isLoggedInSelector, todolistsSelector } from "app/selectors";
import { fetchTasks } from "./tasks-reducer";
import { TodolistType } from "../../common/types/types";

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
      return dispatch(createTodolist(title)).unwrap();
    },
    [dispatch],
  );
  const setTodolist = useCallback(() => {
    dispatch(fetchTodolist())
      .then((res) =>
        res.payload.data.map((tdl: TodolistType) => {
          dispatch(fetchTasks(tdl.id));
        }),
      )
      .catch((error) => console.log(error));
  }, [dispatch]);
  return {
    todolists,
    addTodolist,
    isLoggedIn,
  };
};
