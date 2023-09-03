import {TaskType} from "../api/task-api";
import {useAppDispatch, useAppSelector} from "./hook";
import {useEffect} from "react";
import {initializeAppTC} from "../features/login/auth-reducer";
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export const useApp = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {dispatch(initializeAppTC())}, []);
    const isInitialized=useAppSelector(state => state.app.isInitialized)
    return {isInitialized}
}

