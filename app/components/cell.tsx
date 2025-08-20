
import { Dispatch, SetStateAction } from "react";

type CellProps = {
    id:number
    go: string;
    setGo: Dispatch<SetStateAction<string>>;
    cells: string[];
    setCells: Dispatch<SetStateAction<string[]>>;
    cell: string;
}

const Cell = ({id, go, setGo, cells, setCells, cell}: CellProps) => {

    const handleClick = () =>
    {
        const notTaken = !cells[id];

        if (notTaken)
        {
            if (go === "circle")
            {
                handleCellChange("circle");
                setGo("cross");
            }
            else if (go === "cross")
            {
                handleCellChange("cross");
                setGo("circle");
            }
        }
    }

    const handleCellChange = (value: string) =>
    {
        let copyCells = [...cells];
        copyCells[id] = value;
        setCells(copyCells);
    }
    return (
            <div className="square" onClick={handleClick}>
                <div className={cell}>{cell ? (cell === "circle" ? "O": "X") : ""}</div>
            </div>
    );
}

export default Cell;