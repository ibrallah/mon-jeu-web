// Variables de jeu
const penguin = document.getElementById("penguin");
const goal = document.getElementById("goal");
const gameContainer = document.getElementById("game-container");
const message = document.getElementById("message");
const obstacles = document.querySelectorAll(".obstacle");

let penguinPosition = { x: 20, y: 20 };

// Taille du jeu
const gameSize = 400;
const stepSize = 10;

// Fonction pour vérifier la collision avec un obstacle
function checkCollision(x, y) {
  for (let obstacle of obstacles) {
    const obsX = parseInt(obstacle.style.left);
    const obsY = parseInt(obstacle.style.top);
    
    if (x < obsX + 30 && x + 30 > obsX && y < obsY + 30 && y + 30 > obsY) {
      return true; // Collision avec un obstacle
    }
  }
  return false; // Pas de collision
}

// Fonction pour vérifier si le joueur a atteint l'objectif
function checkGoal() {
  const goalX = parseInt(goal.style.left);
  const goalY = parseInt(goal.style.top);

  if (Math.abs(penguinPosition.x - goalX) < 30 && Math.abs(penguinPosition.y - goalY) < 30) {
    message.textContent = "Félicitations ! Vous avez sauvé le pingouin !";
  }
}

// Déplacer le pingouin avec la souris
gameContainer.addEventListener("mousemove", (e) => {
  let mouseX = e.clientX - gameContainer.offsetLeft;
  let mouseY = e.clientY - gameContainer.offsetTop;

  // Calculer la direction du mouvement
  let deltaX = mouseX - penguinPosition.x;
  let deltaY = mouseY - penguinPosition.y;

  if (Math.abs(deltaX) > stepSize || Math.abs(deltaY) > stepSize) {
    let newX = penguinPosition.x;
    let newY = penguinPosition.y;

    // Déplacement du pingouin selon la direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      newX += deltaX > 0 ? stepSize : -stepSize;
    } else {
      newY += deltaY > 0 ? stepSize : -stepSize;
    }

    // Vérifier la collision avant de déplacer le pingouin
    if (!checkCollision(newX, newY)) {
      penguinPosition.x = newX;
      penguinPosition.y = newY;
      penguin.style.left = `${penguinPosition.x}px`;
      penguin.style.top = `${penguinPosition.y}px`;
    }

    // Vérifier si le joueur atteint l'objectif
    checkGoal();
  }
});
