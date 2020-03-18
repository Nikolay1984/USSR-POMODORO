"use strict";

var _Button = _interopRequireDefault(require("./Button.js"));

var _Timer = _interopRequireDefault(require("./Timer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {Driver} from "./Driver.js";
// import {Observable} from "./Observable.js";
let configTimer = {
  selectorTargetToPage: ".placeTimer",
  stringCaptionTimer: "Основное табло таймера",
  stringCaptionCountOfWork: "Осталось циклов"
};
let timer = new _Timer.default(configTimer);
let buttonStartConfig = {
  type: "start",
  targetButton: document.querySelector(".start")
};
let buttonStart = new _Button.default(buttonStartConfig);
let configHandlerEventForButtonStart = {
  nameEvent: "click",
  handler: function (event) {
    if (timer.onTimer) {
      timer.stopTimeRun();
      this.innerHTML = "start";
    } else {
      timer.timeRun();
      this.innerHTML = "stop";
    }
  }
};
buttonStart.addEventListenerToButton(configHandlerEventForButtonStart);
let buttonResetConfig = {
  type: "reset",
  targetButton: document.querySelector(".reset")
};
let buttonReset = new _Button.default(buttonResetConfig);
let configHandlerEventForButtonReset = {
  nameEvent: "click",
  handler: function (event) {
    timer.resetTimer();
  }
};
buttonReset.addEventListenerToButton(configHandlerEventForButtonReset);