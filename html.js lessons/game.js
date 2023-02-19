//game.js
console.log("hello game :)");
const question = document.getElementById("question");
console.log(question);
const choices = Array.from(document.getElementsByClassName("choice-text")); // convert to array
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(
  // from open trivia database
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then(res => {
    // console.log(res);
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      }; // we take an object wit question property coming from loaded question, every time we map we're taking the original question we are formating and then we have the arrya of questions that we need
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      // the correct choice in random index between 0-3
      return formattedQuestion;
    });
//questions = loadedQuestions;

startGame();
  })
  .catch(err => {
    console.error(err);
  });

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; // take this array spray spread out each of its items and put them into a new array, εἶναι ἐνα ἀντίγραφο μετετρεφθέντος σε σειρά, τοῦ παραπάνω ἀντικειμένου με τἀς περιγραφἀς των κόμβων και ἐπικεφαλίδων ἂμφω
  console.log(availableQuestions);
  getNewQuestion();
  game.classList.remove("hidden"); 
loader.classList.add("hidden");
};
getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score); // score save
    // go to the end page
    return window.location.assign("/end.html");
  }
  // arrow syntax function
  questionCounter++;

  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  //console.log(progressText);
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question; // the inner text of html element is the current question, the question we just loaded and is the question property

  choices.forEach(choice => {
    const number = choice.dataset["number"]; //loop over the choices array and show the number property
    choice.innerText = currentQuestion["choice" + number]; // the  content of the choice button is the current qustion-available question copy of questions with the particular question and number
    console.log(number);
  });
  availableQuestions.splice(questionIndex, 1); // we splice out the array 1, actually it takes the array and get rid of that question that we just used
  acceptingAnswers = true;
};
choices.forEach(choice => {
  // for each choice we click to the button of choices, if we dont get any answer it will show false, the choice we selected and the numer of the choice
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    //const classToApply = "incorrect";
    //if (selectedAnswer == currentQuestion.answer); // in string comparison we use double ==
    //{
    //classToApply = "correct";
    // }
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; // with turnary operator

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
