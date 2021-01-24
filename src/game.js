"use strict";
import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});
//Builder Pattern
export class GameBuilder {
  withGameDuration(duration) {
    this.gameTime = duration;
    return this; // return class
  }

  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(this.gameTime, this.carrotCount, this.bugCount);
  }
}
class Game {
  constructor(gameTime, carrotCount, bugCount) {
    this.gameTime = gameTime;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.playBtn = document.querySelector(".playbtn");
    this.gameTimer = document.querySelector(".timer");
    this.carrotNum = document.querySelector(".carrotNum");
    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
  }
  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideStartButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stopGameTimer();
      this.stop(Reason.lose);
    }
  };
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  updateScoreBoard() {
    this.carrotNum.innerText = this.carrotCount - this.score;
  }

  showStopButton() {
    const icon = this.playBtn.querySelector(".fa-play");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
  }

  initGame() {
    this.score = 0;
    this.carrotNum.innerText = this.carrotCount;
    this.gameField.init();
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.carrotNum.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTime = this.gameTime;
    this.updateTimerText(remainingTime);
    this.timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(this.timer);
        this.stop(Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTime);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(sec) {
    const min = Math.floor(sec / 60);
    const secs = sec % 60;

    this.gameTimer.innerText = `${min}:${secs}`;
  }

  hideStartButton() {
    this.playBtn.style.visibility = "hidden";
  }

  showStartButton() {
    this.playBtn.style.visibility = "visible";
    const icon = this.playBtn.querySelector(".fa-stop");
    icon.classList.add("fa-play");
    icon.classList.remove("fa-stop");
  }
}
