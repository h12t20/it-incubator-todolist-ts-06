import React from "react";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../stories/ReduxStoreProviderDecorator";

import {TaskPriorities, TaskStatuses} from "../../../../api/task-api";


export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample=()=>{
    return <>
        <Task task={{id: '1', title: 'CSS', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'}} id={'todolostId1'}
              entityStatus='idle' disabled={false}/>
        <Task task={{id: '2', title: 'JS',status: TaskStatuses.Completed, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'}} id={'todolostId2'}
              entityStatus='idle' disabled={false}/>
    </>
}