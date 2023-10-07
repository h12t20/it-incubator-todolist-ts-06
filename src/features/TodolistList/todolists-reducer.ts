import { todolistAPI } from "common/api/todolist-api";
import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { FilterValuesType, TodolistDomainType, TodolistType } from "common/types/types";
import { addTasks, ResultCode } from "./tasks-reducer";
import { AxiosResponse } from "axios";
import { logout } from "../login/auth-reducer";

const initialState: TodolistDomainType[] = [];
export type TodolistChangeType = {
  todolistId: string;
  title: string;
};
export const fetchTodolist = createAppAsyncThunk<any>("todolist/fetchTodolist", async () => {
  const res = await todolistAPI.readTodolist();
  return { data: res.data };
});
export const createTodolist = createAppAsyncThunk<
  {
    item: TodolistType;
  },
  string
>("todolist/createTodolist", async (title) => {
  const res: AxiosResponse = await todolistAPI.createTodolist(title);
  if (res.data.resultCode === ResultCode.success) {
    return { item: res.data.data.item };
  } else throw new Error(res.data.messages[0]);
});
export const changeTodoTitle = createAppAsyncThunk<{ todolistId: string; title: string }, TodolistChangeType>(
  "todolist/changeTodoTitle",
  async ({ todolistId, title }) => {
    const res = await todolistAPI.updateTodolist(todolistId, title);
    if (res.data.resultCode === ResultCode.success) {
      return {
        todolistId,
        title,
      };
    } else throw new Error(res.data.messages[0]);
  },
);
export const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  "todolist/deleteTodoList",
  async (todolistId: string) => {
    const res = await todolistAPI.deleteTodolist(todolistId);
    if (res.data.resultCode === ResultCode.success) {
      return { todolistId };
    } else throw new Error(res.data.messages[0]);
  },
);

const slice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    changeTodoFilterAC(
      state,
      action: PayloadAction<{
        id: string;
        filter: FilterValuesType;
      }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) state[index].filter = action.payload.filter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolist.fulfilled, (state, action) => {
        return action.payload.data.map((tl: TodolistDomainType) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(changeTodoTitle.fulfilled, (state, action: any) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
        if (index > -1) state[index].title = action.payload.title;
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
        if (index > -1) state.splice(index, 1);
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.item,
          filter: "all",
          entityStatus: "idle",
        });
      })
      .addMatcher(isFulfilled(logout), () => {
        return initialState;
      })
      .addMatcher(isPending(changeTodoTitle, deleteTodolist, addTasks), (state, action: AnyAction) => {
        const index = state.findIndex((tl) => tl.id === action.meta.arg.todolistId);
        if (index > -1) state[index].entityStatus = "loading";
      })
      .addMatcher(isFulfilled(changeTodoTitle, deleteTodolist, addTasks), (state, action: AnyAction) => {
        const index = state.findIndex((tl) => tl.id === action.meta.arg.todolistId);
        if (index > -1) state[index].entityStatus = "succeeded";
      })
      .addMatcher(isRejected(changeTodoTitle, deleteTodolist, addTasks), (state, action: AnyAction) => {
        const index = state.findIndex((tl) => tl.id === action.meta.arg.todolistId);
        if (index > -1) state[index].entityStatus = "failed";
      });
  },
});
export const { changeTodoFilterAC } = slice.actions;
export const todoListsReducer = slice.reducer;
export const todolistThunks = {
  fetchTodolist,
  createTodolist,
  changeTodoTitle,
  deleteTodolist,
};
