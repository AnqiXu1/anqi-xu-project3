import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const SudokuContext = createContext();

const createEmptyGrid = (size) => Array.from({ length: size }, () => Array(size).fill(0));

const isValid = (board, row, col, num, size) => {

    for (let i = 0; i < size; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }
    

    const boxRows = size === 6 ? 2 : 3;
    const boxCols = 3; 
    
    const startRow = Math.floor(row / boxRows) * boxRows;
    const startCol = Math.floor(col / boxCols) * boxCols;

    for (let i = 0; i < boxRows; i++) {
        for (let j = 0; j < boxCols; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
};

const fillBoard = (board, size) => {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) {

                const nums = [...Array(size).keys()].map(i => i + 1).sort(() => Math.random() - 0.5);
                for (let num of nums) {
                    if (isValid(board, row, col, num, size)) {
                        board[row][col] = num;
                        if (fillBoard(board, size)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
};

export const SudokuProvider = ({ children }) => {
    const [grid, setGrid] = useState([]);
    const [initialGrid, setInitialGrid] = useState([]);
    const [gameState, setGameState] = useState('welcome');
    const [difficulty, setDifficulty] = useState('Easy');
    const [seconds, setSeconds] = useState(0);
    const [scores, setScores] = useState([]);

    useEffect(() => {
        let interval = null;
        if (gameState === 'playing') {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startGame = useCallback((mode) => {
        setSeconds(0);
        const formattedMode = mode.charAt(0).toUpperCase() + mode.slice(1);
        const size = formattedMode === 'Easy' ? 6 : 9;
        

        let fullSolution = createEmptyGrid(size);
        fillBoard(fullSolution, size);
        

        console.log("Sudoku Solution (Cheat Sheet):", fullSolution);


        const cellsToKeep = formattedMode === 'Easy' ? 22 : 40;
        
        let puzzle = fullSolution.map(row => [...row]);
        let removed = 0;
        const totalCells = size * size;

        while (removed < (totalCells - cellsToKeep)) {
            const r = Math.floor(Math.random() * size);
            const c = Math.floor(Math.random() * size);
            if (puzzle[r][c] !== 0) {
                puzzle[r][c] = 0;
                removed++;
            }
        }

        setGrid(puzzle);
        setInitialGrid(puzzle.map(row => [...row]));
        setDifficulty(formattedMode);
        setGameState('playing');
    }, []);

    const resetGame = useCallback(() => {
        setGrid(initialGrid.map(row => [...row]));
        setSeconds(0);
        setGameState('playing');
    }, [initialGrid]);

    return (
        <SudokuContext.Provider value={{
            grid, setGrid,
            initialGrid,
            gameState, setGameState,
            difficulty, startGame, resetGame,
            seconds, setSeconds, formatTime, scores, setScores
        }}>
            {children}
        </SudokuContext.Provider>
    );
};

export const useSudoku = () => useContext(SudokuContext);