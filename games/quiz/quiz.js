// Questions du quiz
const quizData = [
    {
      question: "Quelle est la saison la plus froide de l'année ?",
      answers: {
        a: "Printemps",
        b: "Été",
        c: "Hiver"
      },
      correct: "c"
    },
    {
      question: "Quel est le mois de l'hiver où les journées commencent à rallonger ?",
      answers: {
        a: "Décembre",
        b: "Janvier",
        c: "Février"
      },
      correct: "b"
    },
    {
      question: "Quelle fête est célébrée en hiver dans de nombreux pays ?",
      answers: {
        a: "Noël",
        b: "Pâques",
        c: "Halloween"
      },
      correct: "a"
    }
  ];
  
  // Sélection des éléments du DOM
  const quizContainer = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  const resultsContainer = document.getElementById("results");
  
  // Générer le quiz
  function generateQuiz() {
    const output = [];
  
    quizData.forEach((currentQuestion, questionIndex) => {
      const answers = [];
  
      for (const letter in currentQuestion.answers) {
        answers.push(
          `<li>
            <label>
              <input type="radio" name="question${questionIndex}" value="${letter}">
              ${letter}. ${currentQuestion.answers[letter]}
            </label>
          </li>`
        );
      }
  
      output.push(
        `<div class="question">
          <p>${currentQuestion.question}</p>
          <ul class="answers">${answers.join("")}</ul>
        </div>`
      );
    });
  
    quizContainer.innerHTML = output.join("");
  }
  
  // Afficher les résultats
  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let score = 0;
  
    quizData.forEach((currentQuestion, questionIndex) => {
      const answerContainer = answerContainers[questionIndex];
      const selector = `input[name=question${questionIndex}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      if (userAnswer === currentQuestion.correct) {
        score++;
      }
    });
  
    resultsContainer.innerHTML = `Vous avez obtenu ${score} sur ${quizData.length} bonnes réponses !`;
  }
  
  // Générer le quiz et ajouter un écouteur d'événements au bouton
  generateQuiz();
  submitButton.addEventListener("click", showResults);
  