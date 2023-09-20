import {
  changeTodoFilterAC,
  FilterValuesType,
  TodolistDomainType,
  todoListsReducer,
  todolistThunks,
} from "./todolists-reducer";

export const startState: Array<TodolistDomainType> = [
  { id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", order: 0, addedDate: "" },
  { id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle", order: 0, addedDate: "" },
];
export const newTodolistTitle = "New Todolist";
test("correct todolist should be removed", () => {
  const endState = todoListsReducer(
    startState,
    todolistThunks.deleteTodolist.fulfilled({ todolistId: "todolistId1" }, "", "todolistId1"),
  );
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe("todolistId2");
});
test("correct todolist should be added", () => {
  let newTodolist: TodolistDomainType = {
    id: "todolistId3",
    addedDate: "",
    order: 0,
    title: newTodolistTitle,
    filter: "all",
    entityStatus: "idle",
  };
  const endState = todoListsReducer(
    startState,
    todolistThunks.createTodolist.fulfilled({ item: newTodolist }, "", newTodolistTitle),
  );
  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
  const endState = todoListsReducer(
    startState,
    todolistThunks.changeTodoTitle.fulfilled({ todolistId: "todolistId2", title: newTodolistTitle }, "", {
      todolistId: "todolistId2",
      title: newTodolistTitle,
    }),
  );
  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";
  const endState = todoListsReducer(startState, changeTodoFilterAC({ id: "todolistId2", filter: newFilter }));
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
