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
  // guard for tied game
  if (lastX < 0 && lastY < 0) {
    return {};
  }

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

function randomIntBetween(min: number = 0, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Simple algorithm to place a piece randomly on the board
 * @param board
 * @param player
 * @returns
 */
export function computerPlacePieceRandom(board: IBoard, player: Cell) {
  let placed = false;
  let placedX = 0;
  let placedY = 0;

  // guard for tied game
  if (board.every((row) => row.every((cell) => cell !== Cell.empty))) {
    return { board, x: -1, y: -1 };
  }

  while (!placed) {
    placedX = randomIntBetween(0, board.length - 1);
    placedY = randomIntBetween(0, board.length - 1);

    if (board[placedX][placedY] === Cell.empty) {
      board[placedX][placedY] = player;
      placed = true;
    }
  }

  return {
    board,
    x: placedX,
    y: placedY,
  };
}
