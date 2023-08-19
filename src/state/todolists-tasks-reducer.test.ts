import {removeTodolistAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {startState} from "./tasks-reducer.test";
import {TasksStateType} from "../app/App";

/*test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = AddTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodolists).toBe(action.todoList.id)
})*/
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action);


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined()
})
