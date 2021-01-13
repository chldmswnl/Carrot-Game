"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const bug_count = 10;
const gameDuration = 10;
const carrot_count = 10;

const playBtn = document.querySelector(".playbtn");
const gameTimer = document.querySelector(".timer");
const carrotNum = document.querySelector(".carrotNum");

let started = false;
let score = 0;
let timer = undefined;

const gameField = new Field(carrot_count, bug_count);
const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListener(() => {
  showStartButton();
  startGame();
});

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === carrot_count) {
      finishGame(true);
    }
  } else if (item === "bug") {
    stopGameTimer();
    finishGame(false);
  }
}

function finishGame(win) {
  started = false;
  hideStartButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? "YOU WON 🎉" : "YOU LOST 💩");
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
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideStartButton();
  gameFinishBanner.showWithText("Replay? 😉");
  sound.playAlert();
  sound.stopBackground();
}

function showStopButton() {
  const icon = playBtn.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function initGame() {
  score = 0;
  carrotNum.innerText = carrot_count;
  gameField.init();
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  carrotNum.style.visibility = "visible";
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
