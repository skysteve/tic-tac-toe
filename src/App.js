import { Board } from "./components/board";
import "./App.css";
import { NavBar } from "./components/navbar";
import { useReducer } from "react";
import { INITIAL_STATE, gameReducer } from "./reducers/game";
import { GameContext } from "./contexts/game";

function App() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const context = {
    state,
    dispatch,
  };

  return (
    <GameContext.Provider value={context}>
      <div className="container">
        <NavBar />

        <br />
        <Board />
      </div>
    </GameContext.Provider>
  );
}

export default App;
