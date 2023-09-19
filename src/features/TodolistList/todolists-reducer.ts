import { todolistAPI, TodolistType } from "api/todolist-api";
import { RequestStatusType, setAppStatusAC } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleServerNetworkError, promiseHandler } from "../../utils/promise-handler-utils";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";

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
export const createTodolist = createAppAsyncThunk<any, string>("todolist/createTodolist", async (title, thunkAPI) => {
  const { dispatch } = thunkAPI;
  try {
    dispatch(setAppStatusAC({ status: "loading" }));
    const res = await todolistAPI.createTodolist(title);
    if (res.data.resultCode === 0) {
      dispatch(addTodolistAC({ todoList: res.data.data.item }));
      dispatch(setAppStatusAC({ status: "succeeded" }));
    } else new Error(res.data.messages.length ? res.data.messages[0] : "Some error occurred");
  } catch (error) {
    handleServerNetworkError(error, dispatch);
  }
});
export const changeTodoTitle = createAppAsyncThunk<any, TodolistChangeType>(
  "todolist/changeTodoTitle",
  ({ todolistId, title }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return dispatch(
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
export const deleteTodolist = createAppAsyncThunk<any, string>(
  "todolist/deleteTodoList",
  (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return dispatch(
      promiseHandler(todolistAPI.deleteTodolist(todolistId), { todolistId }, todolistId, null, rejectWithValue),
    );
  },
);

const slice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    removeTodolistAC(
      state,
      action: PayloadAction<{
        todolistId: string;
      }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index > -1) state.splice(index, 1);
    },
    addTodolistAC(
      state,
      action: PayloadAction<{
        todoList: TodolistType;
      }>,
    ) {
      state.unshift({
        ...action.payload.todoList,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodoTitleAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        title: string;
      }>,
    ) {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index > -1) state[index].title = action.payload.title;
    },
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
    setTodolistAC(
      state,
      action: PayloadAction<{
        data: TodolistType[];
      }>,
    ) {
      return action.payload.data.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
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
      });
  },
});
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodoTitleAC,
  changeTodoFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistAC,
  clearDataAC,
} = slice.actions;
export const todoListsReducer = slice.reducer;
export const todolistThunks = {
  fetchTodolist,
  createTodolist,
  changeTodoTitle,
  deleteTodolist,
};
