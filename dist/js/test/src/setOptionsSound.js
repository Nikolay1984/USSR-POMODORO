"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(config) {
  function handlerMouseDown(e) {
    function handlerMouseMove(e) {
      // когда крутим крутилку тут меняем звук на всех элементах
      let volume = takeVolumeSound();
      checkSoundInputAll.forEach(function (elem) {
        elem.children[0].volume = volume;
      });
    }

    document.addEventListener("mousemove", handlerMouseMove);
    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", handlerMouseMove);
    }, {
      once: true
    });
  }

  function handlerClickChangeBeepAndAlarm(e) {
    let timerIsRun = document.querySelector(".start ").classList.contains("timerRun");

    function handlerClickSound() {
      if (!targetAudioElem.paused) {
        targetAudioElem.pause();
        return;
      }

      if (timerIsRun && parentTarget.classList.contains("checkAlarm")) {
        return;
      }

      activeAudioElements.forEach(function (elem) {
        let activeAudioElem = elem.children[0];
        activeAudioElem.pause();
        activeAudioElem.currentTime = 0;
        targetAudioElem.loop = false;
      });

      if (timerIsRun) {
        targetAudioElem.loop = true;
      }

      targetAudioElem.play();
    }

    let target = e.target;

    if (target.className.indexOf("checkSoundInput") === -1) {
      return;
    }

    let currentTarget = e.currentTarget;
    let activeAudioElements = currentTarget.querySelectorAll(".checkSoundInputActive");
    let parentTarget = target.parentElement;
    let targetAudioElem = target.children[0];
    let activeElem = parentTarget.querySelector(".checkSoundInputActive");
    activeElem.classList.remove("checkSoundInputActive");
    target.classList.add("checkSoundInputActive");
    handlerClickSound();
  }

  function defaultLoading() {
    // задаем звук при загрузке страницы
    let volume = takeVolumeSound();
    checkSoundInputAll.forEach(function (elem) {
      elem.children[0].volume = volume;
    }); // позиционирование начальное крутилки на странице

    ballVolume.style.top = 0;
    ballVolume.style.left = circleBigHeight / 2 - ballHeight / 2 + "px";
  }

  function handlerClickButtonOnOffSound(e) {
    let soundIsOn = buttonOnOffSound.classList.contains("soundOn");

    if (soundIsOn) {
      checkSoundInputAll.forEach(elem => {
        elem.children[0].muted = true;
      });
      buttonOnOffSound.classList.remove("soundOn");
      buttonOnOffSound.innerHTML = "ВКЛ ЗВУК";
      return;
    }

    checkSoundInputAll.forEach(elem => {
      elem.children[0].muted = false;
    });
    buttonOnOffSound.classList.add("soundOn");
    buttonOnOffSound.innerHTML = "ВЫКЛ ЗВУК";
  }

  function handlerChangePeriodOfSound() {
    let timerIsRun = buttonStartStop.classList.contains("timerRun");
    let activeAlarm = alarmElementParent.querySelector(".checkSoundInputActive").children[0];
    let activeBeep = beepElementParent.querySelector(".checkSoundInputActive").children[0];
    activeAlarm.addEventListener("ended", function () {
      console.log("timerIsRun");

      if (timerIsRun) {
        activeBeep.loop = true;
        activeBeep.play();
      }
    }, {
      once: true
    });
    activeBeep.pause();
    activeAlarm.play();
  }

  function takeVolumeSound() {
    let value = Number(currentVolume.innerHTML) / 100;
    return value;
  }

  let checkSoundInputAll = document.querySelectorAll(".checkSoundInput");
  let wrapperControlSound = document.querySelector(".wrapperControlSound");
  let ballVolume = document.querySelector(".ballVolume");
  let circleBigVolume = document.querySelector(".circleBigVolume");
  let buttonOnOffSound = document.querySelector(".onOffSound");
  let nameCurrentPeriod = document.querySelector(".nameCurrentPeriod");
  let buttonStartStop = document.querySelector(".start");
  let beepElementParent = document.querySelector(".checkBeep");
  let alarmElementParent = document.querySelector(".checkAlarm");
  let currentVolume = document.querySelector(".currentVolume");
  let circleBigHeight = circleBigVolume.offsetHeight;
  let ballHeight = ballVolume.offsetHeight;
  let observeNameCurrentPeriod = new MutationObserver(handlerChangePeriodOfSound);
  let configMutationObserver = {
    childList: true,
    characterData: true
  };
  observeNameCurrentPeriod.observe(nameCurrentPeriod, configMutationObserver);
  wrapperControlSound.addEventListener("click", handlerClickChangeBeepAndAlarm);
  ballVolume.addEventListener("mousedown", handlerMouseDown);
  buttonOnOffSound.addEventListener("click", handlerClickButtonOnOffSound);
  defaultLoading();
}

module.exports = exports.default;