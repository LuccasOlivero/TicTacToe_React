import "./index.css";
import { useState } from "react";
import confettty from "canvas-confetti";

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
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  //check si X u O ganó
  function checkWinner(boardToCheck) {
    let winner = null;

    WINNER_COMBOS.forEach((combo) => {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      )
        return (winner = boardToCheck[a]);
    });
    return winner;
  }

  function updateBoard(i) {
    // console.log(Boolean(board[i]));
    if (board[i] || winner) return; // checkear si el board en posision del index tiene X u O se retorna y no se puede hcaer click en mismo

    //actualizar el tablero
    const newBoard = [...board];
    newBoard[i] = turn;

    setBoard(newBoard);
    // console.log(newBoard);

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar datos en localStorage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    // ver si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confettty();
      // console.log(newWinner);
      setWinner(() => newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // draw
    }
  }

  function checkEndGame(newBoard) {
    //check si no hay mas espacios null en el tablero por lo tanto, draw
    return newBoard.every((square) => square !== null);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
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

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Draw" : "Winner:"}</h2>

            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Try again</button>
            </footer>
          </div>
        </section>
      )}
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
