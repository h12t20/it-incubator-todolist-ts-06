import { todolistAPI, TodolistType } from "api/todolist-api";
import { RequestStatusType, setAppStatusAC } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { promiseHandler } from "../../utils/promise-handler-utils";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";
import { handleServerNetworkError } from "../../utils/handle-server-network-error";

const initialState: TodolistDomainType[] = [];
//types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type TodolistChangeType = {
  todolistId: string;
  title: string;
};
export const fetchTodolist = createAppAsyncThunk<any>("todolist/fetchTodolist", async (undefined, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(setAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.readTodolist();
    return { data: res.data };
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});
export const createTodolist = createAppAsyncThunk<{ item: TodolistType }, string>(
  "todolist/createTodolist",
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return dispatch<any>(
      promiseHandler<{ item: TodolistType }>(todolistAPI.createTodolist(title), null, null, null, rejectWithValue),
    );
  },
);
export const changeTodoTitle = createAppAsyncThunk<{ todolistId: string; title: string }, TodolistChangeType>(
  "todolist/changeTodoTitle",
  ({ todolistId, title }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return dispatch<any>(
      promiseHandler(
        todolistAPI.updateTodolist(todolistId, title),
        { todolistId, title },
        todolistId,
        null,
        rejectWithValue,
      ),
    );
  },
);
export const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  "todolist/deleteTodoList",
  (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return dispatch<any>(
      promiseHandler(todolistAPI.deleteTodolist(todolistId), { todolistId }, todolistId, null, rejectWithValue),
    );
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
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        status: RequestStatusType;
      }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index > -1) state[index].entityStatus = action.payload.status;
    },
    clearDataAC() {
      return initialState;
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
      .addCase(changeTodoTitle.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
        if (index > -1) state[index].title = action.payload.title;
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
        if (index > -1) state.splice(index, 1);
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        console.log(action);
        state.unshift({
          ...action.payload.item,
          filter: "all",
          entityStatus: "idle",
        });
      });
  },
});
export const { changeTodoFilterAC, changeTodolistEntityStatusAC, clearDataAC } = slice.actions;
export const todoListsReducer = slice.reducer;
export const todolistThunks = {
  fetchTodolist,
  createTodolist,
  changeTodoTitle,
  deleteTodolist,
};
