import "./index.css";
import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

export default function App() {
  return <Main></Main>;
}

function Main() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [activePlayer, setActivePlayer] = useState(false);

  function handleTurn() {
    setActivePlayer(() => !activePlayer);
  }

  return (
    <main className="board test">
      <h1>Tic tac toe</h1>
      <section className="game">
        {board.map((_, i) => {
          return (
            <Square
              key={i}
              index={i}
              onClick={handleTurn}
              activePlayer={activePlayer}
            ></Square>
          );
        })}
      </section>
    </main>
  );
}

function Square({ children, updateBoard, index, onClick, activePlayer }) {
  return (
    <div className="square" onClick={onClick}>
      {activePlayer ? TURNS.X : TURNS.O}
    </div>
  );
}
