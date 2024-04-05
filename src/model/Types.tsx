export type Todo ={
    id:string;
    title:string,
    notes?:string,
    priority?:number,
    subTasks? :Subtask[];
    status:TodoStatus;
}

export type Subtask ={
    id:string;
    title:string;
    completed:boolean;
}
  export enum TodoStatus {
    PENDING = "Pending",
    PROGRESS = "Progress",
    DONE = "Done",
  }