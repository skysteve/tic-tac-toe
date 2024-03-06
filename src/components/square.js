import { useContext, useMemo } from "react";
import { GameContext } from "../contexts/game";

export function Square({ value = "", rowCount, cellCount }) {
  const { onCellClick, winner } = useContext(GameContext);

  const canSelect = !winner && !value;

  const backgroundColor = useMemo(() => {
    if (!value) {
      return "lightgray";
    }

    if (winner === value) {
      return "lightgreen";
    }

    return value === "X" ? "lightblue" : "lightcoral";
  }, [winner, value]);

  return (
    <div
      className="col square"
      onClick={() => onCellClick({ x: rowCount, y: cellCount })}
      style={{
        cursor: canSelect ? "pointer" : "not-allowed",
        backgroundColor,
      }}
    >
      {value}
    </div>
  );
}
