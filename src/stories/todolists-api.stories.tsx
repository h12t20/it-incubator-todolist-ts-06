import React, {useEffect, useState} from 'react';
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.readTodolist()
            .then(res => setState(res.data));
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [title, setTitle] = useState('')
    const [state, setState] = useState<any>(null)
    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then(res => setState(res.data));
        setTitle('')
    }
    return <div>{JSON.stringify(state)} <br/>
        <input placeholder='Todolist title' value={title}
               onChange={(event => setTitle(event.currentTarget.value))}/>
        <button onClick={createTodolist}>создать</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState('');
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistID)
            .then(res => setState(res.data));
        setTodolistID('')
    }
    return <div>{JSON.stringify(state)} <br/>
        <input placeholder='TodolistID' value={todolistID}
               onChange={(event => setTodolistID(event.currentTarget.value))}/>
        <button onClick={deleteTodolist}>удалить</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState('');
    const [title, setTitle] = useState('');
    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todolistID, title)
            .then(res => setState(res.data));
        setTodolistID('');
        setTitle('')
    }
    return <div>{JSON.stringify(state)}<br/>
        <input placeholder='TodolistID' value={todolistID}
               onChange={(event => setTodolistID(event.currentTarget.value))}/>
        <input placeholder='New task title' value={title}
               onChange={(event => setTitle(event.currentTarget.value))}/>
        <button onClick={updateTodolistTitle}>обновить</button>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState('');
    const getTask = () => {
        todolistAPI.readTasks(todolistID)
            .then(res => setState(res.data));
        setTodolistID('')
    }
    return <div>{JSON.stringify(state)} <br/>
        <input placeholder='TodolistID' value={todolistID}
               onChange={(event => setTodolistID(event.currentTarget.value))}/>
        <button onClick={getTask}>получить</button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState('');
    const [title, setTitle] = useState('');
    const createTask = () => {
        todolistAPI.createTask(todolistID, title)
            .then(res => setState(res.data));
        setTodolistID('');
        setTitle('')
    }
    return <div>{JSON.stringify(state)} <br/>
        <input placeholder='TodolistID' value={todolistID}
               onChange={(event => setTodolistID(event.currentTarget.value))}/>
        <input placeholder='Task title' value={title}
               onChange={(event => setTitle(event.currentTarget.value))}/>
        <button onClick={createTask}>создать</button>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState('');
    const [taskID, setTaskID] = useState('');
    const [title, setTitle] = useState('');
    const updateTaskTitle=() => {
        todolistAPI.updateTask(todolistID, taskID, title)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)} <br/>
        <input placeholder='TodolistID' value={todolistID}
               onChange={(event => setTodolistID(event.currentTarget.value))}/>
        <input placeholder='TaskID' value={taskID}
               onChange={(event => setTaskID(event.currentTarget.value))}/>
        <input placeholder='Task title' value={title}
               onChange={(event => setTitle(event.currentTarget.value))}/>
        <button onClick={updateTaskTitle}>изменить</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistID, setTodolistID] = useState('');
    const [taskID, setTaskID] = useState('');
    const deleteTaskID = () => {
        todolistAPI.deleteTask(todolistID, taskID)
            .then(res => setState(res.data));
        setTodolistID('');
        setTaskID('')
    }
    return <div>{JSON.stringify(state)} <br/>
        <input placeholder='TodolistID' value={todolistID}
               onChange={(event => setTodolistID(event.currentTarget.value))}/>
        <input placeholder='TaskID' value={taskID}
               onChange={(event => setTaskID(event.currentTarget.value))}/>
        <button onClick={deleteTaskID}>удалить</button>
    </div>
}