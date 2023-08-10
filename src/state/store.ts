import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../App";
const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todoListsReducer})
export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});
export type StateType={
    todolists:TodolistType[],
    tasks:TasksStateType
}
export type AppRootStateType = ReturnType<typeof rootReducer>

