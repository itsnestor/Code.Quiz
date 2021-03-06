var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionEl = document.getElementById("questions");
var answerEl = document.getElementById("answerButtons");
var timerEl = document.getElementById("timer");
var home = document.getElementById("home");
var quiz = document.getElementById("quiz");
var submitScore = document.getElementById("submitScore")

var timerLeft = 100;
var shuffleQuestions, currentQuestion, quizTime, userName;
var rightAnswers = 0;

// getting start button to work to start quiz
startButton.addEventListener("click", startQuiz);
// getting next button to work
nextButton.addEventListener("click", () => {
    currentQuestion++

})
// starting the quiz
function startQuiz() {
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    rightAnswers = 0;
    home.classList.add("hide");
    quiz.classList.remove("hide");

    timeRemain();

}

// setting up timer
function timeRemain () {
    quizTime = setInterval(() => {
        if (timerLeft > 0) {
            timerEl.textContent = timerLeft;
            timerLeft--;
        } else if (timerLeft === 0) {
            timerEl.textContent = timerLeft;
            timerLeft--;
        } else {
            endQuiz();
        }
    }, 1000);
}