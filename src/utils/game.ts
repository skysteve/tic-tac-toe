import { Cell, IBoard } from "../interfaces/IBoard";

export function initializeBoard(boardSize: number) {
  const result: IBoard = [];

  for (let i = 0; i < boardSize; i++) {
    result[i] = [];
    for (let j = 0; j < boardSize; j++) {
      result[i][j] = Cell.empty;
    }
  }

  return result;
}

export function checkWinner(board: IBoard, lastX: number, lastY: number) {
  const lastPlayer = board[lastX][lastY];
  let winningCells: { [key: number]: number[] } = {};

  // checkRow
  const rowMatch = board[lastX].every((c) => c === lastPlayer);

  if (rowMatch) {
    winningCells[lastX] = [];
    for (let i = 0; i < board[lastX].length; i++) {
      winningCells[lastX].push(i);
    }
    return { winner: lastPlayer, winningCells };
  }

  // checkCol

  let colMatch = true;
  for (let i = 0; i < board[0].length; i++) {
    if (board[i][lastY] !== lastPlayer) {
      colMatch = false;
      break;
    }
  }

  if (colMatch) {
    for (let i = 0; i < board[lastX].length; i++) {
      winningCells[i] = [lastY];
    }
    return { winner: lastPlayer, winningCells };
  }

  // check diagonals

  // if X, Y isn't one of the corners, no point continuing
  if (
    (lastX !== 0 && lastX !== board.length - 1) ||
    (lastY !== 0 && lastY !== board.length - 1)
  ) {
    return {};
  }

  // work through diagonals
  for (let i = 0, j = 0; i < board.length; i++, j++) {
    if (board[i][j] !== lastPlayer) {
      return {};
    }
    winningCells[i] = [j];
  }

  return { winner: lastPlayer, winningCells };
}
