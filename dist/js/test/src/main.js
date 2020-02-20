"use strict";

var _Button = _interopRequireDefault(require("./Button.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {Driver} from "./Driver.js";
// import {Timer} from "./Timer.js";
// import {Observable} from "./Observable.js";
// let configButton = {
// 	type:"start",
// 	targetButton:document.querySelector(".start")
// };
// let configHandlerEvent = {
// 	nameEvent: "click",
// 	handler: function (event) {
//
// 	}
// };
let startButton = document.createElement("button");
startButton.classList.add("start");
let configButton = {
  type: "start",
  targetButton: startButton
};
let instanceButton = new _Button.default(configButton);
console.dir(configButton.targetButton);