import checkOptionsSound from "./checkOptionsSound.js";
import checkOptionsRest from "./checkOptionsRest.js";
import checkOptionsRound from "./checkOptionsRound.js";
import checkOptionsTime from "./checkOptionsTime.js";
import Timer from "./Timer.js";

checkOptionsTime();
checkOptionsSound();
checkOptionsRest();
checkOptionsRound();

let timer = new Timer("timerPomodoro");



// import Button from "./Button.js";
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




