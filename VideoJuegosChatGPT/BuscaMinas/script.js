const boardElement = document.getElementById('board');
const resetButton = document.getElementById('reset');
const messageElement = document.getElementById('message');

const rows = 10;
const cols = 10;
const minesCount = 10;

let board = [];
let revealedCells = 0;
let gameOver = false;

// Inicializar el tablero
const initBoard = () => {
    board = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Colocar minas
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (board[row][col] === 0) {
            board[row][col] = 'M';
            minesPlaced++;
            updateAdjacentCells(row, col);
        }
    }

    createCells();
};

// Actualizar las celdas adyacentes
const updateAdjacentCells = (row, col) => {
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] !== 'M') {
                board[r][c]++;
            }
        }
    }
};

// Crear las celdas del tablero
const createCells = () => {
    boardElement.innerHTML = '';
    board.forEach((row, r) => {
        row.forEach((cell, c) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.row = r;
            cellElement.dataset.col = c;
            cellElement.addEventListener('click', () => handleCellClick(r, c));
            boardElement.appendChild(cellElement);
        });
    });
};

// Manejar el clic en la celda
const handleCellClick = (row, col) => {
    if (gameOver || board[row][col] === 'revealed') return;

    if (board[row][col] === 'M') {
        revealMines();
        messageElement.textContent = '¡Perdiste! Haz clic en Reiniciar para jugar de nuevo.';
        gameOver = true;
    } else {
        revealCell(row, col);
        if (revealedCells === rows * cols - minesCount) {
            messageElement.textContent = '¡Ganaste! Haz clic en Reiniciar para jugar de nuevo.';
            gameOver = true;
        }
    }
};

// Revelar la celda
const revealCell = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] === 'revealed') return;

    const cellElement = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cellElement.classList.add('revealed');
    cellElement.textContent = board[row][col] > 0 ? board[row][col] : '';

    revealedCells++;
    board[row][col] = 'revealed';

    if (board[row][col] === 0) {
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                revealCell(r, c);
            }
        }
    }
};

// Revelar todas las minas
const revealMines = () => {
    board.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell === 'M') {
                const mineCell = document.querySelector(`.cell[data-row='${r}'][data-col='${c}']`);
                mineCell.classList.add('mine');
            }
        });
    });
};

// Reiniciar el juego
const resetGame = () => {
    revealedCells = 0;
    gameOver = false;
    messageElement.textContent = '';
    initBoard();
};

// Iniciar el juego
resetButton.addEventListener('click', resetGame);
initBoard();