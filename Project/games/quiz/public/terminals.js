const gameArea = document.getElementById("game-area");
const resetButton = document.getElementById("reset");
const novaMessages = [
  "Bien joué, explorateur ! Mais ne ralentis pas ! 🚀",
  "Attention, une erreur pourrait tout déclencher ! 🛑",
  "Nova est impressionnée par ta bravoure. Continue comme ça ! 💪",
  "Hmmm... Cette salle semble te surveiller. Reste prudent. 👀",
  "Tu es sur la bonne voie ! Ne perds pas de temps ! ⏳",
  "Nova te soutient à 100 %. Tu peux le faire ! 🤖",
];

const terminals = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  active: false,
}));

let sequence = [];
let playerSequence = [];
let errors = 0;
const maxErrors = 20;

// Mélanger les terminaux
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Générer l'ordre correct des terminaux
function generateSequence() {
  sequence = shuffle(terminals.map((t) => t.id));
  console.log("Ordre des terminaux :", sequence);
}

// Créer les éléments HTML pour les terminaux
function generateTerminals() {
  gameArea.innerHTML = "";
  terminals.forEach((terminal) => {
    const terminalDiv = document.createElement("div");
    terminalDiv.classList.add("terminal");
    terminalDiv.dataset.id = terminal.id;
    terminalDiv.textContent = terminal.id + 1;
    terminalDiv.addEventListener("click", () => handleTerminalClick(terminal.id, terminalDiv));
    gameArea.appendChild(terminalDiv);
  });
}

// Gérer le clic sur un terminal
function handleTerminalClick(id, element) {
  if (errors >= maxErrors) {
    novaMessage("Trop d'erreurs... Le système a échoué !");
    return;
  }

  if (id === sequence[playerSequence.length]) {
    element.classList.add("active");
    playerSequence.push(id);

    // Si tout est activé dans l'ordre
    if (playerSequence.length === sequence.length) {
      novaMessage("Bravo, explorateur ! Tu as réussi !");
    } else {
      novaMessage("Bien joué, continue !");
    }
  } else {
    errors++;
    if (errors >= maxErrors) {
      novaMessage("Trop d'erreurs... Le système a échoué !");
    } else {
      novaMessage(`Erreur détectée ! Essayez encore. Erreurs : ${errors}/${maxErrors}`);
    }
  }
}

// Réinitialiser le jeu
function resetGame() {
  playerSequence = [];
  errors = 0;
  generateSequence();
  generateTerminals();
  novaMessage("Je crois en toi, explorateur ! Active les terminaux.");
}

// Mettre à jour le message de Nova
function novaMessage(message) {
  const novaText = document.getElementById("nova-message");
  novaText.textContent = message;
}

// Initialiser le jeu
resetButton.addEventListener("click", resetGame);
generateSequence();
generateTerminals();
