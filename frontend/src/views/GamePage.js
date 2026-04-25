import React, { useEffect, useState, useCallback } from 'react';
import { useSudoku } from '../context/SudokuContext';
import axios from 'axios';
import '../styles/common.css';
import '../styles/game-easy.css';
import '../styles/game-hard.css';

const GamePage = ({ difficulty }) => {
    const { 
        grid, setGrid, initialGrid, startGame, resetGame, 
        seconds, formatTime, gameState, setGameState 
    } = useSudoku();
    
    const [isSaving, setIsSaving] = useState(false);

    const isInvalid = useCallback((row, col, value) => {
        if (!grid || grid.length === 0 || !grid[row] || value === 0) return false;
        const size = grid.length;

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
    }, [grid]);

    const handleVictory = useCallback(async () => {
        if (isSaving || gameState !== 'playing') return; 
        
        setIsSaving(true);
        setGameState('won');
        
        const token = localStorage.getItem('token');
        const formattedDiff = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

        try {
            await axios.post('https://anqi-xu-project3-backend.onrender.com/api/games/save', {
                size: grid.length,
                difficulty: formattedDiff,
                initialBoard: initialGrid,
                currentBoard: grid,
                timer: seconds,
                isCompleted: true
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setTimeout(() => {
                alert(`Winner! Record saved to database. Time: ${formatTime(seconds)}`);
            }, 100);
            
        } catch (err) {
            console.error("Save failed:", err);
            alert("Victory! (But failed to save record: " + (err.response?.data?.message || "Server Error") + ")");
        } finally {
            setIsSaving(false);
        }
    }, [grid, difficulty, initialGrid, seconds, formatTime, setGameState, isSaving, gameState]);


    useEffect(() => {
        const formattedDiff = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        startGame(formattedDiff);
    }, [difficulty, startGame]); 


    useEffect(() => {
        if (!grid || grid.length === 0 || isSaving || gameState !== 'playing') return;

        const isFilled = grid.every(row => row.every(cell => cell !== 0));
        if (isFilled) {
            const hasError = grid.some((row, rIdx) => 
                row.some((cell, cIdx) => isInvalid(rIdx, cIdx, cell))
            );

            if (!hasError) {
                handleVictory();
            }
        }
    }, [grid, isInvalid, isSaving, handleVictory, gameState]);

    const handleInputChange = (row, col, e) => {
        const val = e.target.value;
        const max = grid.length;
        
        if (val === '' || (Number(val) >= 1 && Number(val) <= max)) {
            const newGrid = grid.map(r => [...r]);
            newGrid[row][col] = val === '' ? 0 : Number(val);
            setGrid(newGrid);
        }
    };

    const gridClass = grid.length === 6 ? 'sudoku-grid-6x6' : 'sudoku-grid-9x9';

    if (!grid || grid.length === 0) {
        return <div className="container">Generating Puzzle...</div>;
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>
                {grid.length === 6 ? 'Easy Mode: 6 x 6' : 'Hard Mode: 9 x 9'}
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
                <button 
                    className="auth-submit" 
                    onClick={() => startGame(difficulty.charAt(0).toUpperCase() + difficulty.slice(1))}
                >
                    New Game
                </button>
                <button 
                    className="auth-submit" 
                    style={{ backgroundColor: '#95a5a6' }} 
                    onClick={resetGame}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default GamePage;