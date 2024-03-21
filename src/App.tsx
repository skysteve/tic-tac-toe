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

        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-body-secondary">
              © 2024 Steve Jenkins
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                href="https://www.skysteve.com/"
                className="nav-link px-2 text-body-secondary"
              >
                Home
              </a>
            </li>
            <li className="ms-3">
              <a
                href="https://github.com/skysteve/tic-tac-toe"
                className="nav-link px-2 text-body-secondary"
              >
                Source Code
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </GameContext.Provider>
  );
}
