import {useCallback, useEffect} from 'react';
import {createTodolistTC, fetchTodolistTC} from "./todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hook";

export const useTodolistList = () => {
    useEffect(() => {
        if (!isLoggedIn) {return}
        setTodolist()}, []);
    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists);
    const isLoggedIn=useAppSelector(state => state.auth.isLoggedIn);
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch]);
    const setTodolist = useCallback(() => {dispatch(fetchTodolistTC())}, [dispatch]);
    return {todolists, addTodolist, isLoggedIn}
}

