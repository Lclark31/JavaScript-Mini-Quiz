// Start screen with button
let startEl = document.querySelector(`.start-btn`);
let timerEl = document.querySelector(`.timer`);
let questionEl = document.querySelector(`.question`);
let buttonsEl = document.querySelector(`.answer-btns`);
let answerButtonEl = document.getElementsByClassName(`btn`);

let questions = [
  {
    question: `what is 2 plus 2?`,
    options: [`1`, `2`, `3`, `4`],
    correctAnswer: 2,
  },
  {
    question: `what is 2 plus 1?`,
    options: [`1`, `2`, `3`, `4`],
    correctAnswer: 2,
  },
  {
    question: `what is 1 plus 3?`,
    options: [`1`, `2`, `3`, `5`],
    correctAnswer: 2,
  },
];

function countdown() {
  let timeLeft = 3;

  let timeInterval = setInterval(() => {
    if (timeLeft > -1) {
      timerEl.textContent = `${timeLeft}`;
      timeLeft--;
    } else if (timeLeft <= 0) {
      clearInterval(timeInterval);
      //   endQuiz();
    }
  }, 1000);
}

// question with four buttons

// define startQuiz
function startQuiz() {
  countdown();
  startEl.classList.add(`hide`);
  buttonsEl.classList.remove(`hide`);

  let askQuestion = questions[0].question;
  questionEl.textContent = askQuestion;
  let answers = questions[0].options;
  answerButtonEl[0].textContent = answers[3];

  //   for (let i = 0; i < questions.length; i++) {
  //     let askQuestion = questions[i].question;
  //     questionEl.textContent = askQuestion;
  //     let answers = questions[i].options;
  //     answerButtonEl[i].textContent = answers;
  //   }
}
// display correct or incorrect

// subtract time if answer is incorrect

// let the user save their score

// display highscore from localStorage

// define endQuiz()
// view high scores in another html page

// console.log(startEl);
startEl.addEventListener(`click`, startQuiz);
