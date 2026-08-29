let homeScore = document.getElementById("home-score")
let visitorScore = document.getElementById("visitor-score")
let timerEl = document.getElementById("timer")
let seconds = 0
let timerInterval

/*function plus1Home() {
    score = parseInt(homeScore.textContent)
    score += 1
    homeScore.textContent = score
}

function plus2Home() {
    score = parseInt(homeScore.textContent)
    score += 2
    homeScore.textContent = score
}


function plus3Home() {
    score = parseInt(homeScore.textContent)
    score += 3
    homeScore.textContent = score
}

function plus1Visitor() {
    score = parseInt(visitorScore.textContent)
    score += 1
    visitorScore.textContent = score
}

function plus2Visitor() {
    score = parseInt(visitorScore.textContent)
    score += 2
    visitorScore.textContent = score
}

function plus3Visitor() {
    score = parseInt(visitorScore.textContent)
    score += 3
    visitorScore.textContent = score
}
*/
function updateTimerDisplay() {
    let minutes = Math.floor(seconds / 60)
    let remainingSeconds = seconds % 60
    let minutesStr = String(minutes).padStart(2, "0")
    let secondsStr = String(remainingSeconds).padStart(2, "0")
    timerEl.textContent = minutesStr + ":" + secondsStr
}

function tick() {
    seconds += 1
    updateTimerDisplay()
}

function startTimer() {
    timerInterval = setInterval(tick, 1000)
}

function newGame() {
    homeScore.textContent = "0"
    visitorScore.textContent = "0"
    seconds = 0
    updateTimerDisplay()
    clearInterval(timerInterval)
    startTimer()
}

function addScore(btn, amount) {
    let pEl = btn.parentElement.querySelector("p")
    let score = parseInt(pEl.textContent)
    score += amount
    pEl.textContent = score
}