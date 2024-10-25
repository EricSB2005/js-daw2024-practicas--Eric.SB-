const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset');
const timerElement = document.createElement('div');

document.body.appendChild(timerElement);
timerElement.style.fontSize = '20px';
timerElement.style.marginTop = '10px';

let paddleWidth = 10;
let paddleHeight = 80;
let ballSize = 10;

let player1 = { x: 0, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
let player2 = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0, up: false, down: false };
let ball = { x: canvas.width / 2, y: canvas.height / 2, speedX: 5, speedY: 3 };
let timer = 90; // 90 seconds
let gameInterval;

// Función para dibujar el juego
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar las palas
    ctx.fillStyle = 'blue'; // Jugador 1 (CPU)
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
    ctx.fillStyle = 'red'; // Jugador 2 (Humano)
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

    // Dibujar la pelota
    ctx.fillStyle = 'black';
    ctx.fillRect(ball.x, ball.y, ballSize, ballSize);

    // Mover la pelota
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Colisiones con las paredes
    if (ball.y <= 0 || ball.y + ballSize >= canvas.height) {
        ball.speedY = -ball.speedY;
    }

    // Colisiones con las palas
    if (
        (ball.x <= player1.x + paddleWidth && ball.y + ballSize >= player1.y && ball.y <= player1.y + paddleHeight) ||
        (ball.x + ballSize >= player2.x && ball.y + ballSize >= player2.y && ball.y <= player2.y + paddleHeight)
    ) {
        ball.speedX = -ball.speedX;
    }

    // Punto para el jugador 2
    if (ball.x < 0) {
        player2.score++;
        resetBall();
    }

    // Punto para el jugador 1
    if (ball.x + ballSize > canvas.width) {
        player1.score++;
        resetBall();
    }

    updateScore();
};

// Reiniciar la posición de la pelota
const resetBall = () => {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = 5 * (Math.random() < 0.5 ? 1 : -1);
    ball.speedY = 3 * (Math.random() < 0.5 ? 1 : -1);
};

// Actualizar el puntaje
const updateScore = () => {
    scoreElement.textContent = `Jugador 1 (CPU): ${player1.score} | Jugador 2: ${player2.score}`;
};

// Manejar las teclas para el Jugador 2
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') player2.up = true;
    if (event.key === 's') player2.down = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') player2.up = false;
    if (event.key === 's') player2.down = false;
});

// Mover las palas
const movePaddles = () => {
    // Movimiento de la CPU (Jugador 1)
    if (ball.y < player1.y) {
        player1.y = Math.max(player1.y - 3, 0); // Mover hacia arriba
    } else if (ball.y > player1.y + paddleHeight) {
        player1.y = Math.min(player1.y + 3, canvas.height - paddleHeight); // Mover hacia abajo
    }

    // Movimiento del jugador humano (Jugador 2)
    if (player2.up && player2.y > 0) player2.y -= 5;
    if (player2.down && player2.y + paddleHeight < canvas.height) player2.y += 5;
};

// Reiniciar el juego
const resetGame = () => {
    player1.score = 0; // Reiniciar puntos del jugador 1
    player2.score = 0; // Reiniciar puntos del jugador 2
    player1.y = canvas.height / 2 - paddleHeight / 2; // Reiniciar posición del jugador 1
    player2.y = canvas.height / 2 - paddleHeight / 2; // Reiniciar posición del jugador 2
    resetBall(); // Reiniciar posición de la pelota
    timer = 90; // Reiniciar el tiempo
    updateScore();
    timerElement.textContent = `Tiempo: ${timer}s`; // Reiniciar el temporizador en la interfaz
    startTimer();
};

// Función para iniciar el temporizador
const startTimer = () => {
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timer--;
        timerElement.textContent = `Tiempo: ${timer}s`;
        if (timer <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
};

// Finalizar el juego
const endGame = () => {
    alert(`¡Se acabó el tiempo! \nResultado: Jugador 1 (CPU): ${player1.score} | Jugador 2: ${player2.score}`);
    resetGame(); // Reiniciar el juego al final
};

// Bucle del juego
const gameLoop = () => {
    movePaddles();
    draw();
    requestAnimationFrame(gameLoop);
};

// Iniciar el juego
resetGame();
gameLoop();