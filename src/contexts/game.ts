import { createContext } from "react";
import { IContext } from "../interfaces/IContext";
import { INITIAL_STATE } from "../reducers/game";

export const GameContext = createContext<IContext>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
