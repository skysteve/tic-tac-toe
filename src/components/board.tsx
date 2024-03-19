import React, { ReactElement, useContext, useMemo } from "react";
import { Row } from "./row";
import { GameContext } from "../contexts/game";
import { Cell } from "../interfaces/IBoard";

interface AlertProps {
  isTie: boolean;
  winner: Cell;
}

function Alert({ isTie, winner }: AlertProps) {
  const { dispatch } = useContext(GameContext);
  if (isTie) {
    return (
      <div className="alert alert-info d-flex justify-content-between align-items-center">
        <strong style={{ padding: "1px 0" }}>Tied game</strong>
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: "RESET", data: null })}
        >
          New Game
        </button>
      </div>
    );
  }

  if (winner) {
    return (
      <div className="alert alert-success">
        <strong>Winner</strong> {winner}
      </div>
    );
  }

  return null;
}

export function Board() {
  const {
    state: {
      data: { board, winner },
    },
  } = useContext(GameContext);

  const rows: ReactElement[] = [];

  for (let i = 0; i < board.length; i++) {
    rows.push(<Row key={i} row={board[i]} rowCount={i} />);
  }

  // this could be computed in the reducer but using some different react knowledge
  const isTie = useMemo(() => {
    return board.every((row) => row.every((cell) => cell !== Cell.empty));
  }, [board]);

  return (
    <>
      <Alert winner={winner} isTie={isTie} />

      <div className="game-board container text-center">
        {rows.map((r) => r)}
      </div>
    </>
  );
}
