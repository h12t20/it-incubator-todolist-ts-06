import {AxiosResponse} from "axios";
import {ResponseType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";
import {addTaskAC, changeTaskEntityStatusAC} from "./tasks-reducer";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";

export const promiseHandler = <R>(promise: Promise<AxiosResponse<ResponseType < R >, ResponseType>>,
                                  action: AnyAction | null, todolistId: string | null, taskID: string | null): AppThunk =>
    (dispatch) => {
        promise.then((res) => {
            if (res.data.resultCode === 0) {
                // @ts-ignore
                action ? dispatch(action) : dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                todolistId && !taskID && dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'succeeded'}))
                todolistId && taskID && dispatch(changeTaskEntityStatusAC({todolistId, id: taskID, status: 'succeeded'}))
            } else {
                const errorMessage = res.data.messages.length ? res.data.messages[0] : 'Some error occurred'
                throw new Error(errorMessage)
            }
        })
            .catch((error) => {
                console.log(error)
                dispatch(setAppStatusAC({status: 'failed'}))
                dispatch(setAppErrorAC({error: error.message}))
                todolistId && !taskID && dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'succeeded'}))
                todolistId && taskID && dispatch(changeTaskEntityStatusAC({todolistId, id: taskID, status: 'succeeded'}))
            })
    }
export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({error: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}
type ErrorUtilsDispatchType = Dispatch<AnyAction>