const gameArea = document.getElementById("game-area");
const resetButton = document.getElementById("reset");
const timerElement = document.getElementById("timer");
const sphere = document.getElementById("energy-sphere");

const novaMessages = [
  "Hâte-toi, explorateur, le flux s’emballe ! ⚡",
  "Bravo ! Encore quelques points et c’est gagné ! 🌟",
  "Dépêche-toi, la surcharge approche ! 🚨",
  "Nova croit en toi. Stabilise ce flux ! 🤖",
];

const points = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 350,
  y: Math.random() * 350,
  active: false,
}));

let timeLeft = 20; // Temps limite en secondes
let activePoints = 0; // Compteur de points activés
let timer;

// Générer les points énergétiques
function createPoints() {
  gameArea.innerHTML = ""; // Efface les anciens points
  activePoints = 0;

  points.forEach((point) => {
    const pointDiv = document.createElement("div");
    pointDiv.classList.add("point");
    pointDiv.style.top = `${point.y}px`;
    pointDiv.style.left = `${point.x}px`;
    pointDiv.addEventListener("click", () => handlePointClick(point, pointDiv));
    gameArea.appendChild(pointDiv);
  });
}

// Gérer le clic sur un point
function handlePointClick(point, element) {
  if (!point.active) {
    point.active = true;
    activePoints++;
    element.classList.add("active");

    if (activePoints === points.length) {
      novaMessage("Bravo, flux stabilisé !");
      updateSphereState("active");
      clearInterval(timer);
    } else {
      novaMessage("Bien joué, continue !");
    }
  }
}

// Mettre à jour la sphère en fonction de l’état
function updateSphereState(state) {
  sphere.classList.remove("active", "failed");
  if (state === "active") {
    sphere.classList.add("active");
  } else if (state === "failed") {
    sphere.classList.add("failed");
  }
}

// Gérer le chronomètre
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Temps restant : ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      novaMessage("Temps écoulé ! Le flux est hors de contrôle !");
      updateSphereState("failed");
    }
  }, 1000);
}

// Réinitialiser le jeu
function resetGame() {
  clearInterval(timer);
  timeLeft = 20;
  timerElement.textContent = `Temps restant : ${timeLeft}s`;
  points.forEach((point) => (point.active = false));
  createPoints();
  updateSphereState(""); // Réinitialiser la sphère
  startTimer();
  novaMessage("Stabilise le flux avant qu’il ne soit trop tard !");
}

// Mettre à jour le message de Nova
function novaMessage(message) {
  const novaText = document.getElementById("nova-message");
  novaText.textContent = message;
}

// Initialiser le jeu
resetButton.addEventListener("click", resetGame);
resetGame();
