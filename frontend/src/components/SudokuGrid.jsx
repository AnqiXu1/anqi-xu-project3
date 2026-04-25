import React from 'react';
import './SudokuGrid.css';

const SudokuGrid = ({ board, onCellChange, size }) => {

  const gridClass = size === 6 ? 'grid-6x6' : 'grid-9x9';

  return (
    <div className={`sudoku-grid ${gridClass}`}>
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            value={cell === 0 ? '' : cell}
            onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
            className="sudoku-cell"
            min="1"
            max={size}
          />
        ))
      ))}
    </div>
  );
};

export default SudokuGrid;