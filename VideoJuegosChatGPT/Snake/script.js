const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let food = {};
let score = 0;
let gameInterval;

// Generar comida en una posición aleatoria
const spawnFood = () => {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
    };
};

// Dibujar el juego
const drawGame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la comida
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Dibujar la serpiente
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'darkgreen';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    // Mover la serpiente
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    
    // Comprobar colisión con la comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = `Puntuación: ${score}`;
        snake.unshift(head);
        spawnFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }

    // Comprobar colisión con los límites
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
        clearInterval(gameInterval);
        alert('¡Perdiste! Tu puntuación fue: ' + score);
    }
};

// Comprobar colisión con la serpiente
const checkCollision = (head) => {
    return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

// Cambiar la dirección de la serpiente
const changeDirection = (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
};

// Reiniciar el juego
const resetGame = () => {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    score = 0;
    scoreElement.textContent = `Puntuación: ${score}`;
    spawnFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(drawGame, 100);
};

// Eventos
document.addEventListener('keydown', changeDirection);
resetButton.addEventListener('click', resetGame);

// Iniciar el juego
resetGame();