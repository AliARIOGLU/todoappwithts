import {
  Checkbox,
  FontIcon,
  mergeStyles,
  MessageBar,
  Stack,
} from "@fluentui/react";
import React, { useContext } from "react";
import { TodoContext } from "../TodoProvider";
import { ActionTypeEnum, ITask } from "../Types";
import TaskDescription from "./TaskDescription";
import TaskListStyle from "./TaskList.style";
import TodoString from "../String.json";

const CompletedTaskList = () => {
  const { completedTasks, dispatch } = useContext(TodoContext);

  const onCompletedDelete = (id: string) => {
    if (window.confirm(TodoString.deleteConfirm)) {
      dispatch({ type: ActionTypeEnum.DeleteCompletedTask, data: { id } });
    }
  };

  const onRenderCell = (task: ITask) => {
    return (
      <Stack horizontal className={TaskListStyle.taskItem} key={task.id}>
        <Stack
          horizontal
          style={{ width: "85%" }}
          className={TaskListStyle.disabled}
        >
          <Checkbox disabled />
          <span style={{ textDecoration: "line-through" }}>{task.title}</span>
        </Stack>
        <Stack horizontal style={{ width: "15%" }}>
          <TaskDescription task={task} />
          <FontIcon
            iconName={task.isFav ? "FavoriteStarFill" : "FavoriteStar"}
            className={mergeStyles(
              TaskListStyle.iconCompass,
              TaskListStyle.disabled
            )}
          />
          <FontIcon
            iconName="Delete"
            className={TaskListStyle.iconCompass}
            onClick={() => onCompletedDelete(task.id)}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <div>
      {completedTasks.length ? (
        completedTasks.map(onRenderCell)
      ) : (
        <MessageBar>No completed tasks to show!</MessageBar>
      )}
    </div>
  );
};

export default CompletedTaskList;
