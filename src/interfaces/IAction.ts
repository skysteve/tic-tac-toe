export type Action =
  | { type: "SET_BOARD_SIZE"; data: number } // data = boardSize
  | { type: "RESET"; data: null }
  | {
      type: "CELL_CLICK";
      data: {
        x: number;
        y: number;
      };
    };
