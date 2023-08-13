import axios from 'axios'

export type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': 'f866834e-8cfc-4d13-b77d-5b9822baa8e3'}
})
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{
            item: TodolistType
        }>>('/todo-lists', {title: title})
    },
    readTodolist() {
        return instance.get<Array<TodolistType>>('/todo-lists')
    },
    readTasks(todolistId: string) {
        return instance.get<TaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{
            item: TaskType
        }>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}