let player = document.getElementById('player');
let ai = document.getElementById('ai');
let ball = document.getElementById('ball');
let scoreDisplay = document.getElementById('score');
let startBtn = document.getElementById('startBtn');
let winMessage = document.getElementById('winMessage');

let score = 0;
let playerPosition = 150;
let aiPosition = 150;
let ballPosition = { x: 50, y: 50 };
let ballVelocity = { x: 2, y: 2 };
let playerSpeed = 0;
let aiSpeed = 3;

function updatePositions() {
  player.style.top = playerPosition + 'px';
  ai.style.top = aiPosition + 'px';
  ball.style.top = ballPosition.y + 'px';
  ball.style.left = ballPosition.x + 'px';
}

function moveBall() {
  ballPosition.x += ballVelocity.x;
  ballPosition.y += ballVelocity.y;

  // Collision avec le haut et bas
  if (ballPosition.y <= 0 || ballPosition.y >= gameArea.clientHeight - ball.clientHeight) {
    ballVelocity.y = -ballVelocity.y;
  }

  // Collision avec le joueur
  if (ballPosition.x <= 50 && ballPosition.y >= playerPosition && ballPosition.y <= playerPosition + player.clientHeight) {
    ballVelocity.x = -ballVelocity.x;
    score++;
    scoreDisplay.textContent = score;
  }

  // Collision avec l'IA
  if (ballPosition.x >= gameArea.clientWidth - 70 && ballPosition.y >= aiPosition && ballPosition.y <= aiPosition + ai.clientHeight) {
    ballVelocity.x = -ballVelocity.x;
  }

  // Si le joueur marque
  if (ballPosition.x <= 0) {
    resetBall();
    score--;
    scoreDisplay.textContent = score;
  }

  // Si l'IA marque
  if (ballPosition.x >= gameArea.clientWidth - ball.clientWidth) {
    resetBall();
    aiScore();
  }

  if (score >= 3) {
    winMessage.style.display = 'block';
    return;  // Stopper le jeu une fois que le joueur a gagné
  }

  updatePositions();
}

function resetBall() {
  ballPosition = { x: gameArea.clientWidth / 2, y: gameArea.clientHeight / 2 };
  ballVelocity = { x: 2, y: 2 };
}

function aiMove() {
  if (aiPosition + ai.clientHeight / 2 < ballPosition.y) aiPosition += aiSpeed;
  if (aiPosition + ai.clientHeight / 2 > ballPosition.y) aiPosition -= aiSpeed;

  if (aiPosition < 0) aiPosition = 0;
  if (aiPosition > gameArea.clientHeight - ai.clientHeight) aiPosition = gameArea.clientHeight - ai.clientHeight;

  updatePositions();
}

function gameLoop() {
  moveBall();
  aiMove();
}

startBtn.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  playerPosition = 150;
  aiPosition = 150;
  ballPosition = { x: gameArea.clientWidth / 2, y: gameArea.clientHeight / 2 };
  winMessage.style.display = 'none';
  updatePositions();
  setInterval(gameLoop, 16);  // 60 FPS
});

// Mouvement du joueur
document.addEventListener('touchstart', (e) => {
  let touch = e.touches[0];
  playerPosition = touch.clientY - player.clientHeight / 2;
  if (playerPosition < 0) playerPosition = 0;
  if (playerPosition > gameArea.clientHeight - player.clientHeight) playerPosition = gameArea.clientHeight - player.clientHeight;
  updatePositions();
});

// Empêcher le défilement sur mobile
document.body.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });
