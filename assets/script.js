var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var submitButton = document.getElementById("submit-btn");
var questionEl = document.getElementById("questions");
var answerEl = document.getElementById("answerButtons");
var timerEl = document.getElementById("timer");
var home = document.getElementById("home");
var quiz = document.getElementById("quiz");
var submitScore = document.getElementById("submitScore")

var timerLeft = 100;
var shuffleQuestions, currentQuestion, quizTime, userNameInput;
var rightAnswers = 0;

// getting start button to work to start quiz
startButton.addEventListener("click", startQuiz);

// getting next button to work
nextButton.addEventListener("click", () => {
    currentQuestion++;
    nextQuestion();
})
// getting submit button to work
submitButton.addEventListener("click", function(x) {
    x.stopPropagation();
    addScore();

    window.location.href = "highscore.html";
});

// starting the quiz
function startQuiz() {
    shuffleQuestions = question.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    rightAnswers = 0;
    home.classList.add("hide");
    quiz.classList.remove("hide");
    
    timeRemain();
    nextQuestion();
}

// setting up timer
function timeRemain () {
    quizTime = setInterval(() => {
        if (timerLeft > 0) {
            timerEl.textContent = "Time Left: " + timerLeft;
            timerLeft--;
        } else if (timerLeft === 0) {
            timerEl.textContent = "Time Left: " + timerLeft;
            timerLeft--;
        } else {
            endQuiz();
        }
    }, 1000);
}

function showQuestion(question) {
    questionEl.innerHTML = question.question;
    question.answer.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer);
        answerEl.appendChild(button);
    })
}

// next question
function nextQuestion () {
    resetState();
    showQuestion(shuffleQuestions[currentQuestion]);
}

// resets the quiz to default state
function resetState () {
    clearStatusClass(document.querySelector("main"));
    nextButton.classList.add("hide");
    while (answerEl.firstChild){
        answerEl.removeChild(answerEl.firstChild);
    }
}

// choosing answer
function chooseAnswer(x) {
    // users selected answer
    var selectedAnswer = x.target;
    var correct = selectedAnswer.dataset.correct;
    setStatusClass(document.querySelector("main"), correct);
    if (!correct) {
        timerLeft -= 20;
    }
    // checks other buttons to see if correct
    Array.from(answerEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffleQuestions.length > currentQuestion +1) {
        nextButton.classList.remove("hide");
    }
    else {
        endQuiz();
    }
    if (selectedAnswer.dataset = correct) {
        rightAnswers += 20;
    }
    document.getElementById("rightAnswers").innerHTML = rightAnswers;
}

// checks to see if answer is right or wrong
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    }
    else {
        element.classList.add("wrong")
    }
}

// clears right/wrong from answers
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function endQuiz() {
    quiz.classList.add("hide");
    submitScore.classList.remove("hide");
    clearInterval(quizTime);
}

// submitting score
function addScore () {
    userNameInput = document.getElementById("").value.trim()
    var newScore = {
        name: userNameInput,
        score: rightAnswers,
    };
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// high score page
var restartBtn = document.querySelector("#restartBtn");
var clearBtn = document.querySelector("#clearBtn");
var topScore = JSON.parse(localStorage.getItem("topScores") || "[]");
var listScores = document.getElementById("score-list")

// sorts scores from high to low
topScore.sort(function (a, b) {
    return b.score - a.score;
})

for (var i = 0; i < topScore.length; i++) {
    var newLi = document.createElement("li");
    newLi.textContent = topScore[i].name + "  -  " + topScore[i].score;
    listScores.appendChild(newLi);
}

clearBtn.addEventListener("click", function() {
    localStorage.clear();
    window.location.reload();
});

restartBtn.addEventListener("click", function() {
    location.href = "index.html";
});