import {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

export const useTask = (id:string, title:string, isDone:boolean, todoListID:string) => {
    const dispatch = useDispatch();
    const onClickHandler = useCallback(() => dispatch(removeTaskAC(id, todoListID)),[id]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todoListID))
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