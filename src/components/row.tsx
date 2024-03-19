import React, { ReactElement } from "react";
import { Square } from "./square";
import { Cell } from "../interfaces/IBoard";

interface RowProps {
  row: Cell[];
  rowCount: number;
}

export function Row({ row, rowCount }: RowProps) {
  const cells: ReactElement[] = [];

  for (let i = 0; i < row.length; i++) {
    cells.push(
      <Square key={i} value={row[i]} rowCount={rowCount} cellCount={i} />
    );
  }

  return <div className="row">{cells.map((c) => c)}</div>;
}
