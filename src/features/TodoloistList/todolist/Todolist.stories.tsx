import React from "react";
import {ReduxStoreProviderDecorator} from "../../../stories/ReduxStoreProviderDecorator";
import {Todolist} from "./Todolist";


export default {
    title: 'Todolist Component',
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator]
}

export const TodolistBaseExample=()=>{
    return <>
        <Todolist id='todolistId1' title='What to learn' filter='all'/>
        <Todolist id='todolistId2' title='What to buy' filter='all'/>
    </>
}