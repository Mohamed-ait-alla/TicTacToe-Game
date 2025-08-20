"use client"
import { useState } from "react";
import Cell from "./components/cell";

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");

  console.log(cells);

  return (
    <div className='container'>
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell id={index}  go={go} setGo={setGo} cells={cells} setCells={setCells} cell={cell} key={index}/>
        ))}
      </div>
    </div>
  );
}
