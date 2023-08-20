import {tasksReducer} from "./tasks-reducer";
import {removeTodolistAC, addTodolistAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {startState} from "./tasks-reducer.test";
import {TasksStateType} from '../../app/store';
const todo:TodolistDomainType={ id:'todolist1', order:0, addedDate:'', title:'new todo', filter:'all'}
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC(todo)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodolists).toBe(action.todoList.id)
})
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action);


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined()
})
