import React, { FC } from "react";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "common/components/editablespan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTask } from "./useTask";
import { TaskStatuses } from "common/enums";
import { TaskType } from "common/types/types";
import s from "./Task.module.scss";
import { darkTheme, lightTheme } from "../../../../common/components/additemform/AddItemForm";
import { ThemeProvider } from "@mui/material";

type Props = {
  task: TaskType;
  id: string;
  disabled: boolean;
  entityStatus: string;
  theme: string;
};
export const Task: FC<Props> = React.memo(({ task, theme, id }) => {
  const { changeTaskStatus, changeTaskTitle, removeTask } = useTask(task.id, id);
  const disabled = task.entityStatus === "loading";
  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ""}>
      <ThemeProvider theme={theme === "Dark" ? darkTheme : lightTheme}>
        <Checkbox
          id={task.id}
          onChange={changeTaskStatus}
          checked={task.status === TaskStatuses.Completed}
          disabled={disabled}
        />
      </ThemeProvider>
      <span className={s.task}>
        <EditableSpan onChangeTitle={changeTaskTitle} value={task.title} disabled={disabled} />
      </span>
      <ThemeProvider theme={theme === "Dark" ? darkTheme : lightTheme}>
        <IconButton onClick={removeTask} disabled={disabled}>
          <DeleteIcon />
        </IconButton>
      </ThemeProvider>
    </div>
  );
});
