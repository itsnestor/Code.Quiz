var restartBtn = document.querySelector("#restart-Btn");
var clearBtn = document.querySelector("#clear-Btn");
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

// clear and restart buttons
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

restartBtn.addEventListener("click", function() {
    window.location.replace("index.html");
});