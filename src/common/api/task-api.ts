import { instance } from "./instance";
import { BaseResponse, TaskType } from "../types/types";

export const taskAPI = {
  readTasks(todolistId: string) {
    return instance.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse>(`/todo-lists/${todolistId}/tasks`, { title: title });
  },
  updateTask(todolistId: string, taskId: string, task: TaskType) {
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, { ...task });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
//types
export type TaskResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};
