let startEl = document.querySelector(`.start-btn`);
let timerEl = document.querySelector(`.timer`);
let questionEl = document.querySelector(`.question`);
let buttonsEl = document.querySelector(`.answer-btns`);
let answerButtonEl = document.getElementsByClassName(`btns`);
let headerEl = document.querySelector(`#ready`);
let submitButtonEl = document.createElement(`button`);
let retakeButtonEl = document.querySelector(`.retake-btn`);
let highscorePage = document.querySelector(`.highscores`);
let timeLeft = 100;
let penalty = 10;
let questionNum = 0;
let highscores = 0;

let questions = [
  {
    question: `What element does javascript go in?`,
    options: [`<script>`, `<java>`, `<js>`, `All of the above`],
    correctAnswer: `<script>`,
  },
  {
    question: `If statements are enclosed with a ____?`,
    options: [`Bracket`, `Parenthesis`, `Curly brace`, `Semicolon`],
    correctAnswer: `Curly brace`,
  },
  {
    question: `If variables share a name, which takes precednece?`,
    options: [`Global variables`, `Local variables`, `Neither`, `Both`],
    correctAnswer: `Local variables`,
  },
  {
    question: `Which will create a new object?`,
    options: [`var obj = Object();`, `var obj = new obj();`, `var obj = new Object();`, `All of the above`],
    correctAnswer: `var obj = new Object();`,
  },
  {
    question: `Which will join all array elements into a string?`,
    options: [`concat()`, `join()`, `pop()`, `map()`],
    correctAnswer: `join()`,
  },
  {
    question: `How would you put an item in localStorage?`,
    options: [`localStorage.getItem()`, `localStorage.append()`, `localStorage.setItem()`, `localStorage.set()`],
    correctAnswer: `localStorage.setItem()`,
  },
];

function countdown() {
  questionEl.textContent = `Let's Begin!`;
  headerEl.textContent = `(You will lose ${penalty}pts for every wrong answer)`;
  timerEl.textContent = `You will have ${timeLeft}s to finish`;
  setTimeout(() => {
    headerEl.classList.add(`hide`);
    buttonsEl.classList.remove(`hide`);
    timerEl.textContent = `${timeLeft}s`;

    let timeInterval = setInterval(() => {
      if (questions[questionNum] === undefined) {
        clearInterval(timeInterval);
      }
      if (timeLeft > 0) {
        timerEl.textContent = `${timeLeft}s`;
        timeLeft--;
      } else if (timeLeft <= 0) {
        clearInterval(timeInterval);
        endQuiz();
      }
    }, 1000);
    askNextQuestion();
  }, 3500);
}

function userSignature() {
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
    } else if (inputEl.value.length > 10) {
      alert(`Initials are too long!`);
    } else {
      localStorage.setItem(inputEl.value, score);
      highscorePage.click();
      inputEl.value.reset();
    }
  });
  retakeButtonEl.classList.remove(`hide`);
}

function endQuiz() {
  timerEl.classList.add(`hide`);
  buttonsEl.classList.add(`hide`);

  score = timeLeft;
  let highscore = localStorage.getItem(`highscore`);
  if (highscore === null) {
    localStorage.setItem(`highscore`, score);
    questionEl.textContent = `New score of ${score} pts!`;
  } else if (score <= 0) {
    questionEl.textContent = `You got ${0} points`;
  } else if (score > parseInt(highscore)) {
    localStorage.setItem(`highscore`, score);
    questionEl.textContent = `New Highscore! ${score} pts`;
  } else {
    questionEl.textContent = `You got a score of ${score} pts!`;
  }

  let acknowledgeButtonEl = document.createElement('button');
  questionEl.appendChild(acknowledgeButtonEl);

  acknowledgeButtonEl.classList.add(`submit-btn`);
  acknowledgeButtonEl.textContent = `Submit Score!`;
  acknowledgeButtonEl.addEventListener(`click`, userSignature);
}

function startQuiz() {
  countdown();
  startEl.classList.add(`hide`);
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
    }, 500);
  } else {
    document.querySelector(`.container`).classList.add(`wrong`);
    setInterval(() => {
      document.querySelector(`.container`).classList.remove(`wrong`);
    }, 500);
    timeLeft -= penalty;
  }
  questionNum++;
  setTimeout(() => {
    if (questions[questionNum] === undefined) {
      endQuiz();
    } else {
      askNextQuestion();
    }
  }, 600);
}

startEl.addEventListener(`click`, startQuiz);

retakeButtonEl.addEventListener(`click`, function () {
  location.reload();
});
