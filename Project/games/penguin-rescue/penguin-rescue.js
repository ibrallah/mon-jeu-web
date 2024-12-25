// Variables pour l'énigme
const encryptedMessage = "Gjxtns i’éjnj. Ifsljw nrnnsjy.";
const correctAnswer = "Besoin d’aide. Danger imminent.";

document.getElementById("encryptedMessage").textContent = encryptedMessage;

function checkDecryption() {
  const userInput = document.getElementById("userInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
    resultDiv.textContent = "Félicitations ! Vous avez décrypté le message.";
    resultDiv.style.color = "#2ecc71";
  } else {
    resultDiv.textContent = "Dommage, ce n'est pas la bonne réponse.";
    resultDiv.style.color = "#e74c3c";
  }
}

// Fonction pour le chatbot
function sendMessage() {
  const userInput = document.getElementById("chatbot-input").value.trim();
  const messages = document.getElementById("chatbot-messages");

  if (userInput) {
    const userMessage = document.createElement('p');
    userMessage.innerHTML = `<strong>Vous :</strong> ${userInput}`;
    messages.appendChild(userMessage);

    const botMessage = document.createElement('p');
    if (userInput.toLowerCase().includes("indice")) {
      botMessage.innerHTML = "<strong>Bot :</strong> Voici un indice : pensez à un besoin urgent.";
    } else {
      botMessage.innerHTML = "<strong>Bot :</strong> Désolé, je ne comprends pas encore tout. Réessayez ou demandez un indice.";
    }

    messages.appendChild(botMessage);
    document.getElementById('chatbot-input').value = "";
    messages.scrollTop = messages.scrollHeight;
  }
}
