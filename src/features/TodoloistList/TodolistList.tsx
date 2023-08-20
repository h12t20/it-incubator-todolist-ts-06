import {useTodolistList} from "./useTodolistList";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/additemform/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import Container from "@mui/material/Container";
import React, {useEffect} from "react";

export const TodolistList = () => {
    useEffect(() => setTodolist(), []);
    const {todolists, addTodolist, setTodolist} = useTodolistList();
    return (
        <div>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3} style={{padding: '20px'}}>
                    {todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper key={tl.id} style={{padding: '10px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>)
}