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

    _drawDisplayTimer(stringSecondAndMinute) {
        let timerDOM = this.timerDOM;
        let displaySecondsAndMinuteDiv = timerDOM.querySelector(".currentSecondsAndMinute");
        let displayCountOfWorkDiv = timerDOM.querySelector(".currentCountOfWork");
        let nameCurrentPeriod = timerDOM.querySelector(".nameCurrentPeriod");
        let period;
        let numberOfWork;
        let numberOfRest = this.workTimeConfig.countOfRest;
        if (numberOfRest === 0){
            numberOfWork = "Последний" ;
            displayCountOfWorkDiv.classList.add("lastWork");
        }
        else {
            numberOfWork= this.workTimeConfig.countOfRest ;
            displayCountOfWorkDiv.classList.remove("lastWork");
        }

        switch (this.workTimeConfig.hint) {
            case "work":
                displayCountOfWorkDiv.classList.remove("styleRest");
                period = "Работа";
                break;

            case "rest":
                displayCountOfWorkDiv.classList.add("styleRest");
                period = "Перемена";
                break;

            case "bigRest":
                displayCountOfWorkDiv.classList.add("styleRest");
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
        if (minute < 10){
            minuteString = "0" + minute;
        }
        else {
            minuteString = String(minute);
        }

        if (this.workTimeConfig.seconds < 10){
            secondsString = "0" + this.workTimeConfig.seconds;
        }
        else {
            secondsString = String(this.workTimeConfig.seconds);
        }

        let currentTimeString = `${minuteString}:${secondsString}`;
        return currentTimeString;

    }

    _timeController(configOfTimer) {
        let minute;
        configOfTimer.seconds--;

        if (configOfTimer.hint === "work") {
            if (configOfTimer.seconds == 60){
                configOfTimer.seconds--;
                configOfTimer.minuteOfWork--;
            }
            minute = configOfTimer.minuteOfWork;

            if (configOfTimer.seconds === -1) {
                configOfTimer.minuteOfWork--;
                configOfTimer.seconds = 59;
                if (configOfTimer.minuteOfWork === -1) {
                    if (configOfTimer.countOfRest === 0) {
                        configOfTimer.hint = "bigRest";
                        configOfTimer.seconds = 61;
                        return;
                    }
                    configOfTimer.countOfRest--;
                    configOfTimer.hint = "rest";
                    configOfTimer.seconds = 61;//TODO
                    configOfTimer.minuteOfWork = configOfTimer.cloneConfig.minuteOfWork ;
                    return;
                }

            }

        }

        if (configOfTimer.hint === "rest") {
            if (configOfTimer.seconds == 60){
                configOfTimer.seconds--;
                configOfTimer.minuteOfRest--;
            }
            minute = configOfTimer.minuteOfRest;

            if (configOfTimer.seconds === -1) {
                configOfTimer.minuteOfRest--;
                configOfTimer.seconds = 59;

                if (configOfTimer.minuteOfRest === -1) {
                    configOfTimer.seconds = 61;
                    configOfTimer.minuteOfRest = configOfTimer.cloneConfig.minuteOfRest;
                    configOfTimer.hint = "work";
                    return;
                }
            }
        }

        if (configOfTimer.hint === "bigRest") {
            if (configOfTimer.seconds == 60){
                configOfTimer.seconds--;
                configOfTimer.minuteOfBigRest--;
            }
            minute = configOfTimer.minuteOfBigRest;
            if (configOfTimer.countOfRest === 0 ){

                configOfTimer.countOfRest = configOfTimer.cloneConfig.countOfRest;
            }
            if (configOfTimer.seconds === -1){
                configOfTimer.minuteOfBigRest--;
                configOfTimer.seconds = 59;
                if (configOfTimer.minuteOfBigRest === -1){
                    configOfTimer.seconds = 61;
                    configOfTimer.minuteOfBigRest = configOfTimer.cloneConfig.minuteOfBigRest;
                    configOfTimer.minuteOfWork = configOfTimer.cloneConfig.minuteOfWork;
                    configOfTimer.hint = "work";
                    return;
                }
            }
        }

        let timeString = this._createStringForDisplayTimer(minute);
        this._drawDisplayTimer(timeString);

    }

    timeRun() {
        let blockTimer = document.querySelector(".blockTimer");
        blockTimer.classList.add("deactivate");


        let buttonStartStop = this.timerDOM.querySelector(".start");
        buttonStartStop.innerHTML = "СТОП";

        this.workTimeConfig = this._getWorkTimeConfig();

        this.onTimer = true;

        let handlerSetInterval = function () {

            this._timeController(this.workTimeConfig);
        };
        handlerSetInterval = handlerSetInterval.bind(this);

        this.timerId = setInterval(handlerSetInterval , 100);

    }

    stopTimeRun() {
        let blockTimer = document.querySelector(".blockTimer");
        blockTimer.classList.remove("deactivate");

        let buttonStartStop = this.timerDOM.querySelector(".start");
        this.onTimer = false;
        clearInterval(this.timerId);
        buttonStartStop.innerHTML = "СТАРТ";
    }

    resetTimer() {

        this.onTimer = false;
        clearInterval(this.timerId);
        this.workTimeConfig = this._getWorkTimeConfig();

        let timeString = this._createStringForDisplayTimer(this.workTimeConfig.minuteOfWork);
        this._drawDisplayTimer(timeString);

    }

    _getWorkTimeConfig() {
        let minuteOfWork = Number(this.timerDOM
            .querySelector(".timeHidden")
            .innerHTML
            .slice(0 , 2));
        let valueRest = Number( this.timerDOM
            .querySelector(".roundHidden")
            .innerHTML);


        let minuteOfRest = Number(this.timerDOM
            .querySelector(".restHidden")
            .innerHTML);
        let minuteOfBigRest = Number(this.timerDOM
            .querySelector(".bigRestHidden")
            .innerHTML);
        // let seconds = Number(this.timerDOM
        //     .querySelector(".currentSecondsAndMinute")
        //     .innerHTML
        //     .slice(3 , 5));
        let nameCurrentPeriodValue = this.timerDOM
            .querySelector(".nameCurrentPeriod")
            .innerHTML;
        let hint;
        switch (nameCurrentPeriodValue) {
            case "Работа":
                hint = "work";
                break;
            case "Перемена":
                hint = "rest";
                break;
            case "Перерыв":
                hint = "bigRest";
                break;
        }

        let config = {
            hint ,
            seconds : 0 ,
            minuteOfWork    : minuteOfWork ,
            minuteOfRest    : minuteOfRest ,
            minuteOfBigRest : minuteOfBigRest ,
            valueRest ,
        };
        config.cloneConfig = Object.assign({
        } , config);


        return config ;

    }

    _getSoundConfig() {
        return {
            volume        : 2 ,
            flip          : false ,
            soundOfSignal : "beep" ,
        };
    }

    _configurationButtons(){
        let self = this;
        let buttonStartStop = this.timerDOM.querySelector(".start");
        let buttonReset = this.timerDOM.querySelector(".reset");

        buttonStartStop.addEventListener("click" , function (event) {
            if (self.onTimer) {
                self.stopTimeRun();
            }
            else {
                self.timeRun();

            }
        });
        buttonReset.addEventListener("click" , function () {
            self.stopTimeRun();
            self.resetTimer();
        });
    }
}
