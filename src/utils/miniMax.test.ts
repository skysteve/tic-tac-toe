import { Cell, IBoard } from "../interfaces/IBoard";
import { initializeBoard } from "./game";
import { getAvailableMoves, getBestMove, miniMax, scoreBoard } from "./miniMax";

describe("miniMax", () => {
  describe("getBestMove", () => {
    it("should return highest move", () => {
      const scores = [
        { score: 0, move: { x: 0, y: 0 } },
        { score: 10, move: { x: 1, y: 0 } },
        { score: 10, move: { x: 2, y: 0 } },
        { score: -10, move: { x: 0, y: 1 } },
        { score: 0, move: { x: 0, y: 2 } },
        { score: -10, move: { x: 1, y: 1 } },
      ];

      expect(getBestMove(scores, true)).toEqual({
        score: 10,
        move: { x: 1, y: 0 },
      });
    });

    it("should return lowest move", () => {
      const scores = [
        { score: 0, move: { x: 0, y: 0 } },
        { score: 10, move: { x: 1, y: 0 } },
        { score: 10, move: { x: 2, y: 0 } },
        { score: -10, move: { x: 0, y: 1 } },
        { score: 0, move: { x: 0, y: 2 } },
        { score: -10, move: { x: 1, y: 1 } },
      ];

      expect(getBestMove(scores, false)).toEqual({
        score: -10,
        move: { x: 0, y: 1 },
      });
    });
  });

  describe("getAvailableMoves", () => {
    it("should return empty array if no available moves", () => {
      const board = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ] as IBoard;

      expect(getAvailableMoves(board)).toEqual([]);
    });

    it("should return 8 moves if only 1 square filled", () => {
      const board = [
        ["X", "", ""],
        ["", "", ""],
        ["", "", ""],
      ] as IBoard;

      expect(getAvailableMoves(board)).toEqual([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ]);
    });

    it("should return moves on a 5x5 grid", () => {
      const board = [
        ["X", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", "O"],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ] as IBoard;

      expect(getAvailableMoves(board)).toEqual([
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 0 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 0 },
        { x: 4, y: 1 },
        { x: 4, y: 2 },
        { x: 4, y: 3 },
        { x: 4, y: 4 },
      ]);
    });
  });

  describe("scoreBoard", () => {
    it("should return 10 for computer win", () => {
      const board = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ] as IBoard;

      expect(scoreBoard(board, Cell.x, { x: 1, y: 1 })).toEqual(10);
    });

    it("should return -10 for human win", () => {
      const board = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ] as IBoard;

      expect(scoreBoard(board, Cell.o, { x: 1, y: 1 })).toEqual(-10);
    });

    it("should return 0 for tie", () => {
      const board = [
        ["X", "O", "X"],
        ["X", "O", "O"],
        ["O", "X", "X"],
      ] as IBoard;

      expect(scoreBoard(board, Cell.o, { x: 1, y: 1 })).toEqual(0);
    });

    it("should return 0 for no winner", () => {
      const board = [
        ["X", "", ""],
        ["", "", ""],
        ["", "", ""],
      ] as IBoard;

      expect(scoreBoard(board, Cell.o, { x: 0, y: 0 })).toEqual(0);
    });
  });

  describe("miniMax", () => {
    it("should return the score if the game is already won", () => {
      const board = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ] as IBoard;

      const result = miniMax(
        board,
        Cell.x,
        { x: 0, y: 0 },
        Cell.x,
        Number.MAX_SAFE_INTEGER
      );

      expect(result).toEqual({ score: 10 });
    });

    it("should return the score if the game is already lost", () => {
      const board = [
        ["X", "O", "X"],
        ["O", "X", "O"],
        ["X", "O", "X"],
      ] as IBoard;

      const result = miniMax(
        board,
        Cell.o,
        { x: 0, y: 0 },
        Cell.o,
        Number.MAX_SAFE_INTEGER
      );

      expect(result).toEqual({ score: -10 });
    });

    it("should return 0 if there are no available moves", () => {
      const board = [
        ["X", "O", "X"],
        ["X", "O", "O"],
        ["O", "X", "X"],
      ] as IBoard;

      const result = miniMax(
        board,
        Cell.o,
        { x: 0, y: 0 },
        Cell.o,
        Number.MAX_SAFE_INTEGER
      );

      expect(result).toEqual({ score: 0 });
    });

    it("should return the logical best move", () => {
      const board = [
        ["X", "", ""],
        ["", "", ""],
        ["", "", ""],
      ] as IBoard;

      const result = miniMax(
        board,
        Cell.o,
        { x: 0, y: 0 },
        Cell.o,
        Number.MAX_SAFE_INTEGER
      );

      expect(result).toEqual({ score: 0, move: { x: 1, y: 1 } });
    });

    // TODO max depth checks
  });
});
