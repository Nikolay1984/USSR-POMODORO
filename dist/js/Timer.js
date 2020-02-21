
export default class Timer{
	constructor(){
		this.timerDOM = document.querySelector(".displayTimer");
		this.onTimer = false;
		this.workTimeConfig = this.getWorkTimeConfigFromButton();
		this.soundConfig = this.getSoundConfigFromButton();
		this.amountOfWorkComplited = 0;

	}

	timeRun(){

	//	берет наш домовский таймер задает ему время, которе у нас равно this.workTimeConfig
	//
	}

	stopTimeRun(){
		this.workTimeConfig = this.getCurrentWorkTimeConfigFromForm();
	}

	resetTimer(){
		this.workTimeConfig = this.getWorkTimeConfigFromButton();
	}

	changeBeep(){}
	changeVolume(){}
	changeSignalAlarm(){}

	getWorkTimeConfigFromButton(){

		return  {
			mainTime : 25,
			restTime : 5,
			breakTime: 15,
			breakInterval: 4
		};

	}
	getSoundConfigFromButton(){
		return {
			volume: 2,
			flip: false,
			soundOfSignal:"beep"
		}
	}
	getCurrentWorkTimeConfigFromForm(){}
}