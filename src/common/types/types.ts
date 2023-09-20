import { TaskPriorities, TaskStatuses } from "../enums";

export type BaseResponse<
  D = {
    item: TaskType;
  },
> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};
export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
  entityStatus?: RequestStatusType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorType = string | null;
