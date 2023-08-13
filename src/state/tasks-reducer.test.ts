import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {AddTodolistAC} from './todolists-reducer';
import {TasksStateType} from '../app/App';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export const startState: TasksStateType = {
    'todolistId1': [
        {id: '1', title: 'CSS', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'},
        {id: '2', title: 'JS',status: TaskStatuses.Completed, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'},
        {id: '3', title: 'React', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'}
    ],
    'todolistId2': [
        {id: '1', title: 'bread', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId2'},
        {id: '2', title: 'milk', status: TaskStatuses.Completed, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId2'},
        {id: '3', title: 'tea', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
            deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId2'}
    ]
}

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
                deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'},
            {id: '2', title: 'JS',status: TaskStatuses.Completed, description:'', addedDate:'', startDate:'',
                deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'},
            {id: '3', title: 'React', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
                deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId1'}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
                deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId2'},
            {id: '3', title: 'tea', status: TaskStatuses.New, description:'', addedDate:'', startDate:'',
                deadline:'', order:0, priority: TaskPriorities.Middle, todoListId:'todolistId2'}
        ]
    })
})
test('correct task should be added to correct array', () => {

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('1', TaskStatuses.Completed, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][2].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][1].title).toBe('milk')
})

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('1', 'vodka', 'todolistId2')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe('vodka')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][1].title).toBe('milk')
})
test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
