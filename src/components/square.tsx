import { useContext, useMemo, useState } from "react";
import { GameContext } from "../contexts/game";
import React from "react";
import { Cell } from "../interfaces/IBoard";

interface SquareProps {
  value: Cell;
  rowCount: number;
  cellCount: number;
}

export function Square({
  value = Cell.empty,
  rowCount,
  cellCount,
}: SquareProps) {
  const {
    dispatch,
    state: {
      data: { winner, winningCells, gameType, canPlayerMove },
    },
  } = useContext(GameContext);
  const canSelect = canPlayerMove && !winner && !value;

  const backgroundColor = useMemo(() => {
    if (!value) {
      return "lightgray";
    }

    if (winningCells[rowCount]) {
      if (winningCells[rowCount].includes(cellCount)) {
        return "lightgreen";
      }
    }

    return value === "X" ? "lightblue" : "lightcoral";
  }, [value, winningCells, rowCount, cellCount]);

  return (
    <div
      className="col square"
      onClick={() => {
        if (!canSelect) {
          return;
        }

        dispatch({ type: "CELL_CLICK", data: { x: rowCount, y: cellCount } });

        if (gameType === "PVC") {
          // timeout here so it's not too aggressive to the user
          setTimeout(() => {
            dispatch({ type: "COMPUTER_PLAY", data: null });
          }, 500);
        }
      }}
      style={{
        cursor: canSelect ? "pointer" : "not-allowed",
        backgroundColor,
      }}
    >
      {value}
    </div>
  );
}
