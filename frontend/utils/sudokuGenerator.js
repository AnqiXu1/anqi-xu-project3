const isValid = (board, row, col, num, size) => {
    const boxRows = size === 6 ? 2 : 3;
    const boxCols = size === 6 ? 3 : 2;


    for (let i = 0; i < size; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }


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


export const generateSudoku = (size, difficulty) => {
    const board = Array.from({ length: size }, () => Array(size).fill(0));
    fillBoard(board, size);

    const initialBoard = board.map(row => [...row]);
    

    let attempts = size === 6 ? 18 : 45;
    while (attempts > 0) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        if (initialBoard[row][col] !== 0) {
            initialBoard[row][col] = 0;
            attempts--;
        }
    }

    return {
        solution: board,
        question: initialBoard
    };
};