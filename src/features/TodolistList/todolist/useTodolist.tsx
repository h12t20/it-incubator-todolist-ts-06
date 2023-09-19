import { useCallback } from "react";
import { changeTodoTitle, deleteTodolist, FilterValuesType } from "../todolists-reducer";
import { addTasks } from "../tasks-reducer";
import { TaskStatuses } from "api/task-api";
import { useAppDispatch, useAppSelector } from "app/hook";
import { tasksSelectorCreator } from "app/selectors";

export const useTodolist = (todolistId: string, filter: FilterValuesType) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(tasksSelectorCreator(todolistId));
  const removeTodolist = useCallback(() => {
    dispatch(deleteTodolist(todolistId));
  }, [todolistId]);
  const addTask = useCallback(
    (title: string) => {
      dispatch(addTasks({ todolistId, title }));
    },
    [todolistId],
  );
  const onChangeTodoTitle = useCallback(
    (title: string) => {
      dispatch(changeTodoTitle({ todolistId, title }));
    },
    [todolistId],
  );
  let tasksForTodolist = tasks ? tasks : [];
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
