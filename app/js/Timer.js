export default class Timer {

    constructor(className , configBehavior) {

        this.timerDOM = document.querySelector("." + className);
        this.onTimer = false;
        this.workTimeConfig;
        this.soundConfig = this._getSoundConfig();
        this.flagChangeSetting = false;
        this._drawDisplayTimer = this._drawDisplayTimer.bind(this);
        this._createStringForDisplayTimer =
            this._createStringForDisplayTimer.bind(this);
        this._timeController = this._timeController.bind(this);
        this.configBehavior = configBehavior;
        this.buttonStartStop = this.timerDOM.querySelector(".start");
        this._configurationButtons();
        this.beepElementParent = document.querySelector(".checkBeep");
        this.alarmElementParent = document.querySelector(".checkAlarm");
        this.displaySecondsAndMinuteDiv =
            this.timerDOM.querySelector(".currentSecondsAndMinute");
        this.displayCountOfWorkDiv =
            this.timerDOM.querySelector(".currentCountOfWork");
        this.nameCurrentPeriod =
            this.timerDOM.querySelector(".nameCurrentPeriod");
    }

    _drawDisplayTimer(stringSecondAndMinute) {
        let currentValuePeriod = this.nameCurrentPeriod.innerHTML === "Работа" ?
            "work" :
            this.nameCurrentPeriod.innerHTML === "Перемена" ? "rest" : "bigRest";



        let numberOfWork;
        let numberOfRest = this.workTimeConfig.countOfRest;
        if (numberOfRest === 0) {

            numberOfWork = "Последний";
            this.displayCountOfWorkDiv.classList.add("lastWork");

        } else {

            numberOfWork = this.workTimeConfig.countOfRest;
            this.displayCountOfWorkDiv.classList.remove("lastWork");

        }

        if(this.workTimeConfig.hint !== currentValuePeriod) {
            switch (this.workTimeConfig.hint) {

            case "work":
                this.displayCountOfWorkDiv.classList.remove("styleRest");
                this.nameCurrentPeriod.innerHTML = "Работа";
                break;

            case "rest":
                this.displayCountOfWorkDiv.classList.add("styleRest");
                this.nameCurrentPeriod.innerHTML = "Перемена";
                break;

            case "bigRest":
                this.displayCountOfWorkDiv.classList.add("styleRest");
                this.nameCurrentPeriod.innerHTML = "Перерыв";
                break;

            }
        }
        this.displaySecondsAndMinuteDiv.innerHTML = stringSecondAndMinute;
        this.displayCountOfWorkDiv.innerHTML = numberOfWork;

    }

    _createStringForDisplayTimer(minute) {

        let minuteString = "";
        let secondsString = "";
        if (minute < 10) {

            minuteString = "0" + minute;

        } else {

            minuteString = String(minute);

        }

        if (this.workTimeConfig.seconds < 10) {

            secondsString = "0" + this.workTimeConfig.seconds;

        } else {

            secondsString = String(this.workTimeConfig.seconds);

        }

        let currentTimeString = `${minuteString}:${secondsString}`;
        return currentTimeString;

    }

    _timeController(configOfTimer) {

        let minute;
        configOfTimer.seconds--;

        if (configOfTimer.hint === "work") {

            if (configOfTimer.seconds == 60) {

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
                    configOfTimer.seconds = 61;
                    configOfTimer.minuteOfWork =
                        configOfTimer.cloneConfig.minuteOfWork;
                    return;

                }

            }

        }

        if (configOfTimer.hint === "rest") {

            if (configOfTimer.seconds == 60) {

                configOfTimer.seconds--;
                configOfTimer.minuteOfRest--;

            }

            minute = configOfTimer.minuteOfRest;

            if (configOfTimer.seconds === -1) {

                configOfTimer.minuteOfRest--;
                configOfTimer.seconds = 59;

                if (configOfTimer.minuteOfRest === -1) {

                    configOfTimer.seconds = 61;
                    configOfTimer.minuteOfRest =
                        configOfTimer.cloneConfig.minuteOfRest;
                    configOfTimer.hint = "work";
                    return;

                }

            }

        }

        if (configOfTimer.hint === "bigRest") {

            if (configOfTimer.seconds == 60) {

                configOfTimer.seconds--;
                configOfTimer.minuteOfBigRest--;

            }

            minute = configOfTimer.minuteOfBigRest;
            if (configOfTimer.countOfRest === 0) {

                configOfTimer.countOfRest =
                    configOfTimer.cloneConfig.countOfRest;

            }

            if (configOfTimer.seconds === -1) {

                configOfTimer.minuteOfBigRest--;
                configOfTimer.seconds = 59;
                if (configOfTimer.minuteOfBigRest === -1) {

                    configOfTimer.seconds = 61;
                    configOfTimer.minuteOfBigRest =
                        configOfTimer.cloneConfig.minuteOfBigRest;
                    configOfTimer.minuteOfWork =
                        configOfTimer.cloneConfig.minuteOfWork;
                    configOfTimer.hint = "work";
                    return;

                }

            }

        }

        let timeString = this._createStringForDisplayTimer(minute);
        this._drawDisplayTimer(timeString);

    }

    timeRun() {

        //запускаем бип при старте

        let activeSoundElement = this.beepElementParent.querySelector(
            ".checkSoundInputActive");
        activeSoundElement.children[0].loop = true;
        activeSoundElement.children[0].play();

        //делаем неактивными крутилки как только нажали на старт
        for (let key in this.configBehavior) {

            if (this.configBehavior[key].hint === "sound") {

                continue;

            }

            this.configBehavior[key].ball.removeEventListener("mousedown" ,
                this.configBehavior[key].handlerMouseDown);
            this.configBehavior[key].circleBig.classList.add("deactivate");

        }
        //--------------------------------------------

        // настройка таймера

        let config;
        // flagChangeSetting - смотри за тем когда мы нажали сбросить и собирает настройки с крутилок, в стопе ставиться в тру и сюда тогда не попадает


        if (!this.flagChangeSetting) {

            config = this._getWorkTimeConfig();
            this.workTimeConfig = config;

        } else {

            let currentConfig = this._getWorkTimeConfig();// текущие значения с крутилок
            let cloneConfig = this.workTimeConfig.cloneConfig;// старые значения клона

            //удаляем те настройки которые не поменялись, кроме клона - он всегда не будет равен и попадет в currentConfig

            //______________________________________________________

            for (let key in currentConfig) {

                if (currentConfig[key] == cloneConfig[key]) {

                    delete currentConfig[key];

                }

            }

            for (let key in this.workTimeConfig) {

                if (currentConfig[key]) {

                    this.workTimeConfig[key] = currentConfig[key];
                    if ((key == "minuteOfWork" && this.workTimeConfig.hint ==
                        "work") ||
                        (key == "minuteOfRest" && this.workTimeConfig.hint ==
                            "rest")
                        ||
                        (key == "minuteOfBigRest" && this.workTimeConfig.hint ==
                            "bigRest")) {

                        this.workTimeConfig.seconds = 0;

                    }

                }

            }

            config = this.workTimeConfig;

        }


        //запуск настроенного таймера

        let handlerSetInterval = function () {

            this._timeController(config);

        };
        handlerSetInterval = handlerSetInterval.bind(this);
        this.timerId = setInterval(handlerSetInterval , 100);
        this.buttonStartStop.innerHTML = "СТОП";
        this.buttonStartStop.classList.add(".timerRun");
        this.onTimer = true;

    }

    stopTimeRun() {

        let activeBeep = this.beepElementParent.querySelector(
            ".checkSoundInputActive").children[0];
        let activeAlarm = this.alarmElementParent.querySelector(
            ".checkSoundInputActive").children[0];

        activeBeep.loop = false;
        activeBeep.pause();
        activeBeep.currentTime = 0;

        activeAlarm.pause();
        activeAlarm.currentTime = 0;

        this.flagChangeSetting = true;
        for (let key in this.configBehavior) {

            if (this.configBehavior[key].hint === "sound") {

                continue;

            }

            this.configBehavior[key].ball.addEventListener("mousedown" ,
                this.configBehavior[key].handlerMouseDown);
            this.configBehavior[key].circleBig.classList.remove("deactivate");

        }


        this.onTimer = false;
        clearInterval(this.timerId);
        this.buttonStartStop.innerHTML = "СТАРТ";
        this.buttonStartStop.classList.remove(".timerRun");

    }

    resetTimer() {


        this.nameCurrentPeriod.innerHTML = "Работа";
        this.flagChangeSetting = false;
        this.onTimer = false;
        clearInterval(this.timerId);
        this.workTimeConfig = this._getWorkTimeConfig();

        let timeString = this._createStringForDisplayTimer(
            this.workTimeConfig.minuteOfWork);
        this._drawDisplayTimer(timeString);
         this.buttonStartStop.classList.remove(".timerRun");
    }

    _getWorkTimeConfig() {

        let minuteOfWork = Number(this.timerDOM
            .querySelector(".timeHidden")
            .innerHTML
            .slice(0 , 2));
        let valueRest = Number(this.timerDOM
            .querySelector(".roundHidden")
            .innerHTML);


        let minuteOfRest = Number(this.timerDOM
            .querySelector(".restHidden")
            .innerHTML);
        let minuteOfBigRest = Number(this.timerDOM
            .querySelector(".bigRestHidden")
            .innerHTML);

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
            seconds: 0 ,
            minuteOfWork: minuteOfWork ,
            minuteOfRest: minuteOfRest ,
            minuteOfBigRest: minuteOfBigRest ,
            countOfRest: valueRest ,
        };
        config.cloneConfig = Object.assign({} , config);


        return config;

    }

    _getSoundConfig() {

        return {
            volume: 2 ,
            flip: false ,
            soundOfSignal: "beep" ,
        };

    }

    _configurationButtons() {

        let self = this;

        let buttonReset = this.timerDOM.querySelector(".reset");

        this.buttonStartStop.addEventListener("click" , function (event) {

            if (self.onTimer) {

                self.stopTimeRun();

            } else {

                self.timeRun();

            }

        });
        buttonReset.addEventListener("click" , function () {

            self.stopTimeRun();
            self.resetTimer();

        });

    }

}
