import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../editablespan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTask} from "./useTask";
import {TaskStatuses, TaskType} from "../api/todolist-api";

export type TaskPropsType = {
    task:TaskType
    id: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const {
        onChangeHandler,
        onChangeTitle,
        onClickHandler
    } = useTask(props.task.id, props.task.title, props.task.status, props.id)

    return <div key={props.task.id} className={props.task.status===TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox id={props.task.id} onChange={onChangeHandler} checked={props.task.status===TaskStatuses.Completed}/>
        <EditableSpan onChangeTitle={onChangeTitle} value={props.task.title}/>
        <IconButton onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </div>
})