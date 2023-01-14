import { Dispatch } from "react";

export enum PivotKeysEnum {
  Tasks = "Tasks",
  TaskForm = "TaskForm",
  Completed = "CompletedTasks",
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  isFav: boolean;
}

export interface ITodoContext {
  activeTasks: ITask[];
  completedTasks: ITask[];
  dispatch: Dispatch<any>;
}

export interface ITodoState {
  activeTasks: ITask[];
  completedTasks: ITask[];
}

export enum ActionTypeEnum {
  Add,
  Delete,
  ToggleFavorite,
  Update,
  Completed,
  DeleteCompletedTask,
}

export type IReducerAction =
  | IToggleAction
  | IAddAction
  | IDeleteAction
  | IUpdateAction
  | ICompletedAction
  | IDeleteCompletedAction;

export interface IAddAction {
  type: ActionTypeEnum.Add;
  data: ITask;
}

export interface IDeleteAction {
  type: ActionTypeEnum.Delete;
  data: { id: string };
}

export interface IToggleAction {
  type: ActionTypeEnum.ToggleFavorite;
  data: { id: string };
}

export interface IUpdateAction {
  type: ActionTypeEnum.Update;
  data: ITask;
}

export interface ICompletedAction {
  type: ActionTypeEnum.Completed;
  data: { id: string };
}

export interface IDeleteCompletedAction {
  type: ActionTypeEnum.DeleteCompletedTask;
  data: { id: string };
}
