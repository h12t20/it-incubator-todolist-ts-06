import {combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {TaskActionType, tasksReducer} from "../features/TodolistList/tasks-reducer";
import {TodoActionType, todoListsReducer} from "../features/TodolistList/todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})
export const store = configureStore({
    reducer: rootReducer,
    devTools: true
})
//types
export type ActionType = TodoActionType | TaskActionType;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionType>

