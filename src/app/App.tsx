import React from 'react';
import './App.css';
import {TodolistList} from "../features/TodoloistList/TodolistList";
import {Header} from "../features/header/Header";

function App() {
    return (
        <div className="App">
            <div className='AppBar'>
               <Header/>
            </div>
               <TodolistList/>
        </div>
    );
}
export default App;

