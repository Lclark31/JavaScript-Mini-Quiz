// Start screen with button
let startEl = document.querySelector(`.start-btn`);
let timerEl = document.querySelector(`.timer`);
let questionEl = document.querySelector(`.question`);
let buttonsEl = document.querySelector(`.answer-btns`);
let answerButtonEl = document.getElementsByClassName(`btns`);
let headerEl = document.querySelector(`#ready`);

let questions = [
  {
    question: `what is 2 plus 2?`,
    options: [`1`, `2`, `3`, `4`],
    correctAnswer: `4`,
  },
  {
    question: `what is 2 plus 1?`,
    options: [`1`, `2`, `3`, `4`],
    correctAnswer: `3`,
  },
  {
    question: `what is 1 plus 4?`,
    options: [`1`, `2`, `3`, `5`],
    correctAnswer: `5`,
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

let questionNum = 0;

function endQuiz() {
  console.log(`out of questions`);
}
// define startQuiz
function startQuiz() {
  countdown();
  startEl.classList.add(`hide`);
  headerEl.classList.add(`hide`);
  buttonsEl.classList.remove(`hide`);
  askNextQuestion();
}

function askNextQuestion() {
  let askQuestion = questions[questionNum].question;
  questionEl.textContent = askQuestion;
  let answers = questions[questionNum].options;
  for (let i = 0; i < questions[questionNum].options.length; i++) {
    answerButtonEl[i].textContent = answers[i];
  }

  for (i = 0; i < answerButtonEl.length; i++) {
    answerButtonEl[i].setAttribute(`id`, i);
    answerButtonEl[i].addEventListener(`click`, checkAnswer);
  }
}

function checkAnswer() {
  let correct = questions[questionNum].correctAnswer;
  let selectedButton = event.target;
  if (selectedButton.textContent === correct) {
    console.log(`nice`);
  } else {
    console.log(`wrong`);
  }
  questionNum++;
  askNextQuestion();
}
// display correct or incorrect

// subtract time if answer is incorrect

// let the user save their score

// display highscore from localStorage

// define endQuiz()
// view high scores in another html page

// console.log(startEl);
startEl.addEventListener(`click`, startQuiz);
