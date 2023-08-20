import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TaskActionType, tasksReducer} from "../features/TodoloistList/tasks-reducer";
import {TodoActionType, todoListsReducer} from "../features/TodoloistList/todolists-reducer";
import {TodolistType} from "../api/todolist-api";
import {TaskPriorities, TaskStatuses} from "../api/task-api";
import {useDispatch} from "react-redux";
const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todoListsReducer})
export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})
type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const dispatch = useAppDispatch()
export type ActionType = TodoActionType | TaskActionType;
export type StateType={
    todolists:TodolistType[],
    tasks:TasksStateType
}
export type AppRootStateType = ReturnType<typeof rootReducer>

