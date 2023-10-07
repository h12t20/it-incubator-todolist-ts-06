import { ChangeEvent, useCallback } from "react";
import { tasksThunks } from "../../tasks-reducer";
import { useAppDispatch } from "common/hooks/hook";
import { TaskStatuses } from "common/enums";

export const useTask = (taskId: string, todolistId: string) => {
  const dispatch = useAppDispatch();
  const removeTask = useCallback(() => dispatch(tasksThunks.removeTasks({ todolistId, taskId })), [taskId]);
  const changeTaskStatus = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
      dispatch(tasksThunks.updateTask({ taskId, todolistId, newValue: null, newStatus }));
    },
    [todolistId],
  );
  const changeTaskTitle = useCallback(
    (newValue: string) => {
      dispatch(tasksThunks.updateTask({ taskId, todolistId, newValue, newStatus: null }));
    },
    [todolistId],
  );

  return {
    changeTaskStatus,
    changeTaskTitle,
    removeTask,
  };
};
