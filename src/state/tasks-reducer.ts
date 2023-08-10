import {TasksStateType} from "../App";
import {TaskType} from "../todolist/Todolist";
import {v1} from "uuid";
import {AddTodoActionType} from "./todolists-reducer";

export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTasksActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>

const initialState:TasksStateType= {
    ['todolistId1']: [
        {
            id: v1(),
            title: "HTML&CSS",
            isDone: true
        },
        {
            id: v1(),
            title: "JS",
            isDone: true
        }
    ],
    ['todolistId2']: [
        {
            id: v1(),
            title: "Milk",
            isDone: true
        },
        {
            id: v1(),
            title: "React Book",
            isDone: true
        }
    ]
}
export type TaskActionType = RemoveTasksActionType | AddTasksActionType |
    changeTaskStatusActionType | ChangeTaskTitleActionType |
    RemoveTodolistActionType | AddTodoActionType
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASKS',
        id: id,
        todolistId: todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string)=> {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id: id,
        isDone:isDone,
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

export const RemoveTodolistAC = (todolistId:string)=> {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId: todolistId
    } as const
}

export const tasksReducer = (state: TasksStateType=initialState, action: TaskActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            let newTasks: TaskType[] = state[action.todolistId];
            return {
                ...state,
                [action.todolistId]: newTasks.filter(t => t.id !== action.id)
            };
        case 'ADD-TASK':
            let newTodoTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let todoListTasks = state[action.todolistId];
            return ({
                ...state, [action.todolistId]: [newTodoTask, ...todoListTasks]
            })
        case 'CHANGE-TASK-STATUS':
            let todoTasks = state[action.todolistId];
            return {...state, [action.todolistId]:todoTasks.map(t=>t.id===action.id?
                    {...t, isDone:action.isDone}:t)}
        case 'CHANGE-TASK-TITLE':
            let changedTasks = state[action.todolistId];
            return {...state, [action.todolistId]:changedTasks.map(t=>t.id===action.id?
                    {...t, title:action.title}:t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []};
        case 'REMOVE-TODOLIST':
               let stateCopy= {...state}
            delete stateCopy[action.todolistId];
            return stateCopy;
        default:
           return state

    }
}

