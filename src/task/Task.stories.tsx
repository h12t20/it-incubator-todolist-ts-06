import React from "react";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample=()=>{
    return <>
        <Task task={{id:'1', isDone:true, title:'CSS' }} id={'todolostId1'}/>
        <Task task={{id:'2', isDone:false, title:'JS' }} id={'todolostId2'}/>
    </>
}