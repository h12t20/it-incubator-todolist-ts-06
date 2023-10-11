import { useCallback, useEffect } from "react";
import { createTodolist, fetchTodolist } from "./todolists-reducer";
import { useAppDispatch, useAppSelector } from "common/hooks/hook";
import { isLoggedInSelector, sortSelector, themeSelector, todolistsSelector } from "common/selectors/selectors";
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
  const sortType = useAppSelector(sortSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const theme = useAppSelector(themeSelector);
  const todo = sortType === "by ABC" ? [...todolists].sort((a, b) => (a.title < b.title ? -1 : 1)) : todolists;
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
    addTodolist,
    isLoggedIn,
    todo,
    theme,
  };
};
