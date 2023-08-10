import React from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../todolist/Todolist";
import {useTask} from "./useTask";

export type TaskPropsType = {
    task:TaskType
    id: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const {
        onChangeHandler,
        onChangeTitle,
        onClickHandler
    } = useTask(props.task.id, props.task.title, props.task.isDone, props.id)

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox id={props.task.id} onChange={onChangeHandler} checked={props.task.isDone}/>
        <EditableSpan onChangeTitle={onChangeTitle} value={props.task.title}/>
        <IconButton onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </div>
})