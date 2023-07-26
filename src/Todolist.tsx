import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {ChangeTodoFilterAC, ChangeTodoTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist')
    const tasks = useSelector<AppRootStateType,
        TaskType[]>(state => state.tasks[props.id]);
    const dispatch = useDispatch();

    const removeTodolist = useCallback(() => {
        dispatch(RemoveTodolistAC(props.id))
    }, [props.id]);
    const onAllClickHandler = useCallback(() =>
        dispatch(ChangeTodoFilterAC(props.id, "all")), []);
    const onActiveClickHandler = useCallback(() =>
        dispatch(ChangeTodoFilterAC(props.id, "active")), []);
    const onCompletedClickHandler = useCallback(() =>
        dispatch(ChangeTodoFilterAC(props.id, "completed")), []);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [props.id]);
    const onChangeTodoTitle = useCallback((newValue: string) => {
        dispatch(ChangeTodoTitleAC(props.id, newValue))
    }, [props.id])
    let tasksForTodolist = tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan onChangeTitle={onChangeTodoTitle} value={props.title}/>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(task =>
                    <Task key={task.id} task={task} id={props.id}/>
                )
            }
        </div>
        <div className='button'>
            <Button size='small' color='primary' variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button size='small' color='success' variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button size='small' color='secondary' variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

