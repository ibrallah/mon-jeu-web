const memoryGame = document.getElementById("memory-game");
const resetButton = document.getElementById("reset");

const cards = [
  "❄️", "⛄", "🎄", "🎁", "🌟", "🦌", "🍪", "🔥",
  "❄️", "⛄", "🎄", "🎁", "🌟", "🦌", "🍪", "🔥"
];

// Mélanger les cartes
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Générer les cartes
function generateCards() {
  const shuffledCards = shuffle([...cards]);
  memoryGame.innerHTML = "";

  shuffledCards.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">${symbol}</div>
      <div class="back">❄️</div>
    `;
    card.addEventListener("click", flipCard);
    memoryGame.appendChild(card);
  });
}

let flippedCards = [];
let matchedPairs = 0;

// Gérer le clic sur une carte
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains("flip")) {
    return;
  }

  this.classList.add("flip");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Vérifier si les cartes correspondent
function checkMatch() {
  const [card1, card2] = flippedCards;
  const symbol1 = card1.querySelector(".front").textContent;
  const symbol2 = card2.querySelector(".front").textContent;

  if (symbol1 === symbol2) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === cards.length / 2) {
      setTimeout(() => alert("Bravo ! Vous avez trouvé toutes les paires !"), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flippedCards = [];
    }, 1000);
  }
}

// Réinitialiser le jeu
function resetGame() {
  flippedCards = [];
  matchedPairs = 0;
  generateCards();
}

// Initialiser le jeu
resetButton.addEventListener("click", resetGame);
generateCards();
