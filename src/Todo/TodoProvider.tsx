import React, { createContext, useReducer } from "react";
import {
  ActionTypeEnum,
  IReducerAction,
  ITask,
  ITodoContext,
  ITodoState,
} from "./Types";

export const TodoContext = createContext<ITodoContext>({
  activeTasks: [],
  completedTasks: [],
  dispatch: () => {},
});

type Props = {
  children: React.ReactNode;
};

const reducer = (state: ITodoState, action: IReducerAction) => {
  switch (action.type) {
    case ActionTypeEnum.Add:
      return {
        ...state,
        activeTasks: [
          ...state.activeTasks,
          { ...action.data, id: new Date().toJSON() },
        ],
      };
    case ActionTypeEnum.Delete:
      return {
        ...state,
        activeTasks: state.activeTasks.filter(
          (task) => task.id !== action.data.id
        ),
      };
    case ActionTypeEnum.ToggleFavorite:
      return {
        ...state,
        activeTasks: state.activeTasks.map((task) =>
          task.id === action.data.id ? { ...task, isFav: !task.isFav } : task
        ),
      };
    case ActionTypeEnum.Update:
      return {
        ...state,
        activeTasks: state.activeTasks.map((task) =>
          task.id === action.data.id ? { ...task, ...action.data } : task
        ),
      };
    case ActionTypeEnum.Completed:
      return {
        ...state,
        completedTasks: [
          ...state.activeTasks.filter((task) => task.id === action.data.id),
          ...state.completedTasks,
        ],
        activeTasks: state.activeTasks.filter(
          (task) => task.id !== action.data.id
        ),
      };
    case ActionTypeEnum.DeleteCompletedTask:
      return {
        ...state,
        completedTasks: state.completedTasks.filter(
          (task) => task.id !== action.data.id
        ),
      };
  }
};

const TodoProvider = (props: Props) => {
  const tasks: ITask[] = [];

  const data: ITodoState = { activeTasks: tasks, completedTasks: [] };
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <TodoContext.Provider
      value={{
        activeTasks: state.activeTasks,
        completedTasks: state.completedTasks,
        dispatch,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
