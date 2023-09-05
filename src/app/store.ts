import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import {TaskActionType, tasksReducer} from "../features/TodolistList/tasks-reducer";
import {TodoActionType, todoListsReducer} from "../features/TodolistList/todolists-reducer";
import {AppActionType, appReducer} from "./app-reducer";
import {AuthActionType, authReducer} from "../features/login/auth-reducer";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todoListsReducer,
        app: appReducer,
        auth: authReducer
    },
    devTools: true
})
//types
export type ActionType = TodoActionType | TaskActionType | AppActionType | AuthActionType;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionType>

