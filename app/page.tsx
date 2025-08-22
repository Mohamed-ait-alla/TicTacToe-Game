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
  const [isWin, setIsWin] = useState("");

  // Hook used for tracking player winning
  useEffect(() => {
    winningCases.forEach((winCase) => {
      const crossWinsCase = winCase.every((cell) => cells[cell] == "cross");
      const circleWinsCase = winCase.every((cell) => cells[cell] == "circle");
      const drawCase = (cells.every((cell) => cell !== "") && !isWin);

      if (crossWinsCase)
        setIsWin("cross");
      else if (circleWinsCase)
        setIsWin("circle");
      else if (drawCase)
        setIsWin("draw");
    });
  }, cells);


  // pick a css class depending on winning case occured
  const resultClass = () => {
    if (isWin === "cross")
      return ("cross-text");
    if (isWin === "circle")
      return ("circle-text");
    if (isWin === "draw")
      return ("draw-text");
    return (undefined);
  }

  // if Play again button pressed reset things
  const handlePlayAgain = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("circle");
    setIsWin("");
  }

  return (
    <div className='container'>
      {
        isWin ? 
        (
            <div className="popup">
              <h2 className={resultClass()}>
                {isWin === "cross" && "❌ Cross Wins!"}
                {isWin === "circle" && "⭕️ Circle Wins!"}
                {isWin === "draw" && "🤝 It's a Draw!"}
              </h2>
              <button className="play-again-btn" onClick={handlePlayAgain}>Play Again</button>
            </div>
        )
        :
        (
            <>
              <div className="gameboard">
                {cells.map((cell, index) => (
                  // Rendering Cell component
                  <Cell
                    id={index}
                    go={go}
                    setGo={setGo}
                    cells={cells}
                    setCells={setCells}
                    cell={cell}
                    isWin={isWin}
                    key={index} />
                ))}
              </div>
              <div className="boardinfo">
                <span>{go}</span> turn
              </div>
            </>
        )
      }
    </div>
  );
}
