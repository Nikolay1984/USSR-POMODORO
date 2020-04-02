export default class Timer {
    constructor(className) {
        this.timerDOM = document.querySelector("." + className);
        this.onTimer = false;
        this.workTimeConfig = this._getWorkTimeConfig();
        this.soundConfig = this._getSoundConfig();

        this._drawDisplayTimer = this._drawDisplayTimer.bind(this);
        this._createStringForDisplayTimer = this._createStringForDisplayTimer.bind(this);
        this._timeController = this._timeController.bind(this);
        // this._buildTimer(config);
        this._configurationButtons();
    }
    // _buildTimer({stringCaptionTimer , stringCaptionCountOfWork}){
    // 	let target = this.timerDOM;
    // 	let wrapperDisplayTimer = document.createElement("div");
    // 	let nameDisplayTimer = document.createElement("span");
    // 	let displayTimer = document.createElement("div");
    // 	let displaySecondsAndMinute = document.createElement("div");
    // 	let currentSecondsAndMinute = document.createElement("span");
    // 	let wrapperDisplayCountOfWork = document.createElement("div");
    // 	let nameDisplayCountOfWork = document.createElement("span");
    // 	let displayCountOfWork = document.createElement("div");
    // 	let currentCountOfWork = document.createElement("span");
    //
    // 	wrapperDisplayTimer.classList.add("wrapperDisplayTimer");
    // 	nameDisplayTimer.classList.add("nameDisplayTimer");
    // 	displayTimer.classList.add("displayTimer");
    // 	displaySecondsAndMinute.classList.add("displaySecondsAndMinute");
    // 	currentSecondsAndMinute.classList.add("currentSecondsAndMinute");
    // 	wrapperDisplayCountOfWork.classList.add("wrapperDisplayCountOfWork");
    // 	nameDisplayCountOfWork.classList.add("nameDisplayCountOfWork");
    // 	displayCountOfWork.classList.add("displayCountOfWork");
    // 	currentCountOfWork.classList.add("currentCountOfWork");
    //
    // 	nameDisplayTimer.innerHTML = stringCaptionTimer;
    // 	nameDisplayCountOfWork.innerHTML = stringCaptionCountOfWork;
    // 	currentSecondsAndMinute.innerHTML = "25:00";
    // 	currentCountOfWork.innerHTML = "3";
    //
    // 	wrapperDisplayTimer.prepend(nameDisplayTimer , displayTimer);
    // 	displayTimer.prepend(displaySecondsAndMinute , wrapperDisplayCountOfWork);
    // 	displaySecondsAndMinute.prepend(currentSecondsAndMinute);
    // 	wrapperDisplayCountOfWork.prepend(nameDisplayCountOfWork , displayCountOfWork);
    // 	displayCountOfWork.prepend(currentCountOfWork);
    // 	target.prepend(wrapperDisplayTimer);
    // }

    _drawDisplayTimer(stringSecondAndMinute) {
        let timerDOM = this.timerDOM;
        let displaySecondsAndMinuteDiv = timerDOM.querySelector(".currentSecondsAndMinute");
        let displayCountOfWorkDiv = timerDOM.querySelector(".currentCountOfWork");
        let nameCurrentPeriod = timerDOM.querySelector(".nameCurrentPeriod");
        let period;
        let numberOfWork;
        let numberOfRest = this.workTimeConfig.countOfRest;
        if(numberOfRest === 0){
            numberOfWork = "Последний" ;
            displayCountOfWorkDiv.classList.add("lastWork")
        }
        else {
            numberOfWork= this.workTimeConfig.countOfRest ;
            displayCountOfWorkDiv.classList.remove("lastWork")
        }

        switch (this.workTimeConfig.hint) {
            case "work":
                displayCountOfWorkDiv.classList.remove("styleRest")
                period = "Работа";
                break;

            case "rest":
                displayCountOfWorkDiv.classList.add("styleRest")
                period = "Перемена";
                break;

            case "bigRest":
                displayCountOfWorkDiv.classList.add("styleRest")
                period = "Перерыв";
                break;
        }
        displaySecondsAndMinuteDiv.innerHTML = stringSecondAndMinute;
        nameCurrentPeriod.innerHTML = period;
        displayCountOfWorkDiv.innerHTML = numberOfWork;
    }

    _createStringForDisplayTimer(minute) {
        let minuteString = "";
        let secondsString = "";
        if(minute < 10){
            minuteString = "0" + minute;
        }
        else{
            minuteString = String(minute);
        }

        if(this.workTimeConfig.seconds < 10){
            secondsString = "0" + this.workTimeConfig.seconds;
        }
        else{
            secondsString = String(this.workTimeConfig.seconds);
        }

        let currentTimeString = `${minuteString}:${secondsString}`;
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
                    if (configOfTimer.countOfRest === 0) {
                        configOfTimer.hint = "bigRest";
                        configOfTimer.seconds = 60;
                        return;
                    }
                    configOfTimer.countOfRest--;
                    configOfTimer.hint = "rest";
                    configOfTimer.seconds = 60;
                    configOfTimer.minuteOfWork = configOfTimer.cloneConfig.minuteOfWork - 1;
                    return;
                }

            }

        }

        if (configOfTimer.hint === "rest") {
            minute = configOfTimer.minuteOfRest;

            if (configOfTimer.seconds === -1) {
                configOfTimer.minuteOfRest--;
                configOfTimer.seconds = 59;

                if (configOfTimer.minuteOfRest === -1) {
                    configOfTimer.seconds = 60;
                    configOfTimer.minuteOfRest = configOfTimer.cloneConfig.minuteOfRest - 1;
                    configOfTimer.hint = "work";
                    return;
                }
            }
        }

        if (configOfTimer.hint === "bigRest") {
            minute = configOfTimer.minuteOfBigRest;
            if(configOfTimer.countOfRest === 0 ){

                configOfTimer.countOfRest = configOfTimer.cloneConfig.countOfRest;
            }
            if (configOfTimer.seconds === -1){
                configOfTimer.minuteOfBigRest--;
                configOfTimer.seconds = 59;
                if(configOfTimer.minuteOfBigRest === -1){
                    configOfTimer.seconds = 60;
                    configOfTimer.minuteOfBigRest = configOfTimer.cloneConfig.minuteOfBigRest - 1;
                    configOfTimer.minuteOfWork = configOfTimer.cloneConfig.minuteOfWork - 1;
                    configOfTimer.hint = "work";
                    return;
                }
            }
        }

        let timeString = this._createStringForDisplayTimer(minute);
        this._drawDisplayTimer(timeString);

    }

    timeRun() {



        this.workTimeConfig = this._getWorkTimeConfig();

        this.onTimer = true;


        let handlerSetInterval = function () {

            this._timeController(this.workTimeConfig);
        };
        handlerSetInterval = handlerSetInterval.bind(this);

        this.timerId = setInterval(handlerSetInterval , 100);

    }

    stopTimeRun() {
        this.onTimer = false;
        clearInterval(this.timerId);
    }

    resetTimer() {
        this.onTimer = false;
        clearInterval(this.timerId);
        this.workTimeConfig = this._getWorkTimeConfig();

        let timeString = this._createStringForDisplayTimer(this.workTimeConfig.minuteOfWork);
        this._drawDisplayTimer(timeString);

    }

    _getWorkTimeConfig() {
        let minuteOfWork =  Number(this.timerDOM
            .querySelector(".currentSecondsAndMinute")
            .innerHTML
            .slice(0,2));
        let countOfRest = Number(this.timerDOM
            .querySelector(".currentCountOfWork")
            .innerHTML
            );

        let minuteOfRest = Number(this.timerDOM
            .querySelector(".restHidden")
            .innerHTML
        );
        let minuteOfBigRest = Number(this.timerDOM
            .querySelector(".bigRestHidden")
            .innerHTML
        );
        let seconds = Number(this.timerDOM
            .querySelector(".currentSecondsAndMinute")
            .innerHTML
            .slice(3,5));
        let config = {
            hint: "work" ,
            seconds,
            minuteOfWork: minuteOfWork,
            minuteOfRest: minuteOfRest,
            minuteOfBigRest: minuteOfBigRest,
            countOfRest
        };
        config.cloneConfig = Object.assign({} , config);
        //минимальное время работы, отдыха и большого перерыва 1 мин
        return config ;

    }

    _getSoundConfig() {
        return {
            volume: 2 ,
            flip: false ,
            soundOfSignal: "beep" ,
        };
    }

    _configurationButtons(){
        let self = this;
        let buttonStartStop = this.timerDOM.querySelector(".start");
        let buttonReset = this.timerDOM.querySelector(".reset");

        buttonStartStop.addEventListener("click" , function (event) {
            if(self.onTimer) {
                self.stopTimeRun();
                this.innerHTML = "СТАРТ";
            }
            else {
                self.timeRun();
                this.innerHTML = "СТОП";
            }
        });
        buttonReset.addEventListener("click", function () {
            self.resetTimer();
        })
    }
}
