import { tasksReducer, TasksStateType } from "./tasks-reducer";
import { todoListsReducer, todolistThunks } from "./todolists-reducer";
import { startState } from "./tasks-reducer.test";
import { TodolistDomainType } from "common/types/types";

const todo: TodolistDomainType = {
  id: "todolist1",
  order: 0,
  addedDate: "",
  title: "new todo",
  filter: "all",
  entityStatus: "idle",
};
test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = todolistThunks.createTodolist.fulfilled({ item: todo }, "", "1234");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todoListsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.item.id);
  expect(idFromTodolists).toBe(action.payload.item.id);
});
test("property with todolistId should be deleted", () => {
  const action = todolistThunks.deleteTodolist.fulfilled({ todolistId: "todolistId2" }, "", "todolistId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
