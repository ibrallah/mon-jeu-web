console.log("Le fichier JavaScript est correctement chargé.");

function unlockGame(gameId, gameLink) {
  const code = prompt("Entrez le code pour déverrouiller ce jeu :");
  const validCodes = {
    pong: "0007",
    quiz: "0007",
    memory: "0007",
    flappy: "0007",
    maze: "0007",
    penguin: "0007"
  };

  if (code === validCodes[gameId]) {
    document.getElementById(`lock-${gameId}`).style.display = "none"; // Supprime le verrouillage visuel
    const playButton = document.getElementById(`link-${gameId}`);
    playButton.classList.remove("locked"); // Déverrouille le bouton
    alert(`Le jeu "${gameId}" est maintenant déverrouillé !`);
  } else {
    alert("Code incorrect, veuillez réessayer.");
  }
}
