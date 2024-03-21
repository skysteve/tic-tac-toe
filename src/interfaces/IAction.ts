import { IMove } from "./IMove";

export type Action =
  | { type: "SET_BOARD_SIZE"; data: number } // data = boardSize
  | { type: "RESET"; data: null }
  | {
      type: "CELL_CLICK";
      data: IMove;
    }
  | { type: "SET_GAME_TYPE"; data: "PVP" | "PVC" }
  | { type: "COMPUTER_PLAY"; data: null }
  | { type: "SET_DIFFICULTY"; data: "easy" | "hard" };
