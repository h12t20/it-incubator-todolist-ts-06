import React from 'react';
import './App.css';
import {TodolistList} from "../features/TodolistList/TodolistList";
import {Header} from "../features/header/Header";
export const App=()=>{
    return (
        <div className="App">
            <div className='AppBar'>
               <Header/>
            </div>
               <TodolistList/>
        </div>
    );
}

