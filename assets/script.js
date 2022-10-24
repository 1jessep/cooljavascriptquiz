//quiz questions and correct answers.

const quizData = [
  {
    question: "Which HTML element do we put Javascript inside?",
    a: "<h1>",
    b: "<css>",
    c: "<body>",
    d: "<script>",
    correct: "d",
  },
  {
    question:
      "What can you type to store something in the Console on a webpage?",
    a: "getElementbyId",
    b: "console.log()",
    c: "clearIntervavl",
    d: "script",
    correct: "b",
  },
  {
    question: "Who created Javascript language?",
    a: "Brendan Eich",
    b: "Thomas Jefferson",
    c: "Steve Jobs",
    d: "Elon Musk",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start-btn");
var time = 75;
var timerEl = document.getElementById("time");
var clock;
let currentQuiz = 0;
let score = 0;
var finalScore;

//loads quiz after user clicks start and each time the user picks a answer and clicks submit inside quiz container a new question pops up.

loadQuiz();
function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}
function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}
function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

//the submit button for each question triggers an event that proceeds to the next question as well as adds to the score of the user.
submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      //each time user picks correct answer score is added. if they get a question wrong the timer deducts 10 seconds from timer.
      score++;
    } else {
      time -= 10;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      clearInterval(clock);
      finalScore = 100 * (score / quizData.length); //this is how the users final score is computed. then they are presented with the number of questions they got right along with their score and asked to enter/submit initials and reload the quiz if they so choose.
      quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <h2>Your final score is ${finalScore}.</h2>
            <label for="initialsinput">Enter your initials</label>
            <input type="text" name="initials" id="initialsinput">
            <button id="saveScore">Submit</button>
            <button onclick="location.reload()">Reload</button>
           `;
      const saveScoreBtn = document.getElementById("saveScore");
      saveScoreBtn.addEventListener("click", saveScore);
    }
  }
});

startBtn.addEventListener("click", function () {
  document.querySelector(".quiz-container").classList.remove("hide");
  document.querySelector(".start").setAttribute("class", "hide");
  clock = setInterval(decrementTime, 1000);
});

function decrementTime() {
  //this is how the timer was created and prevents time from going below zero. also prompts an Alert letting the user know they ran out of time.
  time--;
  timerEl.textContent = "timer: " + time;
  if (time < 0) {
    clearInterval(clock);
    window.alert("You ran out of time, friend!");
    window.location.reload();
  }
}

function saveScore() {
  //this is where I am having trouble and this section is not finished. I am trying to store initials into local storage which then shows on the highscores.html page.
  console.log("hello");
  const initialsInput = document.getElementById("initialsinput").value;
  console.log(initialsInput);
  const highScores = localStorage.getItem("initials") || [];
  console.log(highScores);

  highScores.push(`${initialsInput}-${finalScore}`);
  localStorage.setItem("initials", highScores);
}
