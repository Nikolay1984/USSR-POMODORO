"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Timer {
  constructor() {
    this.timerDOM = document.querySelector(".displayTimer");
    this.onTimer = false;
    this.workTimeConfig = this._getWorkTimeConfigFromButton();
    this.soundConfig = this._getSoundConfigFromButton();
    this._drawDisplayTimer = this._drawDisplayTimer.bind(this);
    this._createStringForDisplayTimer = this._createStringForDisplayTimer.bind(this);
    this._timeController = this._timeController.bind(this);
  }

  _drawDisplayTimer(string) {
    let timerDOM = this.timerDOM;
    timerDOM.innerHTML = string + " " + this.workTimeConfig.hint;
  }

  _createStringForDisplayTimer(minute) {
    let minuteString = "";
    let secondsString = "";
    let countOfWork = "";

    if (this.workTimeConfig.countOfRest > 0) {
      countOfWork = String(this.workTimeConfig.countOfRest + 1);
    } else {
      countOfWork = "На последнем рабочем цикле";
    }

    if (minute < 10) {
      minuteString = "0" + minute;
    } else {
      minuteString = String(minute);
    }

    if (this.workTimeConfig.seconds < 10) {
      secondsString = "0" + this.workTimeConfig.seconds;
    } else {
      secondsString = String(this.workTimeConfig.seconds);
    }

    let currentTimeString = `${minuteString} : ${secondsString} : осталось циклов ${countOfWork}`;
    return currentTimeString;
  }

  _timeController(configOfTimer) {
    let minute;
    configOfTimer.seconds--;

    if (configOfTimer.hint === "work") {
      minute = configOfTimer.minuteOfWork;

      if (configOfTimer.seconds === -1) {
        configOfTimer.minuteOfWork--;
        configOfTimer.seconds = 59;

        if (configOfTimer.minuteOfWork === -1) {
          configOfTimer.hint = "rest";
          configOfTimer.seconds = 60;
          configOfTimer.minuteOfWork = configOfTimer.cloneConfig.minuteOfWork;
          return;
        }
      }
    }

    if (configOfTimer.hint === "rest") {
      minute = configOfTimer.minuteOfRest;

      if (configOfTimer.countOfRest === 0) {
        configOfTimer.hint = "bigRest";
        configOfTimer.seconds = 60;
        return;
      }

      if (configOfTimer.seconds === -1) {
        configOfTimer.minuteOfRest--;
        configOfTimer.seconds = 59;

        if (configOfTimer.minuteOfRest === -1) {
          configOfTimer.countOfRest--;
          configOfTimer.seconds = 60;
          configOfTimer.minuteOfRest = configOfTimer.cloneConfig.minuteOfRest;
          configOfTimer.hint = "work";
          return;
        }
      }
    }

    if (configOfTimer.hint === "bigRest") {
      minute = configOfTimer.minuteOfBigRest;

      if (configOfTimer.seconds === -1) {
        configOfTimer.minuteOfBigRest--;
        configOfTimer.seconds = 59;

        if (configOfTimer.minuteOfBigRest === -1) {
          configOfTimer.seconds = 60;
          configOfTimer.minuteOfBigRest = configOfTimer.cloneConfig.minuteOfBigRest;
          configOfTimer.countOfRest = configOfTimer.cloneConfig.countOfRest;
          configOfTimer.hint = "work";
          return;
        }
      }
    }

    let timeString = this._createStringForDisplayTimer(minute);

    this._drawDisplayTimer(timeString);
  }

  timeRun() {
    this.onTimer = true;

    let handlerSetInterval = function () {
      this._timeController(this.workTimeConfig);
    };

    handlerSetInterval = handlerSetInterval.bind(this);
    this.timerId = setInterval(handlerSetInterval, 100);
  }

  stopTimeRun() {
    this.onTimer = false;
    clearInterval(this.timerId);
  }

  resetTimer() {
    this.onTimer = false;
    clearInterval(this.timerId);
    this.workTimeConfig = this._getWorkTimeConfigFromButton();

    let timeString = this._createStringForDisplayTimer(this.workTimeConfig.minuteOfWork);

    this._drawDisplayTimer(timeString);
  }

  changeBeep() {}

  changeVolume() {}

  changeSignalAlarm() {}

  _getWorkTimeConfigFromButton() {
    let config = {
      hint: "work",
      seconds: 60,
      minuteOfWork: 1 - 1,
      minuteOfRest: 1 - 1,
      minuteOfBigRest: 1 - 1,
      countOfRest: 1
    };
    config.cloneConfig = Object.assign({}, config); //минимальное время работы, отдыха и большого перерыва 1 мин

    return config;
  }

  _getSoundConfigFromButton() {
    return {
      volume: 2,
      flip: false,
      soundOfSignal: "beep"
    };
  }

  getCurrentWorkTimeConfigFromForm() {}

}

exports.default = Timer;
module.exports = exports.default;