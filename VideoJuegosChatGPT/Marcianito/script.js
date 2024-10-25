const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

let score = 0;
let timeLeft = 60; // Tiempo inicial en segundos
let playerWidth = 50;
let playerHeight = 20;
let playerX = (canvas.width - playerWidth) / 2;
let bullets = [];
let aliens = [];
let superAlien = null;
let superBullets = [];
let alienRows = 3;
let alienCols = 7; // Número de columnas ajustado a 7
let alienWidth = 40;
let alienHeight = 20;
let alienSpeed = 0.5;
let superAlienSpeed = 2;
let gameOver = false;

// Aumentar el tamaño vertical del canvas
canvas.height = 480; // Ajustado a 400 píxeles

let keys = {};

// Crear alienígenas
function createAliens() {
    for (let r = 0; r < alienRows; r++) {
        for (let c = 0; c < alienCols; c++) {
            aliens.push({ x: c * (alienWidth + 10), y: r * (alienHeight + 10) });
        }
    }
}

// Dibuja el jugador
function drawPlayer() {
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);
}

// Dibuja los alienígenas
function drawAliens() {
    ctx.fillStyle = 'red';
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, alienWidth, alienHeight);
    });
}

// Dibuja las balas
function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

// Dibuja el Súper Marciano
function drawSuperAlien() {
    if (superAlien) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(superAlien.x, superAlien.y, superAlien.width, superAlien.height);
    }
}

// Dibuja las super balas
function drawSuperBullets() {
    ctx.fillStyle = 'red';
    superBullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 10, 20);
    });
}

// Actualiza la posición de las balas
function updateBullets() {
    bullets.forEach(bullet => {
        bullet.y -= 5;
    });
    // Restar 5 puntos si las balas desaparecen
    bullets.forEach((bullet, index) => {
        if (bullet.y < 0) {
            score -= 5;
            scoreElement.textContent = `Puntuación: ${score}`;
            bullets.splice(index, 1); // Elimina la bala
        }
    });
}

// Actualiza la posición de los alienígenas
function updateAliens() {
    let hitBottom = false;
    aliens.forEach(alien => {
        alien.y += alienSpeed;
        if (alien.y + alienHeight > canvas.height - playerHeight - 10) {
            hitBottom = true;
        }
    });
    if (hitBottom) {
        gameOver = true;
    }
}

// Actualiza el Súper Marciano
function updateSuperAlien() {
    if (superAlien) {
        superAlien.x += superAlienSpeed;
        if (superAlien.x + superAlien.width > canvas.width || superAlien.x < 0) {
            superAlienSpeed = -superAlienSpeed;
        }
    }
}

// Actualiza las super balas
function updateSuperBullets() {
    superBullets.forEach(bullet => {
        bullet.y += 5;
    });
    superBullets = superBullets.filter(bullet => bullet.y < canvas.height);
}

// Verifica colisiones
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        aliens.forEach((alien, aIndex) => {
            if (
                bullet.x < alien.x + alienWidth &&
                bullet.x + 5 > alien.x &&
                bullet.y < alien.y + alienHeight &&
                bullet.y + 10 > alien.y
            ) {
                aliens.splice(aIndex, 1);
                bullets.splice(bIndex, 1);
                score += 10;
                scoreElement.textContent = `Puntuación: ${score}`;
                
                if (aliens.length === 0 && !superAlien) {
                    superAlien = { x: canvas.width / 2 - 50, y: 50, width: 100, height: 40, health: 10 };
                }
            }
        });
    });

    if (superAlien) {
        bullets.forEach((bullet, bIndex) => {
            if (
                bullet.x < superAlien.x + superAlien.width &&
                bullet.x + 5 > superAlien.x &&
                bullet.y < superAlien.y + superAlien.height &&
                bullet.y + 10 > superAlien.y
            ) {
                superAlien.health--;
                bullets.splice(bIndex, 1);
                if (superAlien.health <= 0) {
                    // Sumar tiempo restante como puntos
                    score += timeLeft;
                    alert(`¡Ganaste! Has eliminado al Súper Marciano. Puntuación final: ${score}`);
                    document.location.reload();
                }
            }
        });
    }

    superBullets.forEach((bullet, bIndex) => {
        if (
            bullet.x < playerX + playerWidth &&
            bullet.x + 10 > playerX &&
            bullet.y + 20 > canvas.height - playerHeight - 10
        ) {
            gameOver = true;
        }
    });
}

// Función para disparar super balas
function shootSuperBullet() {
    if (superAlien && superBullets.length < 2) {
        superBullets.push({
            x: superAlien.x + superAlien.width / 2 - 5,
            y: superAlien.y + superAlien.height
        });
    }
}

// Dibuja el juego
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawAliens();
    drawBullets();
    drawSuperAlien();
    drawSuperBullets();
}

// Actualiza el juego
function update() {
    if (gameOver) {
        alert('¡Game Over! Puntuación final: ' + score);
        resetGame();
        return;
    }
    updateBullets();
    updateAliens();
    updateSuperAlien();
    updateSuperBullets();
    checkCollisions();
    draw();

    // Actualiza el temporizador en la pantalla
    timerElement.textContent = `Tiempo restante: ${timeLeft}`;
}

// Reinicia el juego
function resetGame() {
    score = 0;
    timeLeft = 60; // Reinicia el tiempo
    playerX = (canvas.width - playerWidth) / 2;
    bullets = [];
    aliens = [];
    superAlien = null;
    superBullets = [];
    gameOver = false;

    createAliens();
    scoreElement.textContent = `Puntuación: ${score}`;
}

// Control del jugador
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ' && bullets.length < 2) {
        bullets.push({ x: playerX + playerWidth / 2 - 2.5, y: canvas.height - playerHeight - 20 });
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mover el jugador según las teclas presionadas
function movePlayer() {
    if (keys['ArrowLeft'] && playerX > 0) {
        playerX -= 5;
    }
    if (keys['ArrowRight'] && playerX < canvas.width - playerWidth) {
        playerX += 5;
    }
}

// Iniciar el juego
createAliens();
setInterval(() => {
    movePlayer();
    update();
}, 1000 / 60); // 60 FPS

// Contador de tiempo
setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        gameOver = true; // Termina el juego si el tiempo se acaba
    }
}, 1000); // Cada segundo

// Disparar super balas de forma aleatoria
setInterval(() => {
    shootSuperBullet();
}, 2000); // Cada 2 segundos
