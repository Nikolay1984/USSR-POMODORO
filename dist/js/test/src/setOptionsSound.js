"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(config) {
  function handlerMouseDown(e) {
    function handlerMouseMove(e) {
      // когда крутим крутилку тут меняем звук на всех элементах
      const volume = takeVolumeSound();
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
    const timerIsRun = buttonStartStop.classList.contains("timerRun");

    function handlerClickSound() {
      if (!targetAudioElem.paused) {
        targetAudioElem.pause();
        return;
      }

      if (timerIsRun && parentTarget.classList.contains("checkAlarm")) {
        return;
      }

      activeAudioElements.forEach(function (elem) {
        const activeAudioElem = elem.children[0];
        activeAudioElem.pause();
        activeAudioElem.currentTime = 0;
        targetAudioElem.loop = false;
      });

      if (timerIsRun) {
        targetAudioElem.loop = true;
      }

      targetAudioElem.play();
    }

    const {
      target
    } = e;
    const parentTarget = target.parentElement;
    const beepCheckSoundInputs = parentTarget.querySelectorAll(".checkSoundInput");
    const soundOff = !document.querySelector(".soundOn"); //класс на общей кнопке звука: есть - не нажата, нету - нажата

    const beepOff = target.classList.contains("noSoundBeepActive"); // класс вещается на кнопку отключения звука, когда на нее нажимаешь или нажимаешь на общую кнопку звука

    const activeElem = parentTarget.querySelector(".checkSoundInputActive"); //активный элемент

    if (target.classList.contains("noSoundBeep")) {
      if (soundOff) {
        target.classList.add("noSoundBeepActive");
        return;
      }

      if (!beepOff) {
        target.classList.add("noSoundBeepActive");
        activeElem.children[0].pause();
        beepCheckSoundInputs.forEach(elem => {
          // elem.children[ 0 ].pause();
          elem.children[0].muted = true;
        });
      }

      if (activeElem) {
        activeElem.classList.remove("checkSoundInputActive");
      }
    }

    if (target.className.indexOf("checkSoundInput") === -1) {
      return;
    }

    const {
      currentTarget
    } = e;
    const activeAudioElements = currentTarget.querySelectorAll(".checkSoundInputActive");
    const targetAudioElem = target.children[0];

    if (!activeElem) {
      target.classList.add("checkSoundInputActive");

      if (soundOff) {
        return;
      }

      let noSoundBeepActive = parentTarget.querySelector('.noSoundBeepActive');
      noSoundBeepActive.classList.remove("noSoundBeepActive");
      beepCheckSoundInputs.forEach(elem => {
        elem.children[0].muted = false;
      });
    } else {
      activeElem.classList.remove("checkSoundInputActive");
      target.classList.add("checkSoundInputActive");
    }

    handlerClickSound();
  }

  function defaultLoading() {
    // задаем звук при загрузке страницы
    const volume = takeVolumeSound();
    checkSoundInputAll.forEach(function (elem) {
      elem.children[0].volume = volume;
    }); // позиционирование начальное крутилки на странице

    ballVolume.style.top = 0;
    ballVolume.style.left = circleBigHeight / 2 - ballHeight / 2 + "px";
  }

  function handlerClickButtonOnOffSound(e) {
    const soundIsOn = buttonOnOffSound.classList.contains("soundOn");
    const timerIsRun = buttonStartStop.classList.contains("timerRun");

    if (soundIsOn) {
      flagBeepMute = beepMute.classList.contains("noSoundBeepActive");
      checkSoundInputAll.forEach(elem => {
        elem.children[0].muted = true;
      });
      buttonOnOffSound.classList.remove("soundOn");
      buttonOnOffSound.classList.add("buttonActive");
      buttonOnOffSound.innerHTML = "ВКЛ ЗВУК";

      if (!flagBeepMute) {
        beepMute.classList.add("noSoundBeepActive");
      }

      return;
    }

    let activeBeep = beepElementParent.querySelector(".checkSoundInputActive");
    checkSoundInputAll.forEach(elem => {
      elem.children[0].muted = false;
    });
    buttonOnOffSound.classList.add("soundOn");
    buttonOnOffSound.classList.remove("buttonActive");
    buttonOnOffSound.innerHTML = "ВЫКЛ ЗВУК"; // if(!flagBeepMute){

    if (!activeBeep) {
      return;
    }

    beepMute.classList.remove("noSoundBeepActive"); // }

    if (activeBeep && timerIsRun) {
      activeBeep.children[0].loop = true;
      activeBeep.children[0].play();
    }
  }

  function handlerChangePeriodOfSound() {
    const timerIsRun = buttonStartStop.classList.contains("timerRun");
    const activeAlarm = alarmElementParent.querySelector(".checkSoundInputActive").children[0];
    let activeBeep = beepElementParent.querySelector(".checkSoundInputActive");
    activeAlarm.addEventListener("ended", function () {
      if (timerIsRun && activeBeep) {
        activeBeep.loop = true;
        activeBeep.play();
      }
    }, {
      once: true
    });

    if (activeBeep) {
      activeBeep = activeBeep.children[0];
      activeBeep.pause();
    }

    activeAlarm.play();
  }

  function takeVolumeSound() {
    const value = Number(currentVolume.innerHTML) / 100;
    return value;
  }

  const checkSoundInputAll = document.querySelectorAll(".checkSoundInput");
  const wrapperControlSound = document.querySelector(".wrapperControlSound");
  const ballVolume = document.querySelector(".ballVolume");
  const circleBigVolume = document.querySelector(".circleBigVolume");
  const buttonOnOffSound = document.querySelector(".onOffSound");
  const nameCurrentPeriod = document.querySelector(".nameCurrentPeriod");
  const buttonStartStop = document.querySelector(".start");
  const beepElementParent = document.querySelector(".checkBeep");
  const alarmElementParent = document.querySelector(".checkAlarm");
  const currentVolume = document.querySelector(".currentVolume");
  const circleBigHeight = circleBigVolume.offsetHeight;
  const ballHeight = ballVolume.offsetHeight;
  const observeNameCurrentPeriod = new MutationObserver(handlerChangePeriodOfSound);
  const configMutationObserver = {
    childList: true,
    characterData: true
  };
  const beepMute = document.querySelector(".noSoundBeep");
  let flagBeepMute;
  observeNameCurrentPeriod.observe(nameCurrentPeriod, configMutationObserver);
  wrapperControlSound.addEventListener("click", handlerClickChangeBeepAndAlarm);
  ballVolume.addEventListener("mousedown", handlerMouseDown);
  buttonOnOffSound.addEventListener("click", handlerClickButtonOnOffSound);
  defaultLoading();
}

module.exports = exports.default;