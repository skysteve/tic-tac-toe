import { useCallback, useState } from "react";
import { Row } from "./row";
import { GameContext } from "../contexts/game";
import { checkWinner, initializeBoard } from "../utils/game";

export function Board({}) {
  const [board, setBoard] = useState(initializeBoard());
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const onCellClick = useCallback(
    ({ x, y }) => {
      // check for existing item
      if (board[x][y] || winner) {
        return;
      }

      setBoard((prev) => {
        const clone = JSON.parse(JSON.stringify(prev));
        clone[x][y] = player;

        setWinner(checkWinner(clone, x, y));
        return clone;
      });
      setPlayer((prev) => (prev === "X" ? "O" : "X"));
    },
    [board, player, winner]
  );

  const resetGame = useCallback(() => {
    // TODO confirmation
    setBoard(initializeBoard());
    setWinner("");
  }, []);

  const context = { onCellClick, winner };

  const rows = [];

  for (let i = 0; i < board.length; i++) {
    rows.push(<Row key={i} row={board[i]} rowCount={i} />);
  }

  return (
    <GameContext.Provider value={context}>
      <div className="alert alert-info">
        <strong>Player</strong> {player}
      </div>

      {winner && (
        <div class="alert alert-success">
          <strong>Winner</strong> {winner}
        </div>
      )}

      <div className="game-board container text-center">
        {rows.map((r) => r)}
      </div>

      <div class="alert alert-light" role="alert">
        <button type="button" className="btn btn-default" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </GameContext.Provider>
  );
}
