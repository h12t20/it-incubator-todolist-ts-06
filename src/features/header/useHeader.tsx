import {useAppDispatch, useAppSelector} from "../../app/hook";
import {useCallback} from "react";
import {logoutTC} from "../login/auth-reducer";
export const useHeader = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const onLogOutHandler = useCallback(() => dispatch(logoutTC()),[])
    return {status, isLoggedIn, onLogOutHandler}
}

