import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { tasksReducer } from "features/TodolistList/tasks-reducer";
import { todoListsReducer } from "features/TodolistList/todolists-reducer";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/login/auth-reducer";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          `payload.meta.arg.promise`,
          `meta.arg.promise`,
          `meta.arg.rejectWithValue`,
          `payload.meta.arg.rejectWithValue`,
        ],
      },
    }),
});
//types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
