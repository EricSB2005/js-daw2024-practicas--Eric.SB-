const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let score = 0;
let currentPiece;
let dropInterval;

// Definición de las piezas
const PIECES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]]  // J
];

function drawBlock(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) drawBlock(x, y, 'blue');
        });
    });
}

function drawPiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) drawBlock(currentPiece.x + x, currentPiece.y + y, 'red');
        });
    });
}

function mergePiece() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[currentPiece.y + y][currentPiece.x + x] = 1;
            }
        });
    });
}

function removeFullRows() {
    board = board.reduce((acc, row) => {
        if (row.every(value => value)) {
            score += 10;
            scoreElement.textContent = `Puntuación: ${score}`;
            acc.unshift(Array(COLS).fill(0)); // Añadir nueva fila en la parte superior
        } else {
            acc.push(row);
        }
        return acc;
    }, []);
}

function createPiece() {
    const randomIndex = Math.floor(Math.random() * PIECES.length);
    const shape = PIECES[randomIndex];
    return {
        shape,
        x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2),
        y: 0
    };
}

function canMove(offsetX, offsetY) {
    return currentPiece.shape.every((row, y) => {
        return row.every((value, x) => {
            if (value) {
                const newX = currentPiece.x + x + offsetX;
                const newY = currentPiece.y + y + offsetY;
                return newX >= 0 && newX < COLS && newY >= 0 && newY < ROWS && !board[newY][newX];
            }
            return true;
        });
    });
}

function rotatePiece() {
    const rotatedShape = currentPiece.shape[0].map((_, index) =>
        currentPiece.shape.map(row => row[index]).reverse()
    );

    if (canMove(0, 0)) {
        currentPiece.shape = rotatedShape;
    }
}

function drop() {
    if (canMove(0, 1)) {
        currentPiece.y++;
    } else {
        mergePiece();
        removeFullRows();
        currentPiece = createPiece();
        if (!canMove(0, 0)) {
            clearInterval(dropInterval);
            alert("Juego terminado");
            resetGame();
        }
    }
}

function update() {
    drawBoard();
    drawPiece();
    drop();
}

function resetGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    scoreElement.textContent = `Puntuación: ${score}`;
    currentPiece = createPiece();
    startGame();
}

function startGame() {
    currentPiece = createPiece();
    dropInterval = setInterval(update, 1000);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            if (canMove(-1, 0)) currentPiece.x--;
            break;
        case 'ArrowRight':
            if (canMove(1, 0)) currentPiece.x++;
            break;
        case 'ArrowDown':
            drop();
            break;
        case 'ArrowUp':
            rotatePiece();
            break;
    }
});

startButton.addEventListener('click', resetGame);
resetGame();