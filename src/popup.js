"use strict";

export default class PopUp {
  constructor() {
    this.popup = document.querySelector(".pop_up");
    this.popupBtn = document.querySelector(".popupBtn");
    this.popupText = document.querySelector(".popupText");
    this.popupBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }
  hide() {
    this.popup.classList.add("popUp_hide");
  }

  showWithText(text) {
    this.popup.classList.remove("popUp_hide");
    this.popupText.innerText = text;
  }
}
