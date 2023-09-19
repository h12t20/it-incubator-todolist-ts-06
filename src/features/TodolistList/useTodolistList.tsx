import { useCallback, useEffect } from "react";
import { createTodolist, fetchTodolist } from "./todolists-reducer";
import { useAppDispatch, useAppSelector } from "app/hook";
import { isLoggedInSelector, todolistsSelector } from "app/selectors";
import { fetchTasks } from "./tasks-reducer";
import { TodolistType } from "../../api/todolist-api";

export const useTodolistList = () => {
  useEffect(() => {
    console.log(isLoggedIn);
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
      dispatch(createTodolist(title));
    },
    [dispatch],
  );
  const setTodolist = useCallback(() => {
    dispatch(fetchTodolist()).then((res) =>
      res.payload.data.map((tdl: TodolistType) => {
        dispatch(fetchTasks(tdl.id));
      }),
    );
  }, [dispatch]);
  return {
    todolists,
    addTodolist,
    isLoggedIn,
  };
};
