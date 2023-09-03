import {ActionType} from "./store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

const initialState = {
    status: 'idle' ,
    error: null as ErrorType,
    isInitialized: false
}

type InitialStateType = typeof initialState
export type AppActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> |
    ReturnType<typeof setIsInitializedAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
//actions
export const setAppStatusAC=(status:RequestStatusType)=>({
    type: 'APP/SET-STATUS',
    status
}) as const
export const setAppErrorAC=(error:ErrorType)=>({
    type: 'APP/SET-ERROR',
    error
}) as const
export const setIsInitializedAC=(isInitialized:boolean)=>({
    type: 'APP/SET-INITIALIZED',
    isInitialized
}) as const

