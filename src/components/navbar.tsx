/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { GameContext } from "../contexts/game";

const availableBoardSizes = [3, 5, 7, 9];

export function NavBar() {
  const {
    dispatch,
    state: {
      data: { player, winner, gameType, difficulty },
    },
  } = useContext(GameContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">Tic Tac Toe</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Board size
              </a>
              <ul className="dropdown-menu">
                {availableBoardSizes.map((size) => (
                  <li key={size}>
                    <span
                      className="dropdown-item"
                      onClick={() =>
                        dispatch({ type: "SET_BOARD_SIZE", data: size })
                      }
                    >
                      {size}x{size}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Game Type
              </a>
              <ul className="dropdown-menu">
                <li>
                  <span
                    className="dropdown-item"
                    onClick={() =>
                      dispatch({ type: "SET_GAME_TYPE", data: "PVP" })
                    }
                    style={{
                      backgroundColor: gameType === "PVP" ? "lightgreen" : "",
                    }}
                  >
                    Player v Player
                  </span>
                </li>
                <li>
                  <span
                    className="dropdown-item"
                    onClick={() =>
                      dispatch({ type: "SET_GAME_TYPE", data: "PVC" })
                    }
                    style={{
                      backgroundColor: gameType === "PVC" ? "lightgreen" : "",
                    }}
                  >
                    Player v Computer
                  </span>
                </li>
              </ul>
            </li>
            {gameType === "PVC" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Difficulty
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <span
                      className="dropdown-item"
                      onClick={() =>
                        dispatch({ type: "SET_DIFFICULTY", data: "easy" })
                      }
                      style={{
                        backgroundColor:
                          difficulty === "easy" ? "lightgreen" : "",
                      }}
                    >
                      Easy
                    </span>
                  </li>
                  <li>
                    <span
                      className="dropdown-item"
                      onClick={() =>
                        dispatch({ type: "SET_DIFFICULTY", data: "hard" })
                      }
                      style={{
                        backgroundColor:
                          difficulty === "hard" ? "lightgreen" : "",
                      }}
                    >
                      Hard
                    </span>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <span
                className="nav-link active"
                onClick={() => dispatch({ type: "RESET", data: null })}
              >
                Reset
              </span>
            </li>
          </ul>
          {winner ? null : (
            <ul className="nav nav-pills navbar-right">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{
                    backgroundColor:
                      player === "X" ? "lightblue" : "lightcoral",
                    cursor: "default",
                  }}
                >
                  Player: {player}
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
