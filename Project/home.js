document.addEventListener("DOMContentLoaded", () => {
    const novaMessages = [
      "Bienvenue dans une nouvelle aventure ! 🎉",
      "Nova est là pour vous guider ! 🚀",
      "Prêt pour l'inconnu ? Allons-y ! 🌌",
      "Cette aventure sera légendaire. Suivez-moi ! ✨"
    ];
  
    function updateNovaMessage() {
      const randomIndex = Math.floor(Math.random() * novaMessages.length);
      document.querySelector(".nova-chat p").innerHTML = `<strong>Nova :</strong> ${novaMessages[randomIndex]}`;
    }
  
    setInterval(updateNovaMessage, 10000);
  });
  