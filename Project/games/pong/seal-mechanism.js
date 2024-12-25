const gameArea = document.getElementById("game-area");
const resetButton = document.getElementById("reset");
const timerElement = document.getElementById("timer");
const novaMessages = [
  "Réfléchis bien, chaque rotation compte ! 🌀",
  "Bien joué ! Continue, le flux s'aligne. 🌟",
  "Le temps presse, garde ton calme ! ⏳",
  "Nova croit en toi. Finalise ce puzzle ! 🤖",
];

let timeLeft = 60;
let timer;
let segments = [];

// Générer les segments du puzzle
function createSegments() {
  segments = [];
  gameArea.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const rotation = Math.floor(Math.random() * 4) * 90; // Angle aléatoire (0°, 90°, 180°, 270°)
    const segment = document.createElement("div");
    segment.classList.add("segment");
    segment.innerHTML = `<img src="path.png" style="transform: rotate(${rotation}deg);" />`; // Chemin énergétique
    segment.dataset.rotation = rotation;
    segment.addEventListener("click", () => rotateSegment(segment));
    gameArea.appendChild(segment);
    segments.push(segment);
  }
}

// Gérer la rotation des segments
function rotateSegment(segment) {
  let currentRotation = parseInt(segment.dataset.rotation);
  currentRotation = (currentRotation + 90) % 360;
  segment.dataset.rotation = currentRotation;
  segment.querySelector("img").style.transform = `rotate(${currentRotation}deg)`;

  checkSolution();
}

// Vérifier si le puzzle est résolu
function checkSolution() {
  const allCorrect = segments.every((segment) => parseInt(segment.dataset.rotation) === 0);

  if (allCorrect) {
    novaMessage("Bravo, puzzle résolu !");
    clearInterval(timer);
  }
}

// Gérer le chronomètre
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Temps restant : ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      novaMessage("Temps écoulé ! Échec du scellement.");
    }
  }, 1000);
}

// Réinitialiser le jeu
function resetGame() {
  clearInterval(timer);
  timeLeft = 60;
  timerElement.textContent = `Temps restant : ${timeLeft}s`;
  createSegments();
  startTimer();
  novaMessage("Alignez les flux pour stabiliser la sphère !");
}

// Mettre à jour le message de Nova
function novaMessage(message) {
  const novaText = document.getElementById("nova-message");
  novaText.textContent = message;
}

// Initialiser le jeu
resetButton.addEventListener("click", resetGame);
resetGame();
