console.log("Le fichier JavaScript est correctement chargé.");

function unlockGame(gameId, gameLink) {
  const code = prompt("Entrez le code pour déverrouiller ce jeu :");
  const validCodes = {
    pong: "0000",
    quiz: "0000",
    memory: "0000",
    flappy: "0000",
    maze: "0000",
    penguin: "0000"
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
