import React, { createContext, useState, useContext, useEffect } from 'react';

const SudokuContext = createContext();

export const SudokuProvider = ({ children }) => {
    const [grid, setGrid] = useState([]);
    const [initialGrid, setInitialGrid] = useState([]);
    const [gameState, setGameState] = useState('welcome'); 
    const [difficulty, setDifficulty] = useState('normal');
    
    const [seconds, setSeconds] = useState(0);

    const [scores, setScores] = useState(() => {
        const savedScores = localStorage.getItem('sudoku-scores');
        return savedScores ? JSON.parse(savedScores) : [];
    });


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

    const saveScore = (mode, timeInSeconds) => {
        const newScore = {
            id: Date.now(),
            user: "Anqi Xu",
            difficulty: mode,
            time: timeInSeconds,
            date: new Date().toLocaleDateString()
        };

        const updatedScores = [...scores, newScore]
            .sort((a, b) => a.time - b.time)
            .slice(0, 10);

        setScores(updatedScores);
        localStorage.setItem('sudoku-scores', JSON.stringify(updatedScores));
    };

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

    const startGame = (mode) => {
        setSeconds(0);
        const size = mode === 'easy' ? 6 : 9;
        let newBoard = createEmptyGrid(size);
        fillBoard(newBoard, size);

        const cellsToKeep = mode === 'easy' ? 18 : 28;
        let puzzle = newBoard.map(row => [...row]);
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
        setDifficulty(mode);
        setGameState('playing');
    };

    const resetGame = () => {
        setGrid(initialGrid.map(row => [...row]));
    };

    return (
        <SudokuContext.Provider value={{
            grid, setGrid,
            initialGrid,
            gameState, setGameState,
            difficulty, startGame, resetGame,
            seconds, formatTime, scores, saveScore
        }}>
            {children}
        </SudokuContext.Provider>
    );
};

export const useSudoku = () => useContext(SudokuContext);