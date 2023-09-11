import { addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC } from "./tasks-reducer";
import { addTodolistAC } from "./todolists-reducer";

import { TaskPriorities, TaskStatuses, TaskType } from "api/task-api";

const nTask = {
  id: "5",
  status: 2,
  priority: 0,
  addedDate: "",
  order: 0,
  todoListId: "todolistId2",
  title: "juse",
  deadline: "",
  startDate: "",
  description: "",
};
export const startState: TasksStateType = {
  todolistId1: [
    {
      id: "1",
      title: "CSS",
      status: TaskStatuses.New,
      description: "",
      addedDate: "",
      startDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriorities.Middle,
      todoListId: "todolistId1",
    },
    {
      id: "2",
      title: "JS",
      status: TaskStatuses.Completed,
      description: "",
      addedDate: "",
      startDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriorities.Middle,
      todoListId: "todolistId1",
    },
    {
      id: "3",
      title: "React",
      status: TaskStatuses.New,
      description: "",
      addedDate: "",
      startDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriorities.Middle,
      todoListId: "todolistId1",
    },
  ],
  todolistId2: [
    {
      id: "1",
      title: "bread",
      status: TaskStatuses.New,
      description: "",
      addedDate: "",
      startDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriorities.Middle,
      todoListId: "todolistId2",
    },
    {
      id: "2",
      title: "milk",
      status: TaskStatuses.Completed,
      description: "",
      addedDate: "",
      startDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriorities.Middle,
      todoListId: "todolistId2",
    },
    {
      id: "3",
      title: "tea",
      status: TaskStatuses.New,
      description: "",
      addedDate: "",
      startDate: "",
      deadline: "",
      order: 0,
      priority: TaskPriorities.Middle,
      todoListId: "todolistId2",
    },
  ],
};

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC({
    taskId: "2",
    todolistId: "todolistId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        description: "",
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Middle,
        todoListId: "todolistId1",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Middle,
        todoListId: "todolistId1",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        description: "",
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Middle,
        todoListId: "todolistId1",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        description: "",
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Middle,
        todoListId: "todolistId2",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        description: "",
        addedDate: "",
        startDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Middle,
        todoListId: "todolistId2",
      },
    ],
  });
});
test("correct task should be added to correct array", () => {
  const newTask: TaskType = {
    id: "5",
    status: 0,
    priority: 0,
    addedDate: "",
    order: 0,
    todoListId: "todolistId2",
    title: "juse",
    deadline: "",
    startDate: "",
    description: "",
  };
  const action = addTaskAC({ task: newTask });
  const endState = tasksReducer(startState, action);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juse");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const action = updateTaskAC({
    taskId: "1",
    task: nTask,
    todolistId: "todolistId2",
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todolistId2"][2].status).toBe(TaskStatuses.New);
  expect(endState["todolistId2"][1].title).toBe("milk");
});

test("title of specified task should be changed", () => {
  const action = updateTaskAC({
    taskId: "1",
    task: nTask,
    todolistId: "todolistId2",
  });
  const endState = tasksReducer(startState, action);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][0].title).toBe("juse");
  expect(endState["todolistId2"][0].status).toBe(2);
  expect(endState["todolistId2"][1].title).toBe("milk");
});
test("new array should be added when new todolist is added", () => {
  const action = addTodolistAC({
    todoList: {
      id: "new todolist",
      title: "",
      addedDate: "",
      order: 0,
    },
  });
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
