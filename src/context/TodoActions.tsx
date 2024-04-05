import { Todo } from "../model/Types"
import { TodoCounterAction } from "./TodoReducer"

export const addTodo=(todo:Todo):TodoCounterAction=>({
    type:"ADD",
    payload:todo
})

export const deleteTodo =(todo:Todo):TodoCounterAction=>({
    type:"DELETE",
    payload:todo
})
export const updateTodo =(todo:Todo):TodoCounterAction=>({
    type:"UPDATE",
    payload:todo
})

export const addSubTasks =(todo:Todo):TodoCounterAction=>({
    type:"ADDSUBTASK",
    payload:todo
})
export const deleteSubTasks =(todo:Todo):TodoCounterAction=>({
    type:"DELETESUBTASK",
    payload:todo
})

export const updateSubTasks =(todo:Todo):TodoCounterAction=>({
    type:"UPDATESUBTASK",
    payload:todo
})

