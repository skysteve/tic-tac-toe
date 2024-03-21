import exp from "constants";
import { Cell, IBoard } from "../interfaces/IBoard";
import { INITIAL_STATE } from "../reducers/game";
import {
  checkWinner,
  cloneBoard,
  getNextPlayer,
  initializeBoard,
} from "./game";

describe("game utils", () => {
  describe("cloneBoard", () => {
    it("should clone the board", () => {
      const initialBoard = INITIAL_STATE.data.board;

      initialBoard[0][1] = Cell.x;
      initialBoard[0][2] = Cell.o;

      const clone = cloneBoard(initialBoard);

      expect(clone).not.toBe(initialBoard);
      expect(clone).toEqual(initialBoard);
    });
  });

  describe("initializeBoard", () => {
    it("should build a 3x3 board", () => {
      const result = initializeBoard(3);

      expect(result).toEqual([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);
    });

    it("should build a 5x5 board", () => {
      const result = initializeBoard(5);

      expect(result).toEqual([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ]);
    });

    it("should build a 9x9 board", () => {
      const result = initializeBoard(9);

      expect(result).toEqual([
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
      ]);
    });
  });

  describe("getNextPlayer", () => {
    it("should return X if current it O", () => {
      expect(getNextPlayer(Cell.o)).toEqual(Cell.x);
    });

    it("should return O if current it X", () => {
      expect(getNextPlayer(Cell.x)).toEqual(Cell.o);
    });
  });

  describe("checkWinner", () => {
    it("should return empty if no winner", () => {
      const board: IBoard = [
        ["X", "0", ""],
        ["X", "0", ""],
        ["", "", ""],
      ] as IBoard;

      const result = checkWinner(board, 1, 1);
      expect(result).toEqual({});
    });
  });

  it("should return winner vertical", () => {
    const board: IBoard = [
      ["X", "0", ""],
      ["X", "0", ""],
      ["X", "", ""],
    ] as IBoard;

    const result = checkWinner(board, 2, 0);
    expect(result).toEqual({
      winner: Cell.x,
      winningCells: { 0: [0], 1: [0], 2: [0] },
    });
  });

  it("should return winner vertical without winning cells", () => {
    const board: IBoard = [
      ["X", "0", ""],
      ["X", "0", ""],
      ["X", "", ""],
    ] as IBoard;

    const result = checkWinner(board, 2, 0, false);
    expect(result).toEqual({
      winner: Cell.x,
      winningCells: {},
    });
  });

  it("should return winner horizontal", () => {
    const board: IBoard = [
      ["X", "X", "X"],
      ["X", "0", ""],
      ["", "", "O"],
    ] as IBoard;

    const result = checkWinner(board, 0, 2);
    expect(result).toEqual({
      winner: Cell.x,
      winningCells: { 0: [0, 1, 2] },
    });
  });

  it("should return winner horizontal without winning cells", () => {
    const board: IBoard = [
      ["X", "X", "X"],
      ["X", "0", ""],
      ["", "", "O"],
    ] as IBoard;

    const result = checkWinner(board, 0, 2, false);
    expect(result).toEqual({
      winner: Cell.x,
      winningCells: {},
    });
  });

  it("should return winner left to right diagonal", () => {
    const board: IBoard = [
      ["X", "0", ""],
      ["X", "X", ""],
      ["O", "", "X"],
    ] as IBoard;

    const result = checkWinner(board, 0, 0);
    expect(result).toEqual({
      winner: Cell.x,
      winningCells: { 0: [0], 1: [1], 2: [2] },
    });
  });

  it("should return winner left to right diagonal last move middle", () => {
    const board: IBoard = [
      ["X", "0", ""],
      ["X", "X", ""],
      ["O", "", "X"],
    ] as IBoard;

    const result = checkWinner(board, 1, 1);
    expect(result).toEqual({
      winner: Cell.x,
      winningCells: { 0: [0], 1: [1], 2: [2] },
    });
  });

  it("should return winner right to left diagonal", () => {
    const board: IBoard = [
      ["X", "0", "O"],
      ["X", "O", "X"],
      ["O", "", "X"],
    ] as IBoard;

    const result = checkWinner(board, 0, 2);
    expect(result).toEqual({
      winner: Cell.o,
      winningCells: { 0: [2], 1: [1], 2: [0] },
    });
  });

  // TODO 5x5 and 7x7
});
