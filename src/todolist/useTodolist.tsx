import {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {ChangeTodoFilterAC, ChangeTodoTitleAC, FilterValuesType, RemoveTodolistAC} from "../state/todolists-reducer";
import {addTaskAC} from "../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";
/*

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
*/

export const useTodolist = (id:string, filter:FilterValuesType)=>{
    const tasks = useSelector<AppRootStateType,
        TaskType[]>(state => state.tasks[id]);
    const dispatch = useDispatch();

    const removeTodolist = useCallback(() => {
        dispatch(RemoveTodolistAC(id))
    }, [id]);
    const onAllClickHandler = useCallback(() =>
        dispatch(ChangeTodoFilterAC(id, "all")), []);
    const onActiveClickHandler = useCallback(() =>
        dispatch(ChangeTodoFilterAC(id, "active")), []);
    const onCompletedClickHandler = useCallback(() =>
        dispatch(ChangeTodoFilterAC(id, "completed")), []);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [id]);
    const onChangeTodoTitle = useCallback((newValue: string) => {
        dispatch(ChangeTodoTitleAC(id, newValue))
    }, [id])
    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status===TaskStatuses.New);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status===TaskStatuses.Completed);
    }

    return {
        removeTodolist,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        addTask,
        onChangeTodoTitle,
        tasksForTodolist
    }
}
