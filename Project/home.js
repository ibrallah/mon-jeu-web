function startAdventure() {
  window.location.href = "game.html"; // Redirige vers la première page de l'aventure
}

const novaMessages = [
  "Prêt pour l'aventure ? Je suis là pour t'aider ! 🚀",
  "N'oublie pas, chaque choix compte ! ✨",
  "Une galaxie d'énigmes t'attend. Courage, aventurier ! 🌌",
  "Nova est impressionnée par ton courage !",
  "Souviens-toi, la persévérance est la clé ! 🔑",
  "Si tu te perds, je serai là pour toi ! 🌟",
  "Fais de ton mieux, je suis fière de toi ! 🧡",
];

function updateNovaMessage() {
  const randomIndex = Math.floor(Math.random() * novaMessages.length);
  document.getElementById("nova-message").innerText = novaMessages[randomIndex];
}

// Met à jour le message toutes les 5 secondes
setInterval(updateNovaMessage, 5000);
