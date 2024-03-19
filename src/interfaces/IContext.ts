import { Dispatch } from "react";
import { IState } from "./IState";
import { Action } from "./IAction";

export type IContext = {
  state: IState;
  dispatch: Dispatch<Action>;
};
