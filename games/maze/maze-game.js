// Variables de jeu
const player = document.getElementById("player");
const exit = document.getElementById("exit");
const mazeContainer = document.getElementById("maze-container");
const message = document.getElementById("message");
const obstacles = document.querySelectorAll(".obstacle"); // Sélectionner tous les obstacles

let playerPosition = { x: 10, y: 10 };

// Définir la taille du labyrinthe
const mazeSize = 300;
const stepSize = 10;

// Fonction pour vérifier la collision avec un obstacle
function checkCollision(x, y) {
  for (let obstacle of obstacles) {
    const obsX = parseInt(obstacle.style.left);
    const obsY = parseInt(obstacle.style.top);
    
    if (x < obsX + 20 && x + 20 > obsX && y < obsY + 20 && y + 20 > obsY) {
      return true; // Collision avec un obstacle
    }
  }
  return false; // Pas de collision
}

// Mouvements du joueur avec la souris
mazeContainer.addEventListener("mousemove", (e) => {
  let mouseX = e.clientX - mazeContainer.offsetLeft;
  let mouseY = e.clientY - mazeContainer.offsetTop;

  // Calculer la nouvelle position du joueur
  let deltaX = mouseX - playerPosition.x;
  let deltaY = mouseY - playerPosition.y;

  if (Math.abs(deltaX) > stepSize || Math.abs(deltaY) > stepSize) {
    // Appliquer les mouvements, vérifier les collisions avec les obstacles
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      newX += deltaX > 0 ? stepSize : -stepSize;
    } else {
      newY += deltaY > 0 ? stepSize : -stepSize;
    }

    // Vérifier la collision avant de déplacer le joueur
    if (!checkCollision(newX, newY)) {
      playerPosition.x = newX;
      playerPosition.y = newY;
      player.style.left = `${playerPosition.x}px`;
      player.style.top = `${playerPosition.y}px`;
    }
    
    // Vérifier la collision avec la sortie
    checkWin();
  }
});

// Vérifier si le joueur atteint la sortie
function checkWin() {
  if (Math.abs(playerPosition.x - parseInt(exit.style.left)) < 20 &&
      Math.abs(playerPosition.y - parseInt(exit.style.top)) < 20) {
    message.textContent = "Félicitations, vous avez trouvé la sortie !";
  }
}
