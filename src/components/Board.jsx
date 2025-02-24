import React, { useState } from "react";
import Column from "./Column.jsx";

const Board = ({ columns, setColumns }) => {
  const [col, setCol] = useState({ title: "" });

  return (
<div className="scroll-container">
<div className="board-div child-container">
      {columns?.map((col, index) => {
        return (
        <div className="page">
            <Column
            key={col.id}
            col={col}
            setColumns={setColumns}
            index={index}
            columns={columns}
          />
        </div>
        );
      })}
    </div>
</div>
  );
};

export default Board;
