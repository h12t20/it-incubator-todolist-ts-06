import { instance } from "../../../common/api/instance";
import { BaseResponse, TodolistType } from "../../../common/types/types";

export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, { title: title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`);
  },
  createTodolist(title: string) {
    return instance.post<
      BaseResponse<{
        id: any;
        item: TodolistType;
      }>
    >("/todo-lists", { title: title });
  },
  readTodolist() {
    return instance.get<Array<TodolistType>>("/todo-lists");
  },
};
