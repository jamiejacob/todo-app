import { ActionButton } from "../components/Button";
import { useSnackbar } from "../context/NotificationContext";
import { TodoContext } from "../context/TodoContext";
import { TodoStatus } from "../model/Types";
import {
  Box,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { addTodo } from "../context/TodoActions";
interface CreateTodoProps {
  open: boolean;
  handleClose: () => void;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateTodo: React.FC<CreateTodoProps> = ({ open, handleClose }) => {
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.PENDING);
  const [priority, setPriority] = useState<number | null>(2);
  const { dispatch } = useContext(TodoContext);
  const { showSnackbar } = useSnackbar();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === "") {
      showSnackbar("Please enter a task");
      return;
    }
    const todo = {
      id: new Date().getTime().toString(),
      title: title,
      status: status,
      priority: priority ?? 0,
    };

    dispatch(addTodo(todo));
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold">
          Create a new Todo
        </Typography>
        <form onSubmit={submit}>
          <TextField
            type="text"
            label="Please enter task"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            focused
          />
          <Typography variant="subtitle1">Priority</Typography>
          <Rating
            name="simple-controlled"
            value={priority}
            onChange={(event, newValue) => {
              setPriority(newValue);
            }}
          />
          <FormControl className="pt-3">
            <RadioGroup
              name="controlled-radio-buttons-group"
              value={status}
              onChange={(e) => setStatus(e.target.value as TodoStatus)}
              row
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
          <Box textAlign="right">
            <ActionButton>Save</ActionButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTodo;
