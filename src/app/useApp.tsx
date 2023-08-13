import {useCallback} from 'react';
import './App.css';
import {AppRootStateType} from "../state/store";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolistAC, TodolistDomainType} from "../state/todolists-reducer";
import {TaskType} from "../api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const useApp=()=> {
    const todolists=useSelector<AppRootStateType,
        Array<TodolistDomainType>>(state=>state.todolists);
    const dispatch=useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    },[dispatch]);
    return {
        todolists,
        addTodolist,
    }
}

