import { Cell, IBoard } from "../interfaces/IBoard";
import { IMove } from "../interfaces/IMove";
import { Difficulty } from "../interfaces/difficulty";
import { miniMax } from "./miniMax";

export function cloneBoard(board: IBoard): IBoard {
  return JSON.parse(JSON.stringify(board));
}

export function getNextPlayer(currentPlayer: Cell): Cell {
  if (currentPlayer === Cell.x) {
    return Cell.o;
  }

  return Cell.x;
}

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

export function checkWinner(
  board: IBoard,
  lastX: number,
  lastY: number,
  includeWinningCells: boolean = true
) {
  // guard for tied game
  if (lastX < 0 && lastY < 0) {
    return {};
  }

  const lastPlayer = board[lastX][lastY];
  const maxCell = board.length - 1;
  let winningCells: { [key: number]: number[] } = {};

  // checkRow
  const rowMatch = board[lastX].every((c) => c === lastPlayer);

  if (rowMatch) {
    if (!includeWinningCells) {
      return { winner: lastPlayer, winningCells };
    }

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
    if (!includeWinningCells) {
      return { winner: lastPlayer, winningCells };
    }
    for (let i = 0; i < board[lastX].length; i++) {
      winningCells[i] = [lastY];
    }
    return { winner: lastPlayer, winningCells };
  }

  let foundWinner = true;

  // work through diagonals
  for (let i = 0, j = 0; i < board.length; i++, j++) {
    if (board[i][j] !== lastPlayer) {
      foundWinner = false;
      break;
    }
    winningCells[i] = [j];
  }

  if (foundWinner) {
    return { winner: lastPlayer, winningCells };
  }

  winningCells = {};

  for (let i = maxCell, j = 0; i >= 0; i--, j++) {
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

  const maxCell = board.length - 1;

  while (!placed) {
    placedX = randomIntBetween(0, maxCell);
    placedY = randomIntBetween(0, maxCell);

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

export function computerPlaceMoveMinMax(
  board: IBoard,
  player: Cell,
  lastMove: IMove,
  difficulty: Difficulty
) {
  let maxDepth =
    difficulty === "hard"
      ? Number.MAX_SAFE_INTEGER
      : (board.length * board.length) / 3;

  const result = miniMax(board, player, lastMove, player, maxDepth);

  const move = result?.move;

  if (move && board[move.x][move.y] === Cell.empty) {
    board[move.x][move.y] = player;
  }

  return {
    board,
    x: move?.x ?? -1,
    y: move?.y ?? -1,
  };
}
