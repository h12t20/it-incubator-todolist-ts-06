import React, { FC } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components/editablespan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTask } from "./useTask";
import { TaskStatuses } from "common/enums";
import { TaskType } from "common/types/types";
import s from "./Task.module.scss";

type Props = {
  task: TaskType;
  id: string;
  disabled: boolean;
  entityStatus: string;
};
export const Task: FC<Props> = React.memo(({ task, id }) => {
  const { changeTaskStatus, changeTaskTitle, removeTask } = useTask(task.id, id);
  const disabled = task.entityStatus === "loading";
  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox
        id={task.id}
        onChange={changeTaskStatus}
        checked={task.status === TaskStatuses.Completed}
        disabled={disabled}
      />
      <span className={s.task}>
        <EditableSpan onChangeTitle={changeTaskTitle} value={task.title} disabled={disabled} />
      </span>
      <IconButton onClick={removeTask} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
});
