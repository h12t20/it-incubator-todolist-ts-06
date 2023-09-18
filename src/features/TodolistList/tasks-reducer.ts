import { AppThunk, RootState } from "app/store";
import { taskAPI, TaskStatuses, TaskType } from "api/task-api";
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from "app/app-reducer";
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  clearDataAC,
  removeTodolistAC,
  setTodolistAC,
} from "./todolists-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";
import { handleServerNetworkError, promiseHandler } from "../../utils/promise-handler-utils";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
const initialState: TasksStateType = {};
export const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[];
    todolistId: string;
  },
  string
>("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(setAppStatusAC({ status: "loading" }));
    const res = await taskAPI.readTasks(todolistId);
    const tasks = res.data.items;
    dispatch(setAppStatusAC({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});
export const addTasksTC = createAppAsyncThunk<
  {
    task: TaskType;
    todolistId: string;
  },
  { todolistId: string; title: string }
>("tasks/addTasks", async ({ todolistId, title }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  /*promiseHandler(taskAPI.createTask(todolistId, title), null, todolistId, null, thunkAPI);*/
  try {
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(changeTodolistEntityStatusAC({ todolistId, status: "loading" }));
    const res = await taskAPI.createTask(todolistId, title);
    const task = res.data.data.item;
    dispatch(setAppStatusAC({ status: "succeeded" }));
    dispatch(changeTodolistEntityStatusAC({ todolistId, status: "succeeded" }));
    return { task, todolistId };
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    dispatch(setAppStatusAC({ status: "failed" }));
    dispatch(changeTodolistEntityStatusAC({ todolistId, status: "failed" }));
    return rejectWithValue(null);
  }
});
const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        todolistId: string;
      }>,
    ) {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) state[action.payload.todolistId].splice(index, 1);
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        taskId: string;
        task: TaskType;
        todolistId: string;
      }>,
    ) {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) state[action.payload.todolistId][index] = action.payload.task;
    },
    changeTaskEntityStatusAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        status: RequestStatusType;
      }>,
    ) {
      const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
      if (index > -1) state[action.payload.todolistId][index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolistAC, (state, action) => {
        return {
          ...state,
          [action.payload.todoList.id]: [],
        };
      })
      .addCase(removeTodolistAC, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(setTodolistAC, (state, action) => {
        action.payload.data.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearDataAC, () => initialState)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
          ...t,
          entityStatus: "idle",
        }));
      })
      .addCase(addTasksTC.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift({
          ...action.payload.task,
          entityStatus: "idle",
        });
      });
  },
});
export const { removeTaskAC, updateTaskAC, changeTaskEntityStatusAC } = slice.actions;
//thunks

export const removeTasksTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch) => {
    dispatch(
      promiseHandler(
        taskAPI.deleteTask(todolistId, taskId),
        removeTaskAC({
          taskId,
          todolistId,
        }),
        todolistId,
        taskId,
      ),
    );
  };

export const updateTaskTC =
  (taskId: string, todolistId: string, newValue: string | null, newStatus: TaskStatuses | null): AppThunk =>
  (dispatch, getState: () => RootState) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      const changedTask = {
        ...task,
        title: newValue != null ? newValue : task.title,
        status: newStatus != null ? newStatus : task.status,
      };
      dispatch(
        promiseHandler(
          taskAPI.updateTask(todolistId, taskId, changedTask),
          updateTaskAC({
            taskId,
            task: changedTask,
            todolistId,
          }),
          todolistId,
          taskId,
        ),
      );
    } else dispatch(setAppErrorAC({ error: "Some error occurred" }));
  };
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTasksTC };
