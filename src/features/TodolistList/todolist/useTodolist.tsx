import { useCallback } from "react";
import { changeTodoTitleTC, deleteTodolistTC, FilterValuesType } from "../todolists-reducer";
import { addTasksTC } from "../tasks-reducer";
import { TaskStatuses } from "api/task-api";
import { useAppDispatch, useAppSelector } from "app/hook";
import { tasksSelectorCreator } from "features/TodolistList/todolist/todolist.selectors";

export const useTodolist = (id: string, filter: FilterValuesType) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(tasksSelectorCreator(id));
  const removeTodolist = useCallback(() => {
    dispatch(deleteTodolistTC(id));
  }, [id]);
  const addTask = useCallback(
    (title: string) => {
      dispatch(addTasksTC(id, title));
    },
    [id],
  );
  const onChangeTodoTitle = useCallback(
    (newValue: string) => {
      dispatch(changeTodoTitleTC(id, newValue));
    },
    [id],
  );
  let tasksForTodolist = tasks;
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return {
    removeTodolist,
    addTask,
    onChangeTodoTitle,
    tasksForTodolist,
  };
};
