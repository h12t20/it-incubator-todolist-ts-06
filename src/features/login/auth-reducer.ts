import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {setAppStatusAC, setIsInitializedAC} from "../../app/app-reducer";
import {promiseHandler} from "../TodolistList/promise-handler";
import {clearDataAC} from "../TodolistList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState={isLoggedIn: false};
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
export const authReducer = slice.reducer
//types
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
//Thunks
export const loginTC = (loginParams: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(promiseHandler(authAPI.login(loginParams), setIsLoggedInAC({value: true}), null, null))
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(promiseHandler(authAPI.logout().then((res)=>{
        if (res.data.resultCode === 0) dispatch(clearDataAC());
        return res
    }), setIsLoggedInAC({value: false}), null, null));

}
export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(promiseHandler(authAPI.me().finally(() => dispatch(setIsInitializedAC({isInitialized: true}))),
        setIsLoggedInAC({value: true}), null, null))
}

