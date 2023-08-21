import {ActionType, AppRootStateType, AppThunk} from "../../app/store";
import {taskAPI, TaskStatuses, TaskType} from "../../api/task-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState:TasksStateType= {}
export type TaskActionType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> |
    ReturnType<typeof setTasksAC> | ReturnType<typeof updateTaskAC>

//actions
export const removeTaskAC = (id: string, todolistId: string) => ({type: 'REMOVE-TASKS', id, todolistId}) as const
export const addTaskAC = (task:TaskType)=>({type: 'ADD-TASK', task}) as const
export const updateTaskAC = (id: string, task: TaskType, todolistId: string) =>
    ({type: 'UPDATE-TASK', id, task, todolistId}) as const
export const setTasksAC = (todolistId:string, tasks:TaskType[])=> ({type: 'SET-TASKS', todolistId, tasks}) as const

//thunks
export const fetchTasksTC = (todolistId:string):AppThunk => (dispatch) => {
    taskAPI.readTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const removeTasksTC = (todolistId:string, taskId:string):AppThunk => (dispatch) => {
    taskAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTasksTC = (todolistId:string, title:string):AppThunk => (dispatch) => {
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (taskId: string, todolistId: string, newValue:string | null, newStatus:TaskStatuses | null):
    AppThunk=> (dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {const changedTask= {...task, title:newValue!=null? newValue: task.title,
            status: newStatus!=null? newStatus:task.status}
            taskAPI.updateTask(todolistId, taskId, changedTask)
            .then(() => {dispatch(updateTaskAC(taskId, changedTask, todolistId))})}}
export const tasksReducer = (state: TasksStateType=initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)};
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]:[action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]:state[action.todolistId].map(t=>t.id===action.id?
                    {...t, ...action.task}:t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []};
        case 'REMOVE-TODOLIST':
               let stateCopy= {...state}
            delete stateCopy[action.todolistId];
            return stateCopy;
        case 'SET-TODOLIST': {
            const stateCopy = {...state}
            action.data.forEach((tl) => {
                stateCopy[tl.id] = []});
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
           return state
    }
}

