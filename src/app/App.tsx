import React from 'react';
import './App.css';
import {TodolistList} from "../features/TodolistList/TodolistList";
import {Header} from "../features/header/Header";
import {ErrorSnackbar} from "../components/errorsnachbar/ErrorSnackbar";
export const App=()=>{
    return (
        <div className="App">
            <ErrorSnackbar/>
            <div className='AppBar'>
               <Header/>
            </div>
               <TodolistList/>
        </div>
    );
}

