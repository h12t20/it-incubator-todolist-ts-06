import {useCallback} from 'react';
import {AppRootStateType, dispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {createTodolistTC, fetchTodolistTC, TodolistDomainType} from "./todolists-reducer";
import {TaskType} from "../../api/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const useTodolistList = () => {
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

