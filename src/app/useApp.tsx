import {useCallback} from 'react';
import './App.css';
import {TaskType} from '../todolist/Todolist';
import {AppRootStateType} from "../state/store";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolistAC} from "../state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const useApp=()=> {
    const todolists=useSelector<AppRootStateType,
        Array<TodolistType>>(state=>state.todolists);
    const dispatch=useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    },[dispatch]);
    return {
        todolists,
        addTodolist,
    }
}


