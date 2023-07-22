import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AppBar from '@mui/material/AppBar';
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolistAC, ChangeTodoFilterAC, ChangeTodoTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const tasks=useSelector<AppRootStateType,
        TasksStateType>(state=>state.tasks);
    const todolists=useSelector<AppRootStateType,
        Array<TodolistType>>(state=>state.todolists);
    const dispatch=useDispatch()

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id,todolistId))
    }

    function addTask(title: string, todolistId: string) {
       dispatch(addTaskAC(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
       dispatch(changeTaskStatusAC(id,isDone,todolistId))
    }

    function updateTasks(id: string, title: string, todolistId: string) {
       dispatch(changeTaskTitleAC(id,title,todolistId))
    }


    function updateTL(todolistId: string, title: string) {
        dispatch(ChangeTodoTitleAC(todolistId,title))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(ChangeTodoFilterAC(todolistId,value))
    }

    function removeTodolist(id: string) {
        dispatch(RemoveTodolistAC(id))
    }

    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title))
    }
    return (
        <div className="App">
            <div className='AppBar'>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Todolist
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3} style={{padding: '20px'}}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid key={v1()} item>
                                <Paper key={v1()} style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTasks={updateTasks}
                                        updateTL={updateTL}
                                    />
                                </Paper> </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
