"use strict";

var _Button = _interopRequireDefault(require("./Button.js"));

var _Timer = _interopRequireDefault(require("./Timer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {Driver} from "./Driver.js";
// import {Observable} from "./Observable.js";
let timer = new _Timer.default();
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
    } else {
      timer.timeRun();
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