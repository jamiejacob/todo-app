import { ActionButton } from "../components/Button";
import TodoCard from "../containers/TodoCard";
import { TodoContext } from "../context/TodoContext";
import { Box,Container,FormControl,Grid,InputLabel,MenuItem,Select,Stack,Typography} from "@mui/material";
import { useContext, useState } from "react";
import CreateTodo from "../containers/CreateTodo";
import { useNavigate } from "react-router-dom";
import { Todo, TodoStatus } from "../model/Types";

type TodoListProps ={
  todos:Todo[]
}

function TodoList({todos}:TodoListProps){
  const navigate = useNavigate();

  return(
    <Grid container spacing={2}>
    {todos.length !== 0 ? (
      todos.map((todo) => (
        <Grid item xs={12} sm={6} lg={4} key={todo.id}
          justifyContent="space-around"
          alignItems="">
          <Box component="div"
            onClick={() => navigate(`/todo/${todo.id}`)}
            display="flex"
            alignItems="center"
            p={2}
          >
            <TodoCard {...todo} />
          </Box>
        </Grid>
      ))
    ) : (
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="center">    
          <Typography variant="h6">You have no tasks</Typography>
        </Box>
      </Grid>
    )}
  </Grid>
  )
}

export default function Home() {
  const { state: { todos }} = useContext(TodoContext);
console.log(todos)
  const [open, setOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTodos = todos.filter((todo) => {
    if (statusFilter === "All") return true;
    return todo.status === statusFilter;
  });

  return (
    <Container>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        padding={1}
        justifyContent="space-between"
        alignItems={{ xs: "center", sm: "center" }}
      >
        {/* Create new task button */}
        <ActionButton handleSubmit={() => setOpen(true)}>
         + Create New Task
        </ActionButton>

        {/* Filter tasks by status */}
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="status-filter-label">Filter by Status</InputLabel>
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem key="All" value="All">
              All tasks
            </MenuItem>
            {Object.values(TodoStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Todo list grid*/}
     <TodoList todos ={filteredTodos}/>

      {/* Create a new todo*/}
     <CreateTodo open={open} handleClose={() => setOpen(false)}></CreateTodo>

    </Container>
  );
}
