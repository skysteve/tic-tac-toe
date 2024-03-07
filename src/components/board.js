import { useContext } from "react";
import { Row } from "./row";
import { GameContext } from "../contexts/game";

export function Board({}) {
  const {
    state: {
      data: { board, player, winner },
    },
  } = useContext(GameContext);

  const rows = [];

  for (let i = 0; i < board.length; i++) {
    rows.push(<Row key={i} row={board[i]} rowCount={i} />);
  }

  return (
    <>
      <div className="alert alert-info">
        <strong>Player</strong> {player}
      </div>

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
