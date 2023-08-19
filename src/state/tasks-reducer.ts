import {TasksStateType} from "../app/App";
import {AddTodoActionType} from "./todolists-reducer";
import {taskAPI, TaskStatuses, TaskType} from "../api/task-api";
import {ActionType, AppRootStateType} from "./store";
import {Dispatch} from "@reduxjs/toolkit";

export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTasksActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>


const initialState:TasksStateType= {}
export type TaskActionType = RemoveTasksActionType | AddTasksActionType |
    changeTaskStatusActionType | ChangeTaskTitleActionType |
    RemoveTodolistActionType | AddTodoActionType | SetTasksActionType
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASKS',
        id: id,
        todolistId: todolistId
    } as const
}
export const addTaskAC = (task:TaskType)=> {
    return {
        type: 'ADD-TASK',
        task: task
    } as const
}
export const changeTaskStatusAC = (id: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: id,
        status:status,
        todolistId: todolistId
    } as const
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id: id,
        title: title,
        todolistId: todolistId
    } as const
}

export const removeTodolistAC = (todolistId:string)=> {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId: todolistId
    } as const
}
export const setTasksAC = (todolistId:string, tasks:TaskType[])=> {
    return {
        type: 'SET-TASKS',
        todolistId: todolistId,
        tasks:tasks
    } as const
}
export const fetchTasksTC = (todolistId:string) => (dispatch: Dispatch) => {
    taskAPI.readTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
        })
}
export const removeTasksTC = (todolistId:string, taskId:string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTasksTC = (todolistId:string, title:string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tasksFromState = getState().tasks[todolistId]
        const task = tasksFromState.find(t => t.id === taskId)
        if (task) {taskAPI.updateTask(todolistId, taskId, {...task, status: status})
                .then(() => {dispatch(changeTaskStatusAC(taskId, status, todolistId))})}}
}
export const changeTaskTitleTC = (taskId: string, todolistId: string, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const tasksFromState = getState().tasks[todolistId]
        const task = tasksFromState.find(t => t.id === taskId)
        if (task) {taskAPI.updateTask(todolistId, taskId, {...task, title: title})
            .then(() => {dispatch(changeTaskTitleAC(taskId, title, todolistId))})}}
}
export const tasksReducer = (state: TasksStateType=initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            let newTasks: TaskType[] = state[action.todolistId];
            return {
                ...state,
                [action.todolistId]: newTasks.filter(t => t.id !== action.id)
            };
        case 'ADD-TASK':
            const copyState = {...state}
            const tasks = copyState[action.task.todoListId];
            const newTask = [action.task, ...tasks];
            copyState[action.task.todoListId] = newTask;
            return copyState;

        case 'CHANGE-TASK-STATUS':
            let todoTasks = state[action.todolistId];
            return {...state, [action.todolistId]:todoTasks.map(t=>t.id===action.id?
                    {...t, status:action.status}:t)}
        case 'CHANGE-TASK-TITLE':
            let changedTasks = state[action.todolistId];
            return {...state, [action.todolistId]:changedTasks.map(t=>t.id===action.id?
                    {...t, title:action.title}:t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []};
        case 'REMOVE-TODOLIST':
               let stateCopy= {...state}
            delete stateCopy[action.todolistId];
            return stateCopy;
        case 'SET-TODOLIST': {
            const stateCopy = {...state}
            action.data.forEach((tl) => {
                stateCopy[tl.id] = []
            });
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
           return state

    }
}

