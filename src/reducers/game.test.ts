import { Action } from "../interfaces/IAction";
import { Cell, IBoard } from "../interfaces/IBoard";
import { IState } from "../interfaces/IState";
import { Difficulty } from "../interfaces/difficulty";
import {
  computerPlacePieceRandom,
  computerPlaceMoveMinMax,
} from "../utils/game";
import { INITIAL_STATE, gameReducer } from "./game";

// jest.mock("../utils/game", () => {
//   const originalModule = jest.requireActual("../utils/game");

//   return {
//     __esModule: true,
//     ...originalModule,
//     computerPlacePieceRandom: jest.fn().mockImplementation(() => ({
//       board: [
//         ["O", "", ""],
//         ["", "", ""],
//         ["", "", "X"],
//       ],
//       x: 2,
//       y: 2,
//     })),
//     computerPlaceMoveMinMax: jest.fn(() => ({
//       board: [
//         ["O", "", ""],
//         ["", "", ""],
//         ["", "", "X"],
//       ],
//       x: 2,
//       y: 2,
//     })),
//   };
// });

describe("Game Reducer", () => {
  it("should throw error for unknown action", () => {
    const state = JSON.parse(JSON.stringify(INITIAL_STATE));
    const action = { type: "TESTING_ACTION", data: null } as any;
    expect(() => gameReducer(state, action)).toThrow(
      "Unknown action TESTING_ACTION"
    );
  });

  it("should set board size and reset game", () => {
    const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
    const action: Action = { type: "SET_BOARD_SIZE", data: 5 };

    state.data.gameType = "PVP";

    expect(state.data.boardSize).toEqual(3);
    state.data.board[0][1] = Cell.x;
    state.data.winningCells = { 1: [] };

    const result = gameReducer(state, action);

    expect(result).toEqual({
      data: {
        canPlayerMove: true,
        lastMove: { x: -1, y: -1 },
        gameType: "PVP",
        difficulty: "medium",
        boardSize: 5,
        board: [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ],
        player: "X",
        winner: "",
        winningCells: {},
        startingPlayer: "human",
      },
    });
  });

  it("should reset the board", () => {
    const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
    const action: Action = { type: "RESET", data: null };

    state.data.board[0][1] = Cell.x;
    state.data.winningCells = { 1: [] };
    state.data.player = Cell.o;
    state.data.lastMove = { x: 1, y: 2 };
    state.data.winner = Cell.x;
    state.data.difficulty = Difficulty.easy;
    state.data.gameType = "PVP";

    const result = gameReducer(state, action);

    expect(result).toEqual({
      data: {
        canPlayerMove: true,
        lastMove: { x: -1, y: -1 },
        gameType: "PVP",
        difficulty: "easy",
        boardSize: 3,
        board: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        player: "O",
        winner: "",
        winningCells: {},
        startingPlayer: "human",
      },
    });
  });

  it("should set game type", () => {
    const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
    const action: Action = { type: "SET_GAME_TYPE", data: "PVP" };

    expect(state.data.gameType).toEqual("PVC");

    const result = gameReducer(state, action);
    expect(result).toEqual({
      data: {
        canPlayerMove: true,
        lastMove: { x: -1, y: -1 },
        gameType: "PVP",
        difficulty: "medium",
        boardSize: 3,
        board: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        player: "X",
        winner: "",
        winningCells: {},
        startingPlayer: "human",
      },
    });
  });

  describe("CELL_CLICK", () => {
    it("should return current state if game is already won", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "CELL_CLICK", data: { x: 1, y: 1 } };

      state.data.winner = Cell.x;

      const result = gameReducer(state, action);
      expect(result).toBe(state);
    });

    it("should return current state if cell is already full", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "CELL_CLICK", data: { x: 1, y: 1 } };

      state.data.board[1][1] = Cell.o;

      const result = gameReducer(state, action);
      expect(result).toBe(state);
    });

    it("should place the piece on the board PVC - no winner", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "CELL_CLICK", data: { x: 1, y: 1 } };

      const result = gameReducer(state, action);
      expect(result).toEqual({
        data: {
          canPlayerMove: false,
          lastMove: { x: 1, y: 1 },
          gameType: "PVC",
          difficulty: "medium",
          boardSize: 3,
          board: [
            ["", "", ""],
            ["", "X", ""],
            ["", "", ""],
          ],
          player: "O",
          winner: "",
          winningCells: {},
          startingPlayer: "human",
        },
      });
    });

    it("should place the piece on the board PVP - no winner", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "CELL_CLICK", data: { x: 1, y: 1 } };

      state.data.gameType = "PVP";

      const result = gameReducer(state, action);
      expect(result).toEqual({
        data: {
          canPlayerMove: true,
          lastMove: { x: 1, y: 1 },
          gameType: "PVP",
          difficulty: "medium",
          boardSize: 3,
          board: [
            ["", "", ""],
            ["", "X", ""],
            ["", "", ""],
          ],
          player: "O",
          winner: "",
          winningCells: {},
          startingPlayer: "human",
        },
      });
    });

    it("should place the piece on the board and set winner", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "CELL_CLICK", data: { x: 2, y: 0 } };

      state.data.gameType = "PVP";
      state.data.board = [
        ["X", "O", ""],
        ["X", "O", ""],
        ["", "", ""],
      ] as IBoard;

      const result = gameReducer(state, action);
      expect(result).toEqual({
        data: {
          canPlayerMove: true,
          lastMove: { x: 2, y: 0 },
          gameType: "PVP",
          difficulty: "medium",
          boardSize: 3,
          board: [
            ["X", "O", ""],
            ["X", "O", ""],
            ["X", "", ""],
          ],
          player: "O",
          winner: "X",
          winningCells: {
            0: [0],
            1: [0],
            2: [0],
          },
          startingPlayer: "human",
        },
      });
    });
  });

  describe("COMPUTER_PLAY", () => {
    it("should return current state if game is already won", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "COMPUTER_PLAY", data: null };

      state.data.winner = Cell.x;

      const result = gameReducer(state, action);
      expect(result).toBe(state);
    });

    it("should return current state if game type is PVP", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "COMPUTER_PLAY", data: null };

      state.data.gameType = "PVP";

      const result = gameReducer(state, action);
      expect(result).toBe(state);
    });

    // TODO
    xit("should call easy random", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "COMPUTER_PLAY", data: null };

      state.data.difficulty = Difficulty.easy;

      const result = gameReducer(state, action);
      expect(result).toBe(state);

      expect(computerPlacePieceRandom).toHaveBeenCalled();
      expect(computerPlaceMoveMinMax).not.toHaveBeenCalled();
    });

    xit("should call medium minMax", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "COMPUTER_PLAY", data: null };

      state.data.difficulty = Difficulty.medium;

      const result = gameReducer(state, action);
      expect(result).toBe(state);

      expect(computerPlacePieceRandom).not.toHaveBeenCalled();
      expect(computerPlaceMoveMinMax).toHaveBeenCalled();
    });

    xit("should call hard minMax", () => {
      const state: IState = JSON.parse(JSON.stringify(INITIAL_STATE));
      const action: Action = { type: "COMPUTER_PLAY", data: null };

      state.data.difficulty = Difficulty.hard;

      const result = gameReducer(state, action);
      expect(result).toBe(state);

      expect(computerPlacePieceRandom).not.toHaveBeenCalled();
      expect(computerPlaceMoveMinMax).toHaveBeenCalled();
    });
  });
});
