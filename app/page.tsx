"use client"
import { useState } from "react";
import Cell from "./components/cell";

export default function Home() {
  const [cell, setCells] = useState(["", "", "", "", "", "", "", "", ""])
  return (
    <div className='container'>
      <div className="gameboard">
        {cell.map((cell, index) => (
          <Cell key={index} />
        ))}
      </div>
    </div>
  );
}
