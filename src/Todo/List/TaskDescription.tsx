import { FontIcon, mergeStyles, TeachingBubble } from "@fluentui/react";
import { useBoolean, useId } from "@fluentui/react-hooks";
import { ITask } from "../Types";
import TaskListStyle from "./TaskList.style";

type Props = {
  task: ITask;
};

const TaskDescription = ({ task }: Props) => {
  const buttonId = useId("targetButton");
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] =
    useBoolean(false);

  return (
    <>
      <FontIcon
        id={buttonId}
        iconName="Info"
        className={
          task.description
            ? TaskListStyle.iconCompass
            : mergeStyles(TaskListStyle.iconCompass, TaskListStyle.disabled)
        }
        onClick={toggleTeachingBubbleVisible}
      />
      {teachingBubbleVisible && (
        <TeachingBubble
          target={`#${buttonId}`}
          headline={task.title}
          onDismiss={toggleTeachingBubbleVisible}
        >
          {task.description}
        </TeachingBubble>
      )}
    </>
  );
};

export default TaskDescription;
