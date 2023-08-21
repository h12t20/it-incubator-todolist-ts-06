import {useCallback} from 'react';
import {createTodolistTC, fetchTodolistTC} from "./todolists-reducer";
import {TaskType} from "../../api/task-api";
import {useAppDispatch, useAppSelector} from "../../app/hook";
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const useTodolistList = () => {
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists);
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch]);
    const setTodolist = useCallback(() => {
        dispatch(fetchTodolistTC())
    }, [dispatch]);
    return {
        todolists,
        addTodolist,
        setTodolist
    }
}

