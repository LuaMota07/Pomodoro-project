const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const messageEl = document.querySelector(".app-message");

const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");

const modeButtons = document.querySelectorAll(".mode");

let timer;
let time = 25 * 60; 
let isRunning = false;

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}


function startTimer() {
  if (isRunning) return;
  isRunning = true;

  messageEl.textContent = "Em andamento...";

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      messageEl.textContent = "Tempo finalizado!";
    }
  }, 1000);
}


function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  messageEl.textContent = "Pausado";
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;

  const activeMode = document.querySelector(".mode.active");
  const minutes = activeMode.dataset.time;

  time = minutes * 60;
  updateDisplay();
  messageEl.textContent = "Resetado";
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    clearInterval(timer);
    isRunning = false;

    const minutes = button.dataset.time;
    time = minutes * 60;
    updateDisplay();

    const type = button.dataset.type;
    if (type === "focus") messageEl.textContent = "Modo Foco";
    if (type === "short-break") messageEl.textContent = "Pausa curta";
    if (type === "long-break") messageEl.textContent = "Pausa longa";
  });
});


startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
