/**
 * Sudoku Generator Utility
 * 兼容 6x6 (2x3 blocks) 和 9x9 (3x3 blocks)
 */

// 检查在特定位置填入数字是否合法
const isValid = (board, row, col, num, size) => {
    const boxRows = size === 6 ? 2 : 3;
    const boxCols = size === 6 ? 3 : 2; // 6x6 通常是 2行x3列 的宫格

    // 检查行和列
    for (let i = 0; i < size; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }

    // 检查宫格 (Box)
    // 注意：6x6 的宫格计算逻辑
    const startRow = Math.floor(row / boxRows) * boxRows;
    const startCol = Math.floor(col / boxCols) * boxCols;

    for (let i = 0; i < boxRows; i++) {
        for (let j = 0; j < boxCols; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
};

// 递归填充棋盘
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

// 生成题目：填满后随机挖空
export const generateSudoku = (size, difficulty) => {
    const board = Array.from({ length: size }, () => Array(size).fill(0));
    fillBoard(board, size);

    const initialBoard = board.map(row => [...row]);
    
    // 根据难度决定挖掉多少个数字
    // 6x6 挖掉 ~15-20个，9x9 挖掉 ~40-50个
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
        solution: board,    // 完整答案
        question: initialBoard // 留空的题目
    };
};