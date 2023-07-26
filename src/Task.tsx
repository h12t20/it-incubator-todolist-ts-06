import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task:TaskType
    id: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch();
    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.id));
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.id))
    }
    const onChangeTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.id))
    }, [])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeHandler} checked={props.task.isDone}/>
        <EditableSpan onChangeTitle={onChangeTitle} value={props.task.title}/>
        <IconButton onClick={onClickHandler}>
            <DeleteIcon/>
        </IconButton>
    </div>
})