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
import { handleServerNetworkError, promiseHandler } from "./promise-handler";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
const initialState: TasksStateType = {};
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
    addTaskAC(
      state,
      action: PayloadAction<{
        task: TaskType;
      }>,
    ) {
      state[action.payload.task.todoListId].unshift({
        ...action.payload.task,
        entityStatus: "idle",
      });
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
    setTasksAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        tasks: TaskType[];
      }>,
    ) {
      state[action.payload.todolistId] = action.payload.tasks.map((t) => ({
        ...t,
        entityStatus: "idle",
      }));
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
      .addCase(clearDataAC, () => initialState);
  },
});
export const { removeTaskAC, setTasksAC, updateTaskAC, addTaskAC, changeTaskEntityStatusAC } = slice.actions;
//thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    taskAPI
      .readTasks(todolistId)
      .then((res) => {
          dispatch(
            setTasksAC({
              todolistId,
              tasks: res.data.items,
            }),
          );
          dispatch(setAppStatusAC({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const removeTasksTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(
      changeTaskEntityStatusAC({
        todolistId,
        taskId,
        status: "loading",
      }),
    );
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
export const addTasksTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }));
    dispatch(
      changeTodolistEntityStatusAC({
        todolistId,
        status: "loading",
      }),
    );
    dispatch(promiseHandler(taskAPI.createTask(todolistId, title), null, todolistId, null));
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
      dispatch(setAppStatusAC({ status: "loading" }));
      dispatch(
        changeTaskEntityStatusAC({
          todolistId,
          taskId,
          status: "loading",
        }),
      );
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
