import { Cell, IBoard } from "../interfaces/IBoard";
import { IMove } from "../interfaces/IMove";
import { checkWinner, cloneBoard, getNextPlayer } from "./game";

export function scoreBoard(board: IBoard, player: Cell, lastMove: IMove) {
  const winner = checkWinner(board, lastMove.x, lastMove.y, false)?.winner;
  // if computer wins return 10
  if (winner === player) {
    return 10;
  } else if (winner) {
    // otherwise the opponent won -10
    return -10;
  }

  return 0;
}

export function getAvailableMoves(board: IBoard) {
  let results = [];

  for (let x = 0; x < board.length; x++) {
    let row = board[x];
    for (let y = 0; y < row.length; y++) {
      if (row[y] === Cell.empty) {
        results.push({ x, y });
      }
    }
  }

  return results;
}

export function getBestMove(
  scores: { score: number; move: IMove }[],
  getHighest: boolean
) {
  let bestMove = {
    score: getHighest ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER,
    move: { x: -1, y: -1 },
  };

  if (getHighest) {
    for (let i = 0; i < scores.length; i++) {
      let tmp = scores[i];
      if (tmp.score > bestMove.score) {
        bestMove = tmp;
      }
    }
  } else {
    for (let i = 0; i < scores.length; i++) {
      let tmp = scores[i];
      if (tmp.score < bestMove.score) {
        bestMove = tmp;
      }
    }
  }

  return bestMove;
}

export function miniMax(
  board: IBoard,
  player: Cell,
  lastMove: IMove,
  computerPlayer: Cell,
  maxDepth = -1,
  depth = 0
): { score: number; move?: IMove } {
  let score = scoreBoard(board, computerPlayer, lastMove);

  if (score !== 0) {
    return { score };
  }

  const availableMoves = getAvailableMoves(board);

  if (availableMoves.length < 1) {
    return { score: 0 };
  }

  if (maxDepth < 0) {
    maxDepth = Number.MAX_SAFE_INTEGER;
  }

  const scores = availableMoves.map((move) => {
    const newBoard = cloneBoard(board);
    newBoard[move.x][move.y] = player;
    const nextPlayer = getNextPlayer(player);

    if (depth > maxDepth) {
      return { score, move };
    }

    const res = miniMax(
      newBoard,
      nextPlayer,
      move,
      computerPlayer,
      maxDepth,
      depth + 1
    );

    return { score: res.score, move };
  });

  return getBestMove(scores, player === computerPlayer);
}
