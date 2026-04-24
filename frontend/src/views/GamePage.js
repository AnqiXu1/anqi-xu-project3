import React, { useEffect } from 'react';
import { useSudoku } from '../context/SudokuContext';
import '../styles/common.css';
import '../styles/game-easy.css';
import '../styles/game-hard.css';

const GamePage = ({ difficulty }) => {
    const { 
        grid, setGrid, initialGrid, startGame, resetGame, 
        seconds, formatTime, saveScore, setGameState 
    } = useSudoku();

    useEffect(() => {
        startGame(difficulty);
    }, [difficulty]);

    const isInvalid = (row, col, value) => {
        if (!grid || grid.length === 0 || !grid[row] || value === 0) return false;
        const size = difficulty === 'easy' ? 6 : 9;

        for (let i = 0; i < size; i++) {
            if (i !== col && grid[row][i] === value) return true;
            if (i !== row && grid[i][col] === value) return true;
        }

        const boxRows = size === 6 ? 2 : 3;
        const boxCols = 3;
        const startRow = Math.floor(row / boxRows) * boxRows;
        const startCol = Math.floor(col / boxCols) * boxCols;

        for (let i = 0; i < boxRows; i++) {
            for (let j = 0; j < boxCols; j++) {
                if ((startRow + i !== row || startCol + j !== col) && 
                    grid[startRow + i][startCol + j] === value) {
                    return true;
                }
            }
        }
        return false;
    };

    // Victory
    useEffect(() => {
        if (!grid || grid.length === 0) return;

        const isFilled = grid.every(row => row.every(cell => cell !== 0));
        const hasError = grid.some((row, rIdx) => 
            row.some((cell, cIdx) => isInvalid(rIdx, cIdx, cell))
        );

        if (isFilled && !hasError) {
            setGameState('won');
            saveScore(difficulty, seconds);
            setTimeout(() => {
                alert(`Winner! You finished in ${formatTime(seconds)}! Record saved.`);
            }, 100);
        }
    }, [grid]);

    const handleInputChange = (row, col, e) => {
        const val = e.target.value;
        const max = difficulty === 'easy' ? 6 : 9;
        
        if (val === '' || (Number(val) >= 1 && Number(val) <= max)) {
            const newGrid = grid.map(r => [...r]);
            newGrid[row][col] = val === '' ? 0 : Number(val);
            setGrid(newGrid);
        }
    };

    const gridClass = difficulty === 'easy' ? 'sudoku-grid-6x6' : 'sudoku-grid-9x9';

    if (!grid || grid.length === 0) {
        return <div className="container">Loading Puzzle...</div>;
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>
                {difficulty === 'easy' ? 'Easy Mode: 6 x 6' : 'Normal Mode: 9 x 9'}
            </h1>
            
            <div className="timer" style={{ color: '#e74c3c', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
                Time: {formatTime(seconds)}
            </div>

            <div className={gridClass} style={{ margin: '0 auto' }}>
                {grid.map((row, rowIndex) => (
                    row.map((cellValue, colIndex) => {
                        const isReadOnly = initialGrid[rowIndex] && initialGrid[rowIndex][colIndex] !== 0;
                        const errorClass = isInvalid(rowIndex, colIndex, cellValue) ? 'cell-error' : '';
                        
                        return (
                            <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
                                <input
                                    type="number"
                                    value={cellValue === 0 ? '' : cellValue}
                                    readOnly={isReadOnly}
                                    onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
                                    className={`${isReadOnly ? 'pre-filled' : 'user-input'} ${errorClass}`}
                                />
                            </div>
                        );
                    })
                ))}
            </div>

            <div className="game-controls" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button className="auth-submit" onClick={() => startGame(difficulty)}>New Game</button>
                <button className="auth-submit" style={{ backgroundColor: '#95a5a6' }} onClick={resetGame}>Reset</button>
            </div>
        </div>
    );
};

export default GamePage;