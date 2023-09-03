import {ActionType, AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {setAppStatusAC, setIsInitializedAC} from "../../app/app-reducer";
import {promiseHandler} from "../TodolistList/promise-handler";
import {clearDataAC} from "../TodolistList/todolists-reducer";

const initialState={isLoggedIn: false};
//types
type authStateType=typeof initialState
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>

//actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (loginParams: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(promiseHandler(authAPI.login(loginParams), setIsLoggedInAC(true), null, null))
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(promiseHandler(authAPI.logout().then((res)=>{
        if (res.data.resultCode === 0) dispatch(clearDataAC());
        return res}), setIsLoggedInAC(false), null, null));

}
export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(promiseHandler(authAPI.me().finally(()=>dispatch(setIsInitializedAC(true))),
        setIsLoggedInAC(true), null, null))

}
export const authReducer = (state: authStateType = initialState, action: ActionType): authStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

