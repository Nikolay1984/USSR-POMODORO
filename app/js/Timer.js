export default class Timer {
    constructor(className, configBehavior) {
        this.timerDOM = document.querySelector("." + className);
        this.onTimer = false;
        this.workTimeConfig;
        this.soundConfig = this._getSoundConfig();
        this.flagChangeSetting = false;
        this._drawDisplayTimer = this._drawDisplayTimer.bind(this);
        this._createStringForDisplayTimer = this._createStringForDisplayTimer.bind(this);
        this._timeController = this._timeController.bind(this);
        this.configBehavior = configBehavior;
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
        for (let key in this.configBehavior){
            if (this.configBehavior[ key ].hint === "sound"){
                continue; 
            }
            this.configBehavior[ key ].ball.removeEventListener("mousedown" , this.configBehavior[ key ].handlerMouseDown);
            this.configBehavior[ key ].circleBig.classList.add("deactivate");
        }

        let buttonStartStop = this.timerDOM.querySelector(".start");
        buttonStartStop.innerHTML = "СТОП";

        let config;
        if (!this.flagChangeSetting){
            config = this._getWorkTimeConfig();
            this.workTimeConfig = config;

        }
        else {
            let currentConfig = this._getWorkTimeConfig();
            let cloneConfig = this.workTimeConfig.cloneConfig;

            for (let key in currentConfig){
                if (currentConfig[ key ] == cloneConfig[ key ]){
                    delete currentConfig[ key ] ;
                }
            }

            for (let key in this.workTimeConfig){
                if (currentConfig[ key ]){
                    this.workTimeConfig[ key ] = currentConfig[ key ];
                    if (key == "minuteOfWork" || key == "minuteOfRest" || key == "minuteOfBigRest" ){
                        this.workTimeConfig.seconds = 0;
                    }
                }
            }

            config = this.workTimeConfig;
        }

        this.onTimer = true;

        let handlerSetInterval = function () {

            this._timeController(config);
        };
        handlerSetInterval = handlerSetInterval.bind(this);

        this.timerId = setInterval(handlerSetInterval , 100);

    }

    stopTimeRun() {
        this.flagChangeSetting = true;
        for (let key in this.configBehavior){
            if (this.configBehavior[ key ].hint === "sound"){
                continue; 
            }
            this.configBehavior[ key ].ball.addEventListener("mousedown" , this.configBehavior[ key ].handlerMouseDown);
            this.configBehavior[ key ].circleBig.classList.remove("deactivate");
        }

        let buttonStartStop = this.timerDOM.querySelector(".start");
        this.onTimer = false;
        clearInterval(this.timerId);
        buttonStartStop.innerHTML = "СТАРТ";
    }

    resetTimer() {
        let nameCurrentPeriod = document.querySelector(".nameCurrentPeriod");
        nameCurrentPeriod.innerHTML = "Работа";
        this.flagChangeSetting = false;
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
            seconds         : 0 ,
            minuteOfWork    : minuteOfWork ,
            minuteOfRest    : minuteOfRest ,
            minuteOfBigRest : minuteOfBigRest ,
            countOfRest     : valueRest ,
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
