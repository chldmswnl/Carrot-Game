const playBtn = document.querySelector(".playbtn");
const timer = document.querySelector(".timer");
const popUp = document.querySelector(".pop_up");
const popupText = document.querySelector(".popupText");
const popupBtn = document.querySelector(".popupBtn");
const gameField = document.querySelector(".game_field");
const carrotNum = document.querySelector(".carrotNum");
const carrots = document.querySelectorAll(".carrot");
const bugs = document.querySelectorAll(".bug");
let carrot_id;
let bug_id;

playBtn.addEventListener("click", () => {
  play();
});

popupBtn.addEventListener("click", () => {
  popUp.style.display = "none";
  clearGameField();
  play();
});

carrots.forEach((carrot) => {
  carrot.addEventListener("click", (e) => {
    const id = e.target.dataset.carrot_id;
    console.log(id);
    if (id) {
      const toBeDeleted = document.querySelector(`.carrotImg[data-id="${id}"]`); // Attribute selector
      toBeDeleted.remove();
    }
  });
});

function showPopup() {
  popUp.style.display = "flex";
  popupText.textContent = "YOU LOST💩";
  playBtn.style.display = "none";
}

function play() {
  carrot_id = 0;
  bug_id = 0;
  let carrot = 10;
  for (let i = 0; i < 10; i++) {
    makeCarrot();
  }

  for (let i = 0; i < 10; i++) {
    makeBugs();
  }

  let time = 5;
  playBtn.style.display = "inline";
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';

  let x = setInterval(() => {
    timer.textContent = `00:0${time}`;
    time--;
    if (time < 0) {
      clearInterval(x);
      showPopup();
    }
  }, 1000);
}

function clearGameField() {
  carrots.forEach((carrot) => carrot.remove());
  bugs.forEach((bug) => bug.remove());
}

function makeCarrot() {
  const carrot = document.createElement("button");
  const carrot_img = document.createElement("img");
  carrot_img.setAttribute("src", "./img/carrot.png");
  carrot_img.setAttribute("class", "carrotImg");
  carrot.setAttribute("class", "carrot");
  carrot.setAttribute("data-id", carrot_id);
  carrot_img.setAttribute("data-id", carrot_id);
  carrot.appendChild(carrot_img);
  gameField.appendChild(carrot);

  let x = getRndInteger(50, 800);
  let y = getRndInteger(100, 400);
  carrot.style.transform = `translate(${x}px,${y}px)`;

  carrot_id++;
}

function makeBugs() {
  const bug = document.createElement("button");
  const bug_img = document.createElement("img");
  bug_img.setAttribute("src", "./img/bug.png");
  bug.setAttribute("class", "bug");
  bug.setAttribute("data-id", bug_id);
  bug_img.setAttribute("data-id", bug_id);
  bug.appendChild(bug_img);
  gameField.appendChild(bug);

  let x = getRndInteger(100, 1000);
  let y = getRndInteger(100, 400);
  bug.style.transform = `translate(${x}px,${y}px)`;

  bug_id++;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

field.addEventListener("click", (e) => {
  let carrotnum;
  let id = e.target.dataset.id;
  if (e.target.getAttribute("class") == "carrot") {
    carrotnum = changeCarrotNum(carrot_count);
    const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
    toBeDeleted.remove();
  } else if (e.target.getAttribute("class") == "bug") {
    stopGameTimer();
    hideStartButton();
    showPopupWithText("You lost! 💩");
  }
});
