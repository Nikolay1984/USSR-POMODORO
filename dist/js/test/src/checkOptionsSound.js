"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default() {
  let checkBeep = document.querySelector(".checkBeep");
  let checkAlarm = document.querySelector(".checkAlarm");
  let ballVolume = document.querySelector(".ballVolume");
  let circleBigVolume = document.querySelector(".circleBigVolume");
  let circleBigHeight = circleBigVolume.offsetHeight;
  let ballHeight = ballVolume.offsetHeight;
  ballVolume.style.top = 0;
  ballVolume.style.left = circleBigHeight / 2 - ballHeight / 2 + "px";
  checkBeep.addEventListener("click", handlerClick);
  checkAlarm.addEventListener("click", handlerClick);

  function handlerClick(e) {
    let target = e.target;

    if (target.className.indexOf("checkSoundInput") === -1) {
      return;
    }

    if (target.className.indexOf("checkSoundInputActive") >= 0) {
      return;
    }

    let currentTarget = e.currentTarget;
    let targetAudioElem = target.children[0];
    let activeElem = currentTarget.querySelector(".checkSoundInputActive");
    activeElem.classList.remove("checkSoundInputActive"); // console.dir(activeElem);

    target.classList.add("checkSoundInputActive");
    targetAudioElem.play();
  }
}

module.exports = exports.default;