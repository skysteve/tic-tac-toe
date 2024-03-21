import { Cell, IBoard } from "./IBoard";
import { IMove } from "./IMove";
import { Difficulty } from "./difficulty";

export interface IState {
  data: {
    gameType: "PVP" | "PVC";
    difficulty: Difficulty;
    lastMove: IMove;
    canPlayerMove: boolean;
    boardSize: number;
    board: IBoard;
    player: Cell;
    winner: Cell;
    winningCells: {
      [key: number]: number[];
    }; // looks like { rowID: [matchingColumn, matchingColumn]} e.g. { 1: [0, 1, 2]} or {0: [1], 1: [1], 2: [1]} or {0: [0], 1: [1], 2: [2]}
  };
}
