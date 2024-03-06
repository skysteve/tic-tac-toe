import { Board } from "./components/board";
import "./App.css";
import { NavBar } from "./components/navbar";

function App() {
  return (
    <div className="container">
      <NavBar />

      <br />
      <Board />
    </div>
  );
}

export default App;
