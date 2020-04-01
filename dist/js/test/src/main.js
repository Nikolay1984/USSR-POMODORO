"use strict";

var _checkOptionsSound = _interopRequireDefault(require("./checkOptionsSound.js"));

var _checkOptionsRest = _interopRequireDefault(require("./checkOptionsRest.js"));

var _checkOptionsRound = _interopRequireDefault(require("./checkOptionsRound.js"));

var _Timer = _interopRequireDefault(require("./Timer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _checkOptionsSound.default)();
(0, _checkOptionsRest.default)();
(0, _checkOptionsRound.default)();
let timer = new _Timer.default("timerPomodoro"); // import Button from "./Button.js";
// // import {Driver} from "./Driver.js";
// // import {Observable} from "./Observable.js";
//
// let buttonStartConfig = {
// 	type: "start" ,
// 	targetButton: document.querySelector(".start")
// };
//
// let buttonStart = new Button(buttonStartConfig);
// let configHandlerEventForButtonStart = {
// 	nameEvent: "click" ,
// 	handler: function (event) {
// 		if(timer.onTimer) {
// 			timer.stopTimeRun();
// 			this.innerHTML = "start";
// 		}else {
// 			timer.timeRun();
// 			this.innerHTML = "stop";
// 		}
// 	}
// };
//
// buttonStart.addEventListenerToButton(configHandlerEventForButtonStart);
//
// let buttonResetConfig = {
// 	type: "reset" ,
// 	targetButton: document.querySelector(".reset")
// };
//
// let buttonReset = new Button(buttonResetConfig);
// let configHandlerEventForButtonReset = {
// 	nameEvent: "click" ,
// 	handler: function (event) {
// 		timer.resetTimer();
// 	}
// };
// buttonReset.addEventListenerToButton(configHandlerEventForButtonReset);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//