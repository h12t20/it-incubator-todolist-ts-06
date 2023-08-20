import {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {removeTasksTC, updateTaskTC} from "../../tasks-reducer";
import {TaskStatuses} from "../../../../api/task-api";
import {AppDispatch} from "../../../../app/store";

export const useTask = (id: string, todoListID: string) => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();
    const removeTask = useCallback(() => dispatch(removeTasksTC(todoListID, id)), [id]);
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked ?
            TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC(id, todoListID, null, newStatusValue))
    }, [todoListID])
    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(updateTaskTC(id, todoListID, newValue, null))
    }, [todoListID])

    return {
        changeTaskStatus,
        changeTaskTitle,
        removeTask
    }
}