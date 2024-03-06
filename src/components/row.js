import { Square } from "./square";

export function Row({ row, rowCount }) {
  const cells = [];

  for (let i = 0; i < row.length; i++) {
    cells.push(
      <Square key={i} value={row[i]} rowCount={rowCount} cellCount={i} />
    );
  }

  return <div className="row">{cells.map((c) => c)}</div>;
}
