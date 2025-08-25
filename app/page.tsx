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
  const [winCases, setWinCases] = useState<number[]>([]);
  const [mode, setMode] = useState<string>("");

  // Hook used for tracking player winning cases
  useEffect(() => {
    winningCases.forEach((winCase) => {
      const crossWinsCase = winCase.every((cell) => cells[cell] == "cross");
      const circleWinsCase = winCase.every((cell) => cells[cell] == "circle");
      const drawCase = (cells.every((cell) => cell !== "") && !isWin);

      // Cross Wins
      if (crossWinsCase) {
        setWinCases(winCase);
        setTimeout(() => setIsWin("cross"), 1200);
      }
      // Cricle Wins
      else if (circleWinsCase) {
        setWinCases(winCase);
        setTimeout(() => setIsWin("circle"), 1200);
      }
      // Draw case
      else if (drawCase) {
        setIsWin("draw");
        setWinCases([]);
      }
    });
  }, cells);

  // hook used for setting up computer's turn when computer-mode is chosed
  useEffect(() => {
    if (go === "cross" && mode === "computer-mode" && !isWin) {
      const timer = setTimeout(() => {
        // get empty indices and store as array
        const emptyIndices = cells.map((val, idx) => (
          val === "" ? idx : null
        )).filter((val) => val !== null) as number[];
        // Set up a random turn if there is an empty cell
        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newCells = [...cells];
          newCells[randomIndex] = "cross";
          setCells(newCells);
          
          // Switch turn back to the user
          setGo("circle");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [go, cells, isWin, mode]);

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
    setWinCases([]);
  }

  return (
    <div className='container'>
      {
        !mode ?
          (
            <div className="mode-container">
              <h1 className="mode-welcome">Welcome to Tic-Tac-Toe 🎮</h1>
              <p className="mode-chose-title">Chose Your Game Mode</p>
              <div className="mode-buttons">
                <button className="mode-btn friend" onClick={() => setMode("friend-mode")}>👥 Play with Friend</button>
                <button className="mode-btn computer" onClick={() => setMode("computer-mode")}>🤖 Play with Computer</button>
              </div>
            </div>
          )
          :

          (
            <>
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
                            ishighlighted={winCases.includes(index)}
                            key={index} />
                        ))}
                      </div>
                      <div className="boardinfo">
                        <span>{(go === "cross" ? "❌" : "⭕️")}</span> turn
                      </div>
                    </>
                  )
              }
            </>
          )
      }
    </div>
  );
}
