import { useCallback } from "react";
import { changeTodoTitleTC, deleteTodolistTC, FilterValuesType } from "../todolists-reducer";
import { addTasksTC } from "../tasks-reducer";
import { TaskStatuses } from "api/task-api";
import { useAppDispatch, useAppSelector } from "app/hook";
import { tasksSelectorCreator } from "app/selectors";

export const useTodolist = (todolistId: string, filter: FilterValuesType) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(tasksSelectorCreator(todolistId));
  const removeTodolist = useCallback(() => {
    dispatch(deleteTodolistTC(todolistId));
  }, [todolistId]);
  const addTask = useCallback(
    (title: string) => {
      dispatch(addTasksTC({ todolistId, title }));
    },
    [todolistId],
  );
  const onChangeTodoTitle = useCallback(
    (newValue: string) => {
      dispatch(changeTodoTitleTC(todolistId, newValue));
    },
    [todolistId],
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
