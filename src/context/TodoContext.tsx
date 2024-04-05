import React, { createContext, useEffect, useReducer } from "react";
import { initialTodos } from "../utils/constants";
import {
  initializer,
  TodoCounterAction,
  TodoCounterState,
  todoReducer,
} from "./TodoReducer";

export interface TodoContextModel {
  state: TodoCounterState;
  dispatch: React.Dispatch<TodoCounterAction>;
}

export const TodoContext = createContext({} as TodoContextModel);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    todoReducer,
    { todos: initialTodos },
    initializer
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
