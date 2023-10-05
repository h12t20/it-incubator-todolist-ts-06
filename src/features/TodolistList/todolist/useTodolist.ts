import { useCallback } from "react";
import { changeTodoTitle, deleteTodolist } from "../todolists-reducer";
import { addTasks } from "../tasks-reducer";
import { useAppDispatch, useAppSelector } from "app/hook";
import { tasksSelectorCreator } from "app/selectors";
import { TaskStatuses } from "common/enums";
import { FilterValuesType } from "common/types/types";

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
