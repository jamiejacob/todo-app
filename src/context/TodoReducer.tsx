import { initialTodos } from "../utils/constants";
import { Todo } from "../model/Types";

export interface TodoCounterState {
  todos: Todo[];
}

export type TodoCounterAction =
  | { type: "ADD"; payload: Todo }
  | { type: "DELETE"; payload: Todo }
  | { type: "UPDATE"; payload: Todo }
  | { type: "ADDSUBTASK"; payload: Todo }
  | { type: "DELETESUBTASK"; payload: Todo }
  | { type: "UPDATESUBTASK"; payload: Todo };

const defaultState = { todos: initialTodos };

export const initializer = (initialValue = defaultState) => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : initialValue;
};
export const todoReducer = (
  state: TodoCounterState,
  action: TodoCounterAction
): TodoCounterState => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "UPDATE":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload.id),
      };

    case "ADDSUBTASK":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, subTasks: action.payload.subTasks }
            : item
        ),
      };
    case "DELETESUBTASK":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, subTasks: action.payload.subTasks }
            : item
        ),
      };
    case "UPDATESUBTASK":
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.payload.id
            ? { ...action.payload, subTasks: action.payload.subTasks }
            : item
        ),
      };

    default:
      return state;
  }
};
