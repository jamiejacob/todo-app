import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { CHIP_COLORS } from "../utils/constants";
import { Todo, TodoStatus } from "../model/Types";

const style = {
  height: 300,
  width: 300,
  p: 4,
  overflow: "scroll",
  "@media (max-width: 600px)": {
    width: 250,
  },
};
const TodoCard: FC<Todo> = (todo) => {
  let titleContent = (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h5"
          style={{
            textDecoration:
              todo.status === TodoStatus.DONE ? "line-through" : "none",
          }}
        >
          {todo.title}
        </Typography>
        <Chip
          label={todo.status}
          size="small"
          color={CHIP_COLORS[todo.status]}
        ></Chip>
      </Stack>
    </>
  );
  return (
    <div>
      <Card sx={style}>
        {/* Title with status and rating */}
        <CardHeader
          title={titleContent}
          subheader={<Rating value={todo.priority} size="small" readOnly />}
        ></CardHeader>

        <CardContent>
          {/* Subtasks */}
          {todo.subTasks?.map((task, index) => (
            <FormGroup key={index}>
              <FormControlLabel
                control={<Checkbox checked={task.completed} readOnly />}
                label={task.title}
              />
            </FormGroup>
          ))}

          {/* Notes */}
          <Tooltip title="Notes">
            <Typography
              variant="body1"
              color="text.secondary"
              fontSize="small"
              fontStyle="italic"
            >
              {todo.notes}
            </Typography>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoCard;
