import { TodoContext } from "../context/TodoContext";
import { Subtask, TodoStatus } from "../model/Types";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ActionButton } from "../components/Button";
import { useSnackbar } from "../context/NotificationContext";
import { useNavigate, useParams } from "react-router-dom";
import { addSubTasks,deleteSubTasks,deleteTodo,updateSubTasks,updateTodo} from "../context/TodoActions";
import { genUniqueId } from "../utils/IdGenerator";

const EditTodo = () => {
  const { id } = useParams() as { id: string };
  const { state: { todos },dispatch} = useContext(TodoContext);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [subTasks, setSubTasks] = useState<Subtask[]>([]);
  const [currentSubtask, setCurrentSubtask] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.PENDING);

  useEffect(() => {
    if (todos) {
      const currentTask = todos.find((item) => item.id === id);
      if (currentTask) {
        setTitle(currentTask.title);
        setNotes(currentTask.notes ?? "");
        setSubTasks(currentTask.subTasks ?? []);
        setPriority(currentTask.priority ?? 0);
        setStatus(currentTask.status);
      } else {
        //Todo is not found
        console.log(`Todo with id ${id} not found`);
      }
    }
  }, [id, todos]);

  let titleContent, notesContent;
  if (isEditing) {
    titleContent = (
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="standard"
      />
    );
    notesContent = (
      <TextField
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
        }}
        sx={{ width: "100%" }}
      />
    );
  } else {
    titleContent = (
      <>
        <h2>{title}</h2>
        <ActionButton handleSubmit={() => setIsEditing(true)}>
          <EditIcon fontSize="small"></EditIcon>
        </ActionButton>
      </>
    );
    notesContent = (
      <>
        <Typography fontStyle="italic" variant="body1" color="text.secondary">
          {notes}
        </Typography>
      </>
    );
  }

  const todo = {
    id: id,
    title: title,
    subTasks: subTasks,
    status: status,
    priority: priority,
    notes: notes,
  };

  const handleError = () => {
    showSnackbar("An error has occured please try again");
  };
  
  const addNewSubtask = (e: FormEvent) => {
    e.preventDefault();
    if (currentSubtask) {
      const newSubTasks = [
        ...subTasks,
        { id: genUniqueId(), title: currentSubtask, completed: false },
      ];
      try {
        dispatch(addSubTasks({ ...todo, subTasks: newSubTasks }));
        setCurrentSubtask("");
        showSnackbar("Sub task added");
      } catch (error) {
        handleError();
      }
    }
  };

  const deleteSubtask = (subtaskId: string) => {
    let newSubTasks = subTasks.filter((subtask) => subtask.id !== subtaskId);
    try{
    dispatch(deleteSubTasks({ ...todo, subTasks: newSubTasks }));
    showSnackbar("Sub task deleted");
    }
    catch(error){
      handleError()
    }
  };

  const updateSubtask = (
    e: React.ChangeEvent<HTMLInputElement>,
    subtask: Subtask
  ) => {
    let newSubTasks = subTasks.map((stask) =>
      stask.id === subtask.id
        ? { ...stask, completed: e.target.checked }
        : stask
    );
    dispatch(updateSubTasks({ ...todo, subTasks: newSubTasks }));
  };

  const updateHandler = () => {
    try{
    dispatch(updateTodo(todo));
    showSnackbar("Todo updated");
    navigate("/");
    }
    catch(error){
      handleError();
    }
  };

  const deleteHandler = () => {
    try{
    dispatch(deleteTodo(todo));
    showSnackbar("Todo deleted");
    navigate("/");
    }
    catch(error){
      handleError();
    }
  };
  return (
    <Container>
      {/* Title Section */}
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        justifyContent="space-between"
        paddingY={2}
      >
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          {titleContent}
        </Stack>
        <Rating
          title="Priority"
          value={priority}
          onChange={(event, newValue) => {
            setPriority(newValue??0);
          }}
        />
      </Stack>

      {/* Sub tasks Section */}
      <Box paddingY={1} paddingTop={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Sub tasks
        </Typography>

        <form onSubmit={addNewSubtask}>
          <Stack direction="row" spacing={2} paddingTop={2}>
            <TextField
              type="text"
              placeholder="Add new subtask"
              value={currentSubtask}
              onChange={(e) => setCurrentSubtask(e.target.value)}
            />
            <ActionButton>+ Add</ActionButton>
          </Stack>
        </form>
        {subTasks?.map((subtask) => (
          <div key={subtask.id}>
            <Typography variant="body2">
              <Checkbox
                checked={subtask.completed}
                value={subtask.completed}
                onChange={(e) => {
                  updateSubtask(e, subtask);
                }}
              />
              {subtask.title}
              <Button onClick={() => deleteSubtask(subtask.id)}>
                <DeleteIcon></DeleteIcon>
              </Button>
            </Typography>
          </div>
        ))}
      </Box>

      {/* Status Section */}
      <Box paddingY={2}>
        <FormControl>
          <Typography variant="subtitle1" fontWeight="bold">
            Status
          </Typography>
          <RadioGroup
            value={status}
            onChange={(e) => setStatus(e.target.value as TodoStatus)}
          >
            {Object.values(TodoStatus).map((status, index) => (
              <FormControlLabel
                key={index}
                value={status}
                control={<Radio />}
                label={status}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Notes Section */}
      <Stack direction="column">
        <Typography variant="subtitle1" fontWeight="bold">
          Notes
        </Typography>
        <Box paddingTop={2}>{notesContent}</Box>
      </Stack>

      {/* Action buttons */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={4}
        sx={{ padding: "10px" }}
      >
        <ActionButton handleSubmit={updateHandler}>Update</ActionButton>
        <ActionButton handleSubmit={deleteHandler}>Delete</ActionButton>
      </Stack>
    </Container>
  );
};

export default EditTodo;
