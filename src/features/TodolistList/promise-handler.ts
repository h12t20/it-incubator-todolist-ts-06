import {AxiosResponse} from "axios";
import {ResponseType} from "../../api/todolist-api";
import {ActionType, AppThunk} from "../../app/store";
import {AppActionType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";
import {addTaskAC, changeTaskEntityStatusAC} from "./tasks-reducer";
import {Dispatch} from "@reduxjs/toolkit";


export const promiseHandler = (promise: Promise<AxiosResponse<ResponseType, ResponseType>>,
                               action: ActionType | null, todolistId: string | null, taskID: string | null): AppThunk =>
    (dispatch) => {
        promise.then((res) => {
            if (res.data.resultCode === 0) {
                action ? dispatch(action) : dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
                todolistId && !taskID ? dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded')) : undefined
                todolistId && taskID ? dispatch(changeTaskEntityStatusAC(todolistId, taskID, 'succeeded')) : undefined
            } else {
                const errorMessage = res.data.messages.length ? res.data.messages[0] : 'Some error occurred'
                throw new Error(errorMessage)
            }
        })
            .catch((error) => {
                dispatch(setAppStatusAC('failed'))
                dispatch(setAppErrorAC(error.message))
                todolistId && !taskID ? dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded')) : undefined
                todolistId && taskID ? dispatch(changeTaskEntityStatusAC(todolistId, taskID, 'succeeded')) : undefined
            })
    }
export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
type ErrorUtilsDispatchType = Dispatch<AppActionType>