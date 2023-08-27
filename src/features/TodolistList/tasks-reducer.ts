import {ActionType, AppThunk, RootState} from "../../app/store";
import {taskAPI, TaskStatuses, TaskType} from "../../api/task-api";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";
import {handleServerNetworkError, promiseHandler} from "./promise-handler";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}
export type TaskActionType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> |
    ReturnType<typeof setTasksAC> | ReturnType<typeof updateTaskAC> | ReturnType<typeof changeTaskEntityStatusAC>

//actions
export const removeTaskAC = (id: string, todolistId: string) => ({
    type: 'REMOVE-TASKS', id, todolistId}) as const
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task, entityStatus:'idle'}) as const
export const updateTaskAC = (id: string, task: TaskType, todolistId: string) =>
    ({type: 'UPDATE-TASK', id, task, todolistId}) as const
export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'SET-TASKS', todolistId, tasks, entityStatus: 'idle'}) as const
export const changeTaskEntityStatusAC = (todolistId: string, id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, id, status}) as const

//thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.readTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {handleServerNetworkError(error, dispatch )})
}
export const removeTasksTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId,'loading'))
    dispatch(promiseHandler(taskAPI.deleteTask(todolistId, taskId), removeTaskAC(taskId, todolistId), todolistId, taskId))
}
export const addTasksTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    dispatch(promiseHandler(taskAPI.createTask(todolistId, title), null, todolistId, null))
}
export const updateTaskTC = (taskId: string, todolistId: string, newValue: string | null, newStatus: TaskStatuses | null):
    AppThunk => (dispatch, getState: () => RootState) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        const changedTask = {
            ...task,
            title: newValue != null ? newValue : task.title,
            status: newStatus != null ? newStatus : task.status
        }
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(todolistId, taskId,'loading'))
        dispatch(promiseHandler(taskAPI.updateTask(todolistId, taskId, changedTask),
            updateTaskAC(taskId, changedTask, todolistId), todolistId, taskId))
    } else dispatch(setAppErrorAC('Some error occurred'))
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: action.entityStatus}, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ?
                    {...t, ...action.task} : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoList.id]: []
            }
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state}
            delete stateCopy[action.todolistId];
            return stateCopy
        case 'SET-TODOLIST': {
            const stateCopy = {...state}
            action.data.forEach((tl) => {
                stateCopy[tl.id] = []
            });
            return stateCopy
        }
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks.map(el=>({...el, entityStatus: action.entityStatus}))
            }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return  {...state,
            [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ?
            {...t, entityStatus: action.status} : t)}
        default:
            return state
    }
}

