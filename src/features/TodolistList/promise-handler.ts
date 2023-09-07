import {AxiosResponse} from "axios";
import {ResponseType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";
import {addTaskAC, changeTaskEntityStatusAC} from "./tasks-reducer";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";

export const promiseHandler = <R>(promise: Promise<AxiosResponse<ResponseType < R >, ResponseType>>,
                                  action: AnyAction | null, todolistId: string | null, taskId: string | null): AppThunk =>
    (dispatch) => {
        promise.then((res) => {
            if (res.data.resultCode === 0) {
                // @ts-ignore
                action ? dispatch(action) : dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({todolistId, status: 'succeeded'}))
                todolistId && taskId && dispatch(changeTaskEntityStatusAC({todolistId, taskId, status: 'succeeded'}))
            } else {
                const errorMessage = res.data.messages.length ? res.data.messages[0] : 'Some error occurred'
                throw new Error(errorMessage)
            }
        })
            .catch((error) => {
                dispatch(setAppStatusAC({status: 'failed'}))
                dispatch(setAppErrorAC({error: error.message}))
                todolistId && !taskId && dispatch(changeTodolistEntityStatusAC({todolistId, status: 'succeeded'}))
                todolistId && taskId && dispatch(changeTaskEntityStatusAC({todolistId, taskId, status: 'succeeded'}))
            })
    }
export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({error: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
type ErrorUtilsDispatchType = Dispatch<AnyAction>