import { Action } from "../interfaces/IAction";
import { Cell } from "../interfaces/IBoard";
import { IState } from "../interfaces/IState";
import { Difficulty } from "../interfaces/difficulty";
import {
  checkWinner,
  cloneBoard,
  computerPlaceMoveMinMax,
  computerPlacePieceRandom,
  getNextPlayer,
  getStartingPlayer,
  initializeBoard,
} from "../utils/game";

const DEFAULT_BOARD_SIZE = 3;

export const INITIAL_STATE: IState = {
  data: {
    canPlayerMove: true,
    lastMove: {
      x: -1,
      y: -1,
    },
    gameType: "PVC",
    difficulty: Difficulty.medium,
    boardSize: DEFAULT_BOARD_SIZE,
    board: initializeBoard(DEFAULT_BOARD_SIZE),
    player: Cell.x,
    winner: Cell.empty,
    startingPlayer: "human",
    winningCells: {}, // looks like { rowID: [matchingColumn, matchingColumn]} e.g. { 1: [0, 1, 2]} or {0: [1], 1: [1], 2: [1]} or {0: [0], 1: [1], 2: [2]}
  },
};

/*
 next:
  * add multi-game scoreboard, e.g. player 1 won 4, player 2 won 5
 */

export function gameReducer(currentState: IState, action: Action): IState {
  const { type, data } = action;
  console.log("action", type, data);
  switch (type) {
    case "SET_BOARD_SIZE": {
      return gameReducer(
        {
          ...currentState,
          data: {
            ...currentState.data,
            boardSize: data,
          },
        },
        { type: "RESET", data: null }
      );
    }
    case "RESET": {
      const tmp = {
        ...INITIAL_STATE,
        data: {
          ...INITIAL_STATE.data,
          boardSize: currentState.data.boardSize,
          board: initializeBoard(currentState.data.boardSize),
          player: currentState.data.player,
          gameType: currentState.data.gameType,
          difficulty: currentState.data.difficulty,
          startingPlayer: getStartingPlayer(
            currentState.data.startingPlayer,
            currentState.data.gameType
          ),
        },
      };

      if (
        tmp.data.gameType === "PVC" &&
        tmp.data.startingPlayer === "computer"
      ) {
        return gameReducer(tmp, { type: "COMPUTER_PLAY", data: null });
      }

      return tmp;
    }
    case "CELL_CLICK": {
      const board = cloneBoard(currentState.data.board);
      const { x, y } = data;
      const { player: currentPlayer, winner } = currentState.data;

      // if there's already a winner or player in that slot, bail out
      if (board[x][y] !== Cell.empty || winner) {
        return currentState;
      }

      board[x][y] = currentPlayer;
      return {
        ...currentState,
        data: {
          ...currentState.data,
          board,
          player: getNextPlayer(currentPlayer),
          ...checkWinner(board, x, y),
          canPlayerMove: currentState.data.gameType === "PVP",
          lastMove: {
            x,
            y,
          },
        },
      };
    }
    case "COMPUTER_PLAY": {
      if (currentState.data.gameType === "PVP") {
        return currentState;
      }

      if (currentState.data.winner) {
        return currentState;
      }

      const board = cloneBoard(currentState.data.board);

      let computerMove;
      switch (currentState.data.difficulty) {
        case Difficulty.easy: {
          computerMove = computerPlacePieceRandom(
            board,
            currentState.data.player
          );
          break;
        }
        case Difficulty.medium:
        case Difficulty.hard: {
          computerMove = computerPlaceMoveMinMax(
            board,
            currentState.data.player,
            currentState.data.lastMove,
            currentState.data.difficulty
          );
        }
      }

      return {
        ...currentState,
        data: {
          ...currentState.data,
          board: computerMove.board,
          player: getNextPlayer(currentState.data.player),
          ...checkWinner(computerMove.board, computerMove.x, computerMove.y),
          canPlayerMove: true,
          lastMove: {
            x: computerMove.x,
            y: computerMove.y,
          },
        },
      };
    }
    case "SET_GAME_TYPE": {
      return gameReducer(
        {
          ...currentState,
          data: {
            ...currentState.data,
            gameType: data,
          },
        },
        { type: "RESET", data: null }
      );
    }
    case "SET_DIFFICULTY": {
      return gameReducer(
        {
          ...currentState,
          data: {
            ...currentState.data,
            difficulty: data,
          },
        },
        { type: "RESET", data: null }
      );
    }
    default: {
      throw new Error(`Unknown action ${type}`);
    }
  }
}
