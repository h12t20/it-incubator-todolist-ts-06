import { taskAPI } from "features/TodolistList/todolist/task/task-api";
import { todolistThunks } from "./todolists-reducer";
import { AnyAction, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { TaskStatuses } from "common/enums";
import { TaskType, TodolistType } from "common/types/types";
import { logout } from "../login/auth-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export type removeTaskType = {
  todolistId: string;
  taskId: string;
};
export type AddTaskArgType = {
  todolistId: string;
  title: string;
};
export type UpdateTaskArgType = {
  taskId: string;
  todolistId: string;
  newValue: string | null;
  newStatus: TaskStatuses | null;
};
export type UpdateTaskReturnType = {
  todolistId: string;
  taskId: string;
  task: TaskType;
};
const initialState: TasksStateType = {};
export const ResultCode = {
  success: 0,
  error: 1,
  captcha: 10,
} as const;
export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId: string) => {
    const res = await taskAPI.readTasks(todolistId);
    const tasks = res.data.items;
    return { tasks, todolistId };
  },
);
export const addTasks = createAppAsyncThunk<{ item: TaskType }, AddTaskArgType>(
  "tasks/addTasks",
  async (arg: AddTaskArgType) => {
    const res = await taskAPI.createTask(arg.todolistId, arg.title);
    if (res.data.resultCode === ResultCode.success) {
      return { item: res.data.data.item };
    } else throw new Error(res.data.messages[0]);
  },
);
export const updateTask = createAppAsyncThunk<UpdateTaskReturnType, UpdateTaskArgType>(
  "tasks/updateTask",
  async ({ taskId, todolistId, newValue, newStatus }, thunkAPI) => {
    const { getState } = thunkAPI;
    const task = getState().tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      const changedTask = {
        ...task,
        title: newValue != null ? newValue : task.title,
        status: newStatus != null ? newStatus : task.status,
      };
      const res = await taskAPI.updateTask(todolistId, taskId, changedTask);
      if (res.data.resultCode === ResultCode.success) {
        return {
          taskId,
          task: changedTask,
          todolistId,
        };
      } else throw new Error(res.data.messages[0]);
    } else {
      throw new Error("Task not found");
    }
  },
);
export const removeTasks = createAppAsyncThunk<removeTaskType, removeTaskType>(
  "tasks/removeTask",
  async ({ todolistId, taskId }) => {
    const res = await taskAPI.deleteTask(todolistId, taskId);
    if (res.data.resultCode === ResultCode.success) {
      return {
        taskId,
        todolistId,
      };
    } else throw new Error(res.data.messages[0]);
  },
);
const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistThunks.createTodolist.fulfilled, (state, action) => {
        return {
          ...state,
          [action.payload.item.id]: [],
        };
      })
      .addCase(todolistThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistThunks.fetchTodolist.fulfilled, (state, action) => {
        action.payload.data.forEach((tl: TodolistType) => {
          state[tl.id] = [];
        });
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
          ...t,
          entityStatus: "idle",
        }));
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state[action.payload.item.todoListId].unshift({
          ...action.payload.item,
          entityStatus: "idle",
        });
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { payload } = action;
        const index = state[payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) state[action.payload.todolistId][index] = action.payload.task;
      })
      .addCase(removeTasks.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) state[action.payload.todolistId].splice(index, 1);
      })
      .addMatcher(isFulfilled(logout), () => {
        return initialState;
      })
      .addMatcher(isPending(updateTask, removeTasks), (state, action: AnyAction) => {
        const index = state[action.meta.arg.todolistId].findIndex((t) => t.id === action.meta.arg.taskId);
        if (index > -1) state[action.meta.arg.todolistId][index].entityStatus = "loading";
      })
      .addMatcher(isFulfilled(updateTask, removeTasks), (state, action: AnyAction) => {
        const index = state[action.meta.arg.todolistId].findIndex((t) => t.id === action.meta.arg.taskId);
        if (index > -1) state[action.meta.arg.todolistId][index].entityStatus = "succeeded";
      })
      .addMatcher(isRejected(updateTask, removeTasks), (state, action: AnyAction) => {
        const index = state[action.meta.arg.todolistId].findIndex((t) => t.id === action.meta.arg.taskId);
        if (index > -1) state[action.meta.arg.todolistId][index].entityStatus = "failed";
      });
  },
});
export const tasksReducer = slice.reducer;
export const tasksThunks = { fetchTasks, addTasks, updateTask, removeTasks };
