// Start screen with button
let startEl = document.querySelector(`.start-btn`);
let timerEl = document.querySelector(`.timer`);
let questionEl = document.querySelector(`.question`);
let buttonsEl = document.querySelector(`.answer-btns`);
let answerButtonEl = document.getElementsByClassName(`btns`);
let headerEl = document.querySelector(`#ready`);
let submitButtonEl = document.createElement(`button`);
let timeLeft = 100;
let questionNum = 0;
let highscores = 0;

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
  timerEl.textContent = `You have ${timeLeft} seconds to finish`;

  let timeInterval = setInterval(() => {
    if (timeLeft > -1) {
      timerEl.textContent = `${timeLeft}`;
      timeLeft--;
    } else if (timeLeft <= 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
  askNextQuestion();
}

// create a input function so the user's initials are the key to the localStorage
function userSignature() {
  // console.log(score);
  let inputEl = document.createElement(`input`);
  inputEl.classList.add(`initials`);

  questionEl.textContent = `Enter your initials:`;
  submitButtonEl.textContent = `Submit`;
  submitButtonEl.classList.add(`submit-btn`);

  document.querySelector(`.question`).appendChild(inputEl);
  document.querySelector(`.container`).appendChild(submitButtonEl);

  submitButtonEl.addEventListener(`click`, function () {
    if (inputEl.value === ``) {
      alert(`You must fill out the textbox!`);
    } else {
      localStorage.setItem(inputEl.value, score);
      console.log(inputEl.value);
    }
  });
}

// userSignature();

function endQuiz() {
  timerEl.classList.add(`hide`);
  buttonsEl.classList.add(`hide`);

  score = timeLeft;
  timeLeft = 0;
  let highscore = localStorage.getItem(`highscore`);
  if (highscore === null) {
    localStorage.setItem(`highscore`, score);
    questionEl.textContent = `New score of ${score}pts!`;
  } else if (score > parseInt(highscore)) {
    localStorage.setItem(`highscore`, score);
    questionEl.textContent = `New Highscore! ${score}pts`;
  } else {
    questionEl.textContent = `You got a score of ${score}pts!`;
  }

  let acknowledgeButtonEl = document.createElement('button');
  questionEl.appendChild(acknowledgeButtonEl);

  acknowledgeButtonEl.classList.add(`submit-btn`);
  acknowledgeButtonEl.textContent = `Submit Score!`;
  acknowledgeButtonEl.addEventListener(`click`, userSignature);
}

function saveScore() {
  let highscore = localStorage.getItem(`highscores`);
  if (score > parseInt(highscore)) {
    localStorage.setItem(`highscore`, score);
    highscore = localStorage.getItem(`highscore`);
  }
}

function startQuiz() {
  countdown();
  startEl.classList.add(`hide`);
  headerEl.classList.add(`hide`);
  buttonsEl.classList.remove(`hide`);
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
    document.querySelector(`.container`).classList.add(`correct`);
    setInterval(() => {
      document.querySelector(`.container`).classList.remove(`correct`);
    }, 350);
    console.log(`nice`);
  } else {
    console.log(`wrong`);
    document.querySelector(`.container`).classList.add(`wrong`);
    setInterval(() => {
      document.querySelector(`.container`).classList.remove(`wrong`);
    }, 350);
    timeLeft -= 20;
  }
  questionNum++;
  if (questions[questionNum] === undefined) {
    endQuiz();
  } else {
    askNextQuestion();
  }
}

// display highscore from localStorage

// view high scores in another html page

// console.log(startEl);
startEl.addEventListener(`click`, startQuiz);
