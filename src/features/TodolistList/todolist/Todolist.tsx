import React, { FC } from "react";
import { AddItemForm, EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "./task/Task";
import { useTodolist } from "./useTodolist";
import { Filter } from "./filter/Filter";
import s from "./Todolist.module.css";
import { FilterValuesType, RequestStatusType } from "common/types/types";
import { darkTheme, lightTheme } from "../../../common/components/additemform/AddItemForm";
import { ThemeProvider } from "@mui/material";

type Props = {
  id: string;
  title: string;
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
  theme: string;
};
export const Todolist: FC<Props> = React.memo(({ title, theme, entityStatus, id, filter }) => {
  const { removeTodolist, addTask, onChangeTodoTitle, tasksForTodolist } = useTodolist(id, filter);
  const disabled = entityStatus === "loading";
  return (
    <div style={theme === "Dark" ? { backgroundColor: "rgb(51, 74, 92)", color: "rgb(176, 196, 212)" } : {}}>
      <h3>
        <EditableSpan onChangeTitle={onChangeTodoTitle} value={title} disabled={disabled} entityStatus={entityStatus} />
        <ThemeProvider theme={theme === "Dark" ? darkTheme : lightTheme}>
          <IconButton onClick={removeTodolist} disabled={disabled}>
            <DeleteIcon />
          </IconButton>
        </ThemeProvider>
      </h3>
      <AddItemForm addItem={addTask} disabled={disabled} theme={theme} />
      <div className={s.todolist}>
        {tasksForTodolist.map((task) => (
          <Task key={task.id} theme={theme} task={task} id={id} disabled={disabled} entityStatus={entityStatus} />
        ))}
      </div>
      <Filter id={id} filter={filter} />
    </div>
  );
});
