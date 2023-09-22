import "./index.css";
import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const WINNER_COMBOS = [
  [0, 1, 2], // primera fila
  [3, 4, 5], // segunda fila
  [6, 7, 8], // tercera fila
  [0, 3, 6], // primera columna
  [1, 4, 7], // segunda columna
  [2, 5, 8], // tercera columna
  [0, 4, 8], // diagonal de izquierda a derecha
  [2, 4, 6], // diagonal de derecha a izquierda
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [newWinner, setNewWinner] = useState(null);

  function checkWinner(boardToCheck) {
    WINNER_COMBOS.forEach((combo) => {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
        return boardToCheck[a];
    });
    return null;
  }

  function updateBoard(i) {
    console.log(Boolean(board[i]));
    if (board[i]) return; // checkear si el board en posision del index tiene X u O se retorna y no se puede hcaer click en mismo

    const newBoard = [...board];
    newBoard[i] = turn;

    setBoard(newBoard);
    console.log(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    if (newWinner) {
      setNewWinner(newWinner);
    }
  }

  return (
    <main className="board test">
      <h1>Tic tac toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

function Square({ children, updateBoard, index, isSelected = {} }) {
  const classname = `square ${isSelected === true ? "is-selected" : ""}`;

  function handleClick() {
    updateBoard(index);
  }

  return (
    <div className={classname} onClick={handleClick}>
      {children}
    </div>
  );
}
