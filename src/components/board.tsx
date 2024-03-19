import { ReactElement, useContext } from "react";
import { Row } from "./row";
import { GameContext } from "../contexts/game";
import React from "react";

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

  return (
    <>
      {winner && (
        <div className="alert alert-success">
          <strong>Winner</strong> {winner}
        </div>
      )}

      <div className="game-board container text-center">
        {rows.map((r) => r)}
      </div>
    </>
  );
}
