
export default class Timer{
	constructor(){
		let displayTimer = document.createElement("div");
		displayTimer.classList.add("displayTimer");

		this.onTimer = false;
		this.workTimeConfig ={
			mainTime : 25,
			restTime : 5,
			breakTime: 15,
			breakInterval: 4
		};
		this.soundConfig = {
			volume: 2,
			flip: false,
			soundOfSignal:"beep"
		};
		this.amountOfWorkComplited = 0;

	}

	timeIsRun(config = this.workTimeConfig){}
	stopTimeRun(){}
	toggleSound(){}
	setWorkTime(){}
	resetTimer(){}
}