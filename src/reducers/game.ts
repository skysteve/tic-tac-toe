import { Action } from "../interfaces/IAction";
import { Cell } from "../interfaces/IBoard";
import { IState } from "../interfaces/IState";
import { checkWinner, initializeBoard } from "../utils/game";

const DEFAULT_BOARD_SIZE = 3;

export const INITIAL_STATE: IState = {
  data: {
    boardSize: DEFAULT_BOARD_SIZE,
    board: initializeBoard(DEFAULT_BOARD_SIZE),
    player: Cell.x,
    winner: Cell.empty,
    winningCells: {}, // looks like { rowID: [matchingColumn, matchingColumn]} e.g. { 1: [0, 1, 2]} or {0: [1], 1: [1], 2: [1]} or {0: [0], 1: [1], 2: [2]}
  },
};

/*
 next:
  * add multi-game scoreboard, e.g. player 1 won 4, player 2 won 5
  * no more moves - tied game
 */

export function gameReducer(currentState: IState, action: Action): IState {
  const { type, data } = action;
  console.log("action", type, data);
  switch (type) {
    case "SET_BOARD_SIZE": {
      return {
        ...currentState,
        data: {
          ...INITIAL_STATE.data,
          boardSize: data,
          board: initializeBoard(data),
          player: currentState.data.player,
        },
      };
    }
    case "RESET": {
      return {
        ...INITIAL_STATE,
        data: {
          ...INITIAL_STATE.data,
          boardSize: currentState.data.boardSize,
          board: initializeBoard(currentState.data.boardSize),
          player: currentState.data.player,
        },
      };
    }
    case "CELL_CLICK": {
      const board = JSON.parse(JSON.stringify(currentState.data.board));
      const { x, y } = data;
      const { player: currentPlayer, winner } = currentState.data;

      // if there's already a winner or player in that slot, bail out
      if (board[x][y] || winner) {
        return currentState;
      }

      board[x][y] = currentPlayer;
      return {
        ...currentState,
        data: {
          ...currentState.data,
          board,
          player: currentPlayer === Cell.x ? Cell.o : Cell.x,
          ...checkWinner(board, x, y),
        },
      };
    }
    default: {
      throw new Error(`Unknown action ${type}`);
    }
  }
}
