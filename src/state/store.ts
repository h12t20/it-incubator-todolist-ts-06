import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TaskActionType, tasksReducer} from "./tasks-reducer";
import {TodoActionType, todoListsReducer} from "./todolists-reducer";
import {TasksStateType} from "../app/App";
import {TodolistType} from "../api/todolist-api";
const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todoListsReducer})
export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ActionType = TodoActionType | TaskActionType;
export type StateType={
    todolists:TodolistType[],
    tasks:TasksStateType
}
export type AppRootStateType = ReturnType<typeof rootReducer>

