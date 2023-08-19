import {instance} from "./instance";
import {ResponseType} from "./todolist-api";

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}

export type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
export const taskAPI = {
    readTasks(todolistId: string) {
        return instance.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{
            item: TaskType
        }>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, task: TaskType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: task.title,
            description:task.description, status:task.status, priority:task.priority, startDate:task.startDate,
            deadline:task.deadline, id:task.id, todoListId:task.todoListId, order:task.order, addedDate:task.addedDate})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}