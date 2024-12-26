const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 50, size: 20 };
let connections = [
  { x: 50, y: 50, width: 40, height: 40, active: false },
  { x: 150, y: 100, width: 40, height: 40, active: false },
  { x: 250, y: 50, width: 40, height: 40, active: false },
  { x: 350, y: 150, width: 40, height: 40, active: false },
  { x: 450, y: 100, width: 40, height: 40, active: false },
  { x: 100, y: 200, width: 40, height: 40, active: false },
  { x: 200, y: 250, width: 40, height: 40, active: false },
  { x: 300, y: 300, width: 40, height: 40, active: false },
  { x: 400, y: 350, width: 40, height: 40, active: false },
  { x: 500, y: 300, width: 40, height: 40, active: false },
];
let sequence = [];
let playerSequence = [];
let gameStatus = "Activez toutes les connexions dans le bon ordre !";
let timeLeft = 30;

function drawPlayer() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawConnections() {
  connections.forEach((connection, index) => {
    ctx.fillStyle = connection.active ? "green" : "red";
    ctx.fillRect(connection.x, connection.y, connection.width, connection.height);
    ctx.strokeStyle = "white";
    ctx.font = "16px Arial";
    ctx.strokeText(index + 1, connection.x + 10, connection.y + 30);
  });
}

function generateSequence() {
  sequence = connections.map((_, index) => index);
}

function checkCollision(player, connection) {
  return (
    player.x < connection.x + connection.width &&
    player.x + player.size > connection.x &&
    player.y < connection.y + connection.height &&
    player.y + player.size > connection.y
  );
}

function handleCollision(index) {
  if (index === sequence[playerSequence.length]) {
    connections[index].active = true;
    playerSequence.push(index);

    if (playerSequence.length === sequence.length) {
      gameStatus = "Centrale redémarrée avec succès !";
      clearInterval(timer);
    }
  } else {
    gameStatus = "Surcharge détectée ! Vous avez échoué.";
    clearInterval(timer);
  }
}

function movePlayer(dx, dy) {
  if (gameStatus !== "Activez toutes les connexions dans le bon ordre !") return;

  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x + dx));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y + dy));

  connections.forEach((connection, index) => {
    if (checkCollision(player, connection) && !connection.active) {
      handleCollision(index);
    }
  });

  draw();
}

function startTimer() {
  const timerElement = document.getElementById("timer");
  const interval = setInterval(() => {
    timeLeft -= 1;
    timerElement.textContent = `Temps restant : ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      gameStatus = "Temps écoulé ! Vous avez échoué.";
      draw();
    }
  }, 1000);
  return interval;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawConnections();
  document.getElementById("status").textContent = gameStatus;
}

// Initialisation
generateSequence();
draw();
const timer = startTimer();

// Gestion des touches directionnelles
window.addEventListener("keydown", (e) => {
  const speed = 20;
  switch (e.key) {
    case "ArrowUp":
      movePlayer(0, -speed);
      break;
    case "ArrowDown":
      movePlayer(0, speed);
      break;
    case "ArrowLeft":
      movePlayer(-speed, 0);
      break;
    case "ArrowRight":
      movePlayer(speed, 0);
      break;
  }
});

// Gestion des interactions tactiles
let startX, startY;

canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

canvas.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    movePlayer(dx > 0 ? 20 : -20, 0);
  } else {
    movePlayer(0, dy > 0 ? 20 : -20);
  }

  startX = touch.clientX;
  startY = touch.clientY;
});
