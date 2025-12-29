const bells = new Audio("./sounds/bell.wav");

const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const messageEl = document.querySelector(".app-message");

const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");

// Tempos da técnica Pomodoro (em segundos)
const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

let totalSeconds = WORK_TIME;
let interval = null;
let isRunning = false;
let pomodoroCount = 0;
let mode = "work"; // work | shortBreak | longBreak

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  messageEl.textContent =
    mode === "work" ? "focus time 🍅" : "break time ☕";

  interval = setInterval(() => {
    totalSeconds--;
    updateDisplay();

    if (totalSeconds === 0) {
      bells.play();
      clearInterval(interval);
      isRunning = false;
      nextPhase();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  messageEl.textContent = "paused";
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  mode = "work";
  pomodoroCount = 0;
  totalSeconds = WORK_TIME;
  messageEl.textContent = "press start to begin";
  updateDisplay();
}

function nextPhase() {
  if (mode === "work") {
    pomodoroCount++;

    if (pomodoroCount % 4 === 0) {
      mode = "longBreak";
      totalSeconds = LONG_BREAK;
      messageEl.textContent = "long break 🛌";
    } else {
      mode = "shortBreak";
      totalSeconds = SHORT_BREAK;
      messageEl.textContent = "short break ☕";
    }
  } else {
    mode = "work";
    totalSeconds = WORK_TIME;
    messageEl.textContent = "back to focus 🍅";
  }

  updateDisplay();
  startTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
