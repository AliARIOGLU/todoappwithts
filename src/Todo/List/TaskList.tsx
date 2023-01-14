import { useContext } from "react";
import TaskListStyle from "./TaskList.style";
import {
  Checkbox,
  FontIcon,
  mergeStyles,
  MessageBar,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { ActionTypeEnum, ITask } from "../Types";
import { TodoContext } from "../TodoProvider";
import TodoString from "../String.json";
import TaskDescription from "./TaskDescription";

type Props = {
  setEditTask: (taskId: string) => void;
};

const TaskList = ({ setEditTask }: Props) => {
  const { activeTasks, dispatch } = useContext(TodoContext);

  const onTaskDelete = (id: string) => {
    if (window.confirm(TodoString.deleteConfirm)) {
      dispatch({ type: ActionTypeEnum.Delete, data: { id } });
    }
  };

  const onFavoriteClick = (id: string) => {
    dispatch({ type: ActionTypeEnum.ToggleFavorite, data: { id } });
  };

  const checkboxClickedHnd = (id: string) => {
    dispatch({ type: ActionTypeEnum.Completed, data: { id } });
  };

  const onRenderCell = (task: ITask) => {
    return (
      <Stack horizontal className={TaskListStyle.taskItem} key={task.id}>
        <Stack horizontal style={{ width: "85%" }}>
          <Checkbox
            onChange={() => {
              checkboxClickedHnd(task.id);
            }}
          />
          {task.title}
        </Stack>
        <Stack horizontal style={{ width: "15%" }}>
          <TaskDescription task={task} />
          <FontIcon
            iconName={task.isFav ? "FavoriteStarFill" : "FavoriteStar"}
            className={
              task.isFav
                ? mergeStyles(TaskListStyle.iconCompass, { color: "red" })
                : TaskListStyle.iconCompass
            }
            onClick={() => onFavoriteClick(task.id)}
          />
          <FontIcon
            iconName="EditNote"
            className={TaskListStyle.iconCompass}
            onClick={() => {
              setEditTask(task.id);
            }}
          />
          <FontIcon
            iconName="Delete"
            className={TaskListStyle.iconCompass}
            onClick={() => onTaskDelete(task.id)}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <div>
      {activeTasks.length ? (
        activeTasks.map(onRenderCell)
      ) : (
        <MessageBar>No tasks to show!</MessageBar>
      )}
    </div>
  );
};

export default TaskList;
