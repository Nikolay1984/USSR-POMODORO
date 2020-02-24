
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
		let mainTime = this.workTimeConfig.mainTime -1;
		let	restTime = this.workTimeConfig.restTime;
		let	breakTime = this.workTimeConfig.breakTime;
		let	breakInterval = this.workTimeConfig.breakInterval;
		let timerDOM = this.timerDOM;
		let seconds = 59;
		this.onTimer = true;


		function createStringToDrawDisplayTimer() {
			let minuteString = "";
			let secondsString = "";


			if (seconds == -1){
				seconds = 59;
				mainTime--;
			}

			if(mainTime == -1){
				clearInterval(idTimer);
				this.amountOfWorkComplited++;
				//TODO Вызов функции. которая запустит время перемены
				return;
			}
			if(mainTime < 10){
				minuteString = '0' + mainTime;
			}else{
				minuteString = mainTime;
			}

			if(seconds < 10){
				secondsString = '0' + seconds;
			}else{
				secondsString = seconds;
			}

			let currentTimeString = `${minuteString} : ${secondsString}`;

			seconds--;
			return currentTimeString;
		}

		function changeDisplayTimerOfRest() {

		}
		function changeDisplayTimerOfWork () {
			timerDOM.innerHTML = createStringToDrawDisplayTimer();
		}

		let idTimer = setInterval(changeDisplayTimerOfWork,1000);
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