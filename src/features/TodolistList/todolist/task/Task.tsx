import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "components/editablespan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTask } from "./useTask";
import { TaskStatuses, TaskType } from "api/task-api";

export type TaskPropsType = {
  task: TaskType;
  id: string;
  disabled: boolean;
  entityStatus: string;
};
export const Task = React.memo((props: TaskPropsType) => {
  const { changeTaskStatus, changeTaskTitle, removeTask } = useTask(props.task.id, props.id);
  const disabled = props.task.entityStatus === "loading";
  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox
        id={props.task.id}
        onChange={changeTaskStatus}
        checked={props.task.status === TaskStatuses.Completed}
        disabled={disabled}
      />
      <EditableSpan onChangeTitle={changeTaskTitle} value={props.task.title} disabled={disabled} />
      <IconButton onClick={removeTask} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
});
