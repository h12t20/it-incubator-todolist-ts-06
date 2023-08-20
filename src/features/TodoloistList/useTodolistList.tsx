import {useCallback} from 'react';
import {AppDispatch, AppRootStateType} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {createTodolistTC, fetchTodolistTC, TodolistDomainType} from "./todolists-reducer";
import {TaskType} from "../../api/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const useTodolistList = () => {
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType,
        Array<TodolistDomainType>>(state => state.todolists);
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

