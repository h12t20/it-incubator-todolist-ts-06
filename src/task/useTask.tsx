import {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {
    changeTaskTitleTC,
    removeTasksTC,
    updateTaskStatusTC
} from "../state/tasks-reducer";

import {TaskStatuses} from "../api/task-api";
import {AppDispatch} from "../state/store";

export const useTask = (id: string, todoListID: string) => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();
    const removeTask = useCallback(() => dispatch(removeTasksTC(todoListID, id)), [id]);
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskStatusTC(id, todoListID, newStatusValue))
    }, [todoListID])
    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleTC(id, todoListID, newValue))
    }, [todoListID])

    return {
        changeTaskStatus,
        changeTaskTitle,
        removeTask
    }
}