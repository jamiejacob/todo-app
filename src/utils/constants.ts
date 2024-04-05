import { Todo, TodoStatus } from "../model/Types";

export const initialTodos: Todo[] = [
  {
    id: "0",
    title: "Hit the gym",
    subTasks: [
      { id: "120", title: "cardio", completed: false },
      { id: "230", title: "strength", completed: true },
    ],
    notes: "Dont procastinate.. workout atleast 3 times a week",
    priority: 2,
    status: TodoStatus.PENDING,
  },
  {
    id: "1",
    title: "Visit the city",
    subTasks: [
      { id: "12", title: "eat", completed: false },
      { id: "23", title: "shop", completed: true },
    ],
    notes: "Take photos.. visit castles",
    priority: 3,
    status: TodoStatus.DONE,
  },
  {
    id: "2",
    title: "Study danish",
    subTasks: [
      { id: "11", title: "Duolingo", completed: false },
      { id: "23", title: "Homeworks", completed: true },
    ],
    notes: "Clear doubts.read kids books",
    priority: 3,
    status: TodoStatus.PROGRESS,
  },
];

export const CHIP_COLORS: Record<string, "primary" | "secondary" | "success"> =
  {
    Pending: "primary",
    Progress: "secondary",
    Done: "success",
  };
