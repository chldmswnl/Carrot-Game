"use strict";

const carrot_size = 80;
const bug_count = 5;
const gameDuration = 5;
const carrot_count = 5;

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector(".playbtn");
const gameTimer = document.querySelector(".timer");
const carrotNum = document.querySelector(".carrotNum");
const popup = document.querySelector(".pop_up");
const popupBtn = document.querySelector(".popupBtn");
const popupText = document.querySelector(".popupText");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");

let started = false;
let score = 0;
let timer = undefined;

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popupBtn.addEventListener("click", () => {
  hidePopup();
  showStartButton();
  startGame();
});

field.addEventListener("click", onFieldClick);

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  console.log(target);
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === carrot_count) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    stopGameTimer();
    finishGame(false);
  }
}

function finishGame(win) {
  started = false;
  hideStartButton();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopSound(bgSound);
  showPopupWithText(win ? "YOU WON 🎉" : "YOU LOST 💩");
  stopGameTimer();
}

function updateScoreBoard() {
  carrotNum.innerText = carrot_count - score;
}

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideStartButton();
  showPopupWithText("Replay? 😉");
  playSound(alertSound);
  stopSound(bgSound);
}

function showStopButton() {
  const icon = playBtn.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function initGame() {
  score = 0;
  field.innerHTML = "";
  carrotNum.innerText = carrot_count;
  addItem("carrot", carrot_count, "img/carrot.png");
  addItem("bug", bug_count, "img/bug.png");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  carrotNum.style.visibility = "visible";
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - carrot_size;
  const y2 = fieldRect.height - carrot_size;

  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function startGameTimer() {
  let remainingTime = gameDuration;
  updateTimerText(remainingTime);
  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(sec) {
  const min = Math.floor(sec / 60);
  const secs = sec % 60;

  gameTimer.innerText = `${min}:${secs}`;
}

function hideStartButton() {
  playBtn.style.visibility = "hidden";
}

function showStartButton() {
  playBtn.style.visibility = "visible";
  const icon = playBtn.querySelector(".fa-stop");
  icon.classList.add("fa-play");
  icon.classList.remove("fa-stop");
}

function showPopupWithText(text) {
  popup.classList.remove("popUp_hide");
  popupText.innerText = text;
}

function hidePopup() {
  popup.classList.add("popUp_hide");
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
