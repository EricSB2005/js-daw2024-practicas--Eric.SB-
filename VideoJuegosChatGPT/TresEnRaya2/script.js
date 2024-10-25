const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const twoPlayersButton = document.getElementById('twoPlayers');
const cpuButton = document.getElementById('cpu');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isCpuGame = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

twoPlayersButton.addEventListener('click', () => startGame(false));
cpuButton.addEventListener('click', () => startGame(true));

function startGame(cpuGame) {
    isCpuGame = cpuGame;
    resetGame();
    menu.style.display = 'none';
    game.style.display = 'grid';

    // Elige aleatoriamente quién comienza
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; 

    // Si la CPU comienza, haz su movimiento
    if (isCpuGame && currentPlayer === 'O') {
        cpuTurn();
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive || currentPlayer === 'O') {
        return; // No permite hacer clic si es turno de la CPU
    }

    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();

    if (isCpuGame && gameActive) {
        currentPlayer = 'O'; // Cambia a CPU
        cpuTurn();
    }
}

function cpuTurn() {
    let availableCells = board.map((cell, index) => (cell === '' ? index : null)).filter(v => v !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    board[randomIndex] = 'O'; // CPU usa 'O'
    cells[randomIndex].textContent = 'O';

    checkResult();
    currentPlayer = 'X'; // Regresa el turno al jugador
}

function checkResult() {
    let roundWon = false;

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `¡Jugador ${currentPlayer} gana!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.textContent = '¡Es un empate!';
        gameActive = false;
        return;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resetButton.style.display = 'block';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);