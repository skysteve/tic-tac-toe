export function checkWinner(board, lastX, lastY) {
  const lastPlayer = board[lastX][lastY];

  // checkRow
  const rowMatch = board[lastX].every((c) => c === lastPlayer);

  if (rowMatch) {
    return lastPlayer;
  }

  // checkCol

  let colMatch = true;
  for (let i = 0; i < board[0].length; i++) {
    if (board[i][lastY] !== lastPlayer) {
      colMatch = false;
      break;
    }
  }

  if (colMatch) {
    return lastPlayer;
  }

  // check diagonals

  // if X, Y isn't one of the corners, no point continuing
  if (
    (lastX !== 0 && lastX !== board.length - 1) ||
    (lastY !== 0 && lastY !== board.length - 1)
  ) {
    console.log("not here", lastX, lastY);
    return;
  }

  // work through diagonals
  for (let i = 0, j = 0; i < board.length; i++, j++) {
    if (board[i][j] !== lastPlayer) {
      return;
    }
  }

  return lastPlayer;
}
