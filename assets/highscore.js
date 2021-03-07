var restartBtn = document.querySelector("#restart-Btn");
var clearBtn = document.querySelector("#clear-Btn");
var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
var listScores = document.getElementById("score-list")

// sorts scores from high to low
highScores.sort(function (a, b) {
    return b.score - a.score;
})

for (var i = 0; i < highScores.length; i++) {
    var newLi = document.createElement("li");
    newLi.textContent = highScores[i].name + "  -  " + highScores[i].score;
    listScores.appendChild(newLi);
}

// clear and restart buttons
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

restartBtn.addEventListener("click", function() {
    window.location.replace("index.html");
});