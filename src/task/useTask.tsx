import {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {TaskStatuses} from "../api/todolist-api";

export const useTask = (id:string, title:string, status:TaskStatuses, todoListID:string) => {
    const dispatch = useDispatch();
    const onClickHandler = useCallback(() => dispatch(removeTaskAC(id, todoListID)),[id]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked? TaskStatuses.Completed: TaskStatuses.New;
        dispatch(changeTaskStatusAC(id, newStatusValue, todoListID))
    },[todoListID])
    const onChangeTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todoListID))
    }, [todoListID])

    return {
        onChangeHandler,
        onChangeTitle,
        onClickHandler
    }
}