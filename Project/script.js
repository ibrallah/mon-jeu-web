const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dimensions
const paddleHeight = 80, paddleWidth = 10, ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;

// Joueurs
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;

// Contrôles clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'w' && player1Y > 0) player1Y -= 20;
  if (e.key === 's' && player1Y < canvas.height - paddleHeight) player1Y += 20;
  if (e.key === 'ArrowUp' && player2Y > 0) player2Y -= 20;
  if (e.key === 'ArrowDown' && player2Y < canvas.height - paddleHeight) player2Y += 20;
});

// Boucle de jeu
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= canvas.height - ballSize) ballSpeedY = -ballSpeedY;

  if (
    (ballX <= paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) ||
    (ballX >= canvas.width - paddleWidth - ballSize && ballY > player2Y && ballY < player2Y + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  // Draw ball
  ctx.fillStyle = 'white';
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Draw paddles
  ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

  requestAnimationFrame(gameLoop);
}

gameLoop();
