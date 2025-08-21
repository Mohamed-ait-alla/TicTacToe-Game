"use client"
import { useEffect, useState } from "react";
import Cell from "./components/cell";

// Setup all winning possible cases
const winningCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winningMsg, setWinningMsg] = useState("");

  // Hook used for tracking player winning
  useEffect( () => {
    winningCases.forEach((winCase) => {
      const crossWinsCase = winCase.every((cell) => cells[cell] == "cross");
      const circleWinsCase = winCase.every((cell) => cells[cell] == "circle");
      const drawCase = (cells.every((cell) => cell !== "") && !winningMsg);

      if (crossWinsCase)
        setWinningMsg("cross wins");
      else if (circleWinsCase)
        setWinningMsg("circle wins");
      else if (drawCase)
          setWinningMsg("Draw!");
    });
  }, cells);

  return (
    <div className='container'>
      <div className="gameboard">
        {
        cells.map((cell, index) => (
          // Rendering Cell component
          <Cell 
                id={index}
                go={go}
                setGo={setGo}
                cells={cells}
                setCells={setCells}
                cell={cell}
                isWin={winningMsg}
                key={index}
          />
        ))
        }
      </div>
      <div>
        {winningMsg}
      </div>
      {
      /* Print winning message if a player wins, instead Print player's turn */
      !winningMsg && <div className="boardinfo">
                        <span>{go}</span>
                        &nbsp;
                        turn
                     </div>
      }
    </div>
  );
}
