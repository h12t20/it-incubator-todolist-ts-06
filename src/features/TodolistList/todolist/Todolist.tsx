import React from "react";
import { AddItemForm, EditableSpan } from "common/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "./task/Task";
import { useTodolist } from "./useTodolist";
import { Filter } from "./filter/Filter";
import s from "./Todolist.module.css";
import { FilterValuesType, RequestStatusType } from "common/types/types";

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export const Todolist = React.memo((props: PropsType) => {
  const { removeTodolist, addTask, onChangeTodoTitle, tasksForTodolist } = useTodolist(props.id, props.filter);
  const disabled = props.entityStatus === "loading";
  return (
    <div>
      <h3>
        <EditableSpan
          onChangeTitle={onChangeTodoTitle}
          value={props.title}
          disabled={disabled}
          entityStatus={props.entityStatus}
        />
        <IconButton onClick={removeTodolist} disabled={disabled}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={disabled} />
      <div className={s.todolist}>
        {tasksForTodolist.map((task) => (
          <Task key={task.id} task={task} id={props.id} disabled={disabled} entityStatus={props.entityStatus} />
        ))}
      </div>
      <Filter id={props.id} filter={props.filter} />
    </div>
  );
});
