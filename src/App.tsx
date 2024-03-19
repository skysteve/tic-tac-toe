import React, { useReducer } from "react";
import { Board } from "./components/board";
import { NavBar } from "./components/navbar";
import { INITIAL_STATE, gameReducer } from "./reducers/game";
import { GameContext } from "./contexts/game";
import "./App.css";

export function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const context = {
    state,
    dispatch,
  };

  return (
    <GameContext.Provider value={context}>
      <div className="container">
        <NavBar />

        <br />
        <Board />
      </div>
    </GameContext.Provider>
  );
}
