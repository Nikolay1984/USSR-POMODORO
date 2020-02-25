"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Timer {
  constructor() {
    this.timerDOM = document.querySelector(".displayTimer");
    this.onTimer = false;
    this.workTimeConfig = this.getWorkTimeConfigFromButton();
    this.soundConfig = this.getSoundConfigFromButton();
  }

  timeRun() {
    //	берет наш домовский таймер задает ему время, которе у нас равно this.workTimeConfig
    //
    let hint = "work";
    let self = this;
    let seconds = 60;
    let configOfTimer = this.workTimeConfig;
    let cloneConfigOfTimer = Object.assign(configOfTimer);

    function drawMinuteAndSecond(string) {}

    function formStringOfMinuteAndSecond(minute) {
      let resString = "";
      return resString;
    }

    function timeController(configOfTimer) {
      let minute;
      seconds--;

      if (hint === "work") {
        minute = configOfTimer.minuteOfWork;

        if (seconds == -1) {
          configOfTimer.minuteOfWork--;
          seconds = 59;

          if (minute == -1) {
            hint = "rest";
            seconds = 60;
            configOfTimer.minuteOfWork = cloneConfigOfTimer.minuteOfWork - 1;
            return;
          }
        }

        minute = String(minute);
      }

      if (hint === "rest") {
        minute = configOfTimer.minuteOfRest;

        if (configOfTimer.countOfRest === 0) {
          hint = "bigRest";
          return;
        }

        if (seconds == -1) {
          configOfTimer.minuteOfRest--;
          seconds = 59;

          if (minute == -1) {
            configOfTimer.countOfRest--;
            seconds = 60;
            configOfTimer.minuteOfRest = cloneConfigOfTimer.minuteOfRest - 1;
            hint = "work";
            return;
          }
        }
      }

      if (hint === "bigRest") {}

      let timeString = formStringOfMinuteAndSecond(minute);
      drawMinuteAndSecond(timeString);
    }

    let timerId = setInterval(function () {
      timeController(configOfTimer);
    }, 100); // let mainTime = this.workTimeConfig.mainTime -1;
    // let	restTime = this.workTimeConfig.restTime -1;
    // let	breakTime = this.workTimeConfig.breakTime -1;
    // let	breakInterval = this.workTimeConfig.breakInterval;
    // let timerDOM = this.timerDOM;
    // let seconds = 59;
    // let self = this;
    // this.onTimer = true;
    // function createStringToDrawDisplayTimer(minute) {
    // 	let minuteString = "";
    // 	let secondsString = "";
    //
    //
    //
    // 	if(minute < 10){
    // 		minuteString = '0' + minute;
    // 	}else{
    // 		minuteString = minute;
    // 	}
    //
    // 	if(seconds < 10){
    // 		secondsString = '0' + seconds;
    // 	}else{
    // 		secondsString = seconds;
    // 	}
    //
    // 	let currentTimeString = `${minuteString} : ${secondsString}`;
    //
    //
    // 	return currentTimeString;
    // };
    // function changeDisplayTimerOfRest() {
    // 	if (breakInterval === 0){
    // 		clearInterval(idTimer);
    // 		idTimer = setInterval(changeDisplayTimerOfBigRest,300);
    // 		return;
    // 	}
    // 	timerDOM.innerHTML = createStringToDrawDisplayTimer(restTime) + "Rest";
    // 	seconds--;
    // 	if (seconds == -1){
    // 		restTime--;
    // 		seconds = 59;
    // 		if(restTime == -1){
    // 			clearInterval(idTimer);
    // 			breakInterval--;
    // 			seconds = 59;
    // 			restTime = self.workTimeConfig.restTime -1;
    // 			idTimer =  setInterval(changeDisplayTimerOfWork, 300);
    // 			return;
    // 		}
    // 	}
    //
    // };
    // function changeDisplayTimerOfWork () {
    // 	timerDOM.innerHTML = createStringToDrawDisplayTimer(mainTime) + "Work";
    // 	seconds--;
    // 	if (seconds == -1){
    // 		mainTime--;
    // 		seconds = 59;
    // 		if (mainTime == -1) {
    // 			clearInterval(idTimer);
    // 			seconds = 59;
    // 			mainTime = self.workTimeConfig.mainTime -1;
    // 			idTimer = setInterval(changeDisplayTimerOfRest, 300);
    // 			return;
    // 		};
    // 	}
    //
    //
    // };
    // function changeDisplayTimerOfBigRest(){
    // 	timerDOM.innerHTML = createStringToDrawDisplayTimer(breakTime) + "BigRest";
    // 	seconds--;
    // 	if (seconds == -1){
    // 		breakTime--;
    // 		seconds = 59;
    // 		if(breakTime == -1){
    // 			clearInterval(idTimer);
    // 			seconds = 59;
    // 			breakTime = self.workTimeConfig.mainTime -1;
    // 			breakInterval = self.workTimeConfig.breakInterval;
    // 			idTimer = setInterval(changeDisplayTimerOfWork, 300);
    // 			return;
    // 		}
    // 	}
    //
    // };
    //
    // let idTimer = setInterval(changeDisplayTimerOfWork,300);
  }

  stopTimeRun() {
    this.workTimeConfig = this.getCurrentWorkTimeConfigFromForm();
  }

  resetTimer() {
    this.workTimeConfig = this.getWorkTimeConfigFromButton();
  }

  changeBeep() {}

  changeVolume() {}

  changeSignalAlarm() {}

  getWorkTimeConfigFromButton() {
    // return  {
    // 	mainTime : 1,
    // 	restTime : 1,
    // 	breakTime: 0,
    // 	breakInterval: 1
    // };
    return {
      minuteOfWork: 1,
      minuteOfRest: 1,
      minuteOfBigRest: 0,
      countOfRest: 1
    };
  }

  getSoundConfigFromButton() {
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