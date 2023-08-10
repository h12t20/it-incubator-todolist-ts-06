import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {useTodolist} from "./todolist/useTodolist";

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
    const {
        removeTodolist,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        addTask,
        onChangeTodoTitle,
        tasksForTodolist
    } = useTodolist(props.id, props.filter)

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
