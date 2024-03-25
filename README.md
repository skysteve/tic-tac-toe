# About

This project started as interview practice for building a simple tic-tac-toe algorithm for testing a winner on a 3x3 grid. It then evolved
into a learning/development project by adding different board sizes, making the win state algorithm more complicated and adding a player vs computer mode.

The point of this project isn't/wasn't to focus on styling so you'll see minimal styling here and using bootstrap for most actions.

## (Code) Design Decisions

### Typescript

The code is all written in TypeScript, the rationale here is that adding type safety not only prevents making dumb mistakes when coding but it makes
refactoring and extending the code easier as the type safety will catch things which have changed but are not updated. Along with this the intelisense in VSCode makes working with the code easier in areas.

### React

I decided to use React as it was the most common framework for jobs at the time so made sense to have as a showcase project.

### Reducers

Most of the logic for user actions (e.g. changing board size, resetting the game etc) are handled by react reducers. The rationale here is 2-fold. 1. when an action is performed, there's often multiple pieces of related state to update, for example, changing the board size also needs to reset the game. Resetting the game not only involves clearing the current board, but updating who's turn is next. 2. I can write tests for the game logic independent of the UI. This saves time while also providing value and security when adding features.

## AI (Player vs Computer)

The player vs computer mode has 3 levels of difficulty (easy, medium, hard). For the easy mode, the algorithm just uses random numbers to try to place a piece on the board in a free spot. It's as such, not smart and can be beaten. There is a chance it plays a perfect game but this is more by luck than design.

The medium and hard modes use the same minimax algorithm. This algorithm will play out all possible scenarios to a final winning state to determine if the computer will win or lose. It will then play the most optimum position to win the game. The hard mode is impossible to win against, the best you can do is draw. The medium version of the algorithm is capped at a given depth. This means the computer will try to work out the best possible move but can only get part way through this decision tree. This means it will try to avoid obvious negative scenarios but may not play the best possible move.

## Deployments

The code is deployed to Github Pages via a simple Github Action when there are changes to the `main` branch. Given my existing website already deployed to Github pages with DNS config etc already being in place, this free hosting solution was the quickest and easiest to get working.

## Known issues/limitations

When playing against the computer, it is currently only possible to play in medium or hard modes on the 3x3 grid. This is because the minimax algorithm is recursive and quite expensive to compute. If you try to play against the computer in hard mode on a 5x5 grid you'll quickly crash the browser tab.

The solution to this is to extend the minimax algorithm to add alpha-beta pruning. This allows us to significantly speed up the algorithm by discarding branches which we know will result in a loss. This simplifies and reduces the search space.

## Next Steps

For now this project is on hold but possible future functionality would be:

1. Implement the above mentioned alpha/beta pruning
2. Hand off the minimax algorithm to WebAssembly (written in Rust) to compute the best move.

Using WebAssembly enables us to make use of near-native performance which isn't possible with JavaScript. Being strongly typed and pre-compiled, web assembly can skip a lot of the overhead which comes with JavaScript.
