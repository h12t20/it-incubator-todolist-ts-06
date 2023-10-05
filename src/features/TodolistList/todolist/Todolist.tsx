import React, { FC } from "react";
import { AddItemForm, EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "./task/Task";
import { useTodolist } from "./useTodolist";
import { Filter } from "./filter/Filter";
import s from "./Todolist.module.css";
import { FilterValuesType, RequestStatusType } from "common/types/types";

type Props = {
  id: string;
  title: string;
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export const Todolist: FC<Props> = React.memo(({ title, entityStatus, id, filter }) => {
  const { removeTodolist, addTask, onChangeTodoTitle, tasksForTodolist } = useTodolist(id, filter);
  const disabled = entityStatus === "loading";
  return (
    <div>
      <h3>
        <EditableSpan onChangeTitle={onChangeTodoTitle} value={title} disabled={disabled} entityStatus={entityStatus} />
        <IconButton onClick={removeTodolist} disabled={disabled}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={disabled} />
      <div className={s.todolist}>
        {tasksForTodolist.map((task) => (
          <Task key={task.id} task={task} id={id} disabled={disabled} entityStatus={entityStatus} />
        ))}
      </div>
      <Filter id={id} filter={filter} />
    </div>
  );
});
