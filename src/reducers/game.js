import { checkWinner, initializeBoard } from "../utils/game";

const DEFAULT_BOARD_SIZE = 3;

export const INITIAL_STATE = {
  data: {
    boardSize: DEFAULT_BOARD_SIZE,
    board: initializeBoard(DEFAULT_BOARD_SIZE),
    player: "X",
    winner: "",
  },
};

export function gameReducer(currentState, { type, data }) {
  console.log("action", type, data);
  switch (type) {
    case "SET_BOARD_SIZE": {
      return {
        ...currentState,
        data: {
          ...currentState.data,
          boardSize: data,
          board: initializeBoard(data),
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
          player: currentPlayer === "X" ? "O" : "X",
          winner: checkWinner(board, x, y),
        },
      };
    }
    default: {
      throw new Error(`Unknown action ${type}`);
    }
  }
}
