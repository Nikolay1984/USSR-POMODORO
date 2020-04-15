export default function (config) {
    function handlerMouseDown(e) {

        function handlerMouseMove(e){
            let activeElements = document.querySelectorAll(".checkSoundInputActive");

            activeElements.forEach(function (elem) {
                elem.children[0].volume = takeVolumeSound();

            })
        };

        document.addEventListener("mousemove",handlerMouseMove);

        this.addEventListener("mouseup",function () {

            document.removeEventListener("mousemove",handlerMouseMove);

        },{once:true});
    }
    function handlerClickChangeBeepAndAlarm ( e ) {
        let timerIsRun = document.querySelector(".start ").classList.contains(".timerRun");

        function handlerClickSound() {

            if(!targetAudioElem.paused){
                targetAudioElem.pause();
                return
            }

            activeAudioElements.forEach(function (elem) {
                let activeAudioElem = elem.children[ 0 ];
                activeAudioElem.pause();
                activeAudioElem.currentTime = 0;
            })

            // targetAudioElem.volume = takeVolumeSound();
            if(timerIsRun){
                if(parentTarget.classList.contains("checkAlarm")){
                    targetAudioElem = beepElementParent.querySelector(".checkSoundInputActive").children[0];
                }
                targetAudioElem.loop = true;
            }
            targetAudioElem.play();



        }
        let target = e.target;
        if ( target.className.indexOf( "checkSoundInput" ) === -1 ) {

            return;

        }
        let currentTarget = e.currentTarget;
        let activeAudioElements = currentTarget.querySelectorAll(".checkSoundInputActive");
        let parentTarget = target.parentElement;
        let targetAudioElem = target.children[ 0 ];
        let activeElem = parentTarget.querySelector( ".checkSoundInputActive" );

        activeElem.classList.remove( "checkSoundInputActive" );
        target.classList.add( "checkSoundInputActive" );

        handlerClickSound()
    }
    function defaultLoading() {
        let arrCheckSoundInputActive = document.querySelectorAll(".checkSoundInputActive");
        arrCheckSoundInputActive.forEach(function (elem) {
            elem.children[0].volume =  takeVolumeSound();
        })
    }
    function handlerClickButtonOnOffSound(e){
        let soundIsOn = buttonOnOffSound.classList.contains("soundOn");

        if(soundIsOn){
            let checkSoundInputs = document.querySelectorAll(".checkSoundInput");
            checkSoundInputs.forEach((elem) => elem.children[0].volume = 0);
            buttonOnOffSound.classList.remove("soundOn");
            buttonOnOffSound.innerHTML = "ВКЛ ЗВУК";
            ballVolume.removeEventListener("mousedown",handlerMouseDown);
            //TODO
        }




        // let activeElements = document.querySelectorAll(".checkSoundInputActive");
        // let checkSoundInputs = document.querySelectorAll(".checkSoundInput");
        //
        //
        // if(!buttonOnOffSound.classList.contains("soundOn")){
        //     buttonOnOffSound.innerHTML = "ВКЛ ЗВУК";
        //     buttonOnOffSound.classList.add("soundOn");
        //     circleBigVolume.classList.add("deactivate");
        //     ballVolume.removeEventListener("mousedown", config.handlerMouseDown);
        //     activeElements.forEach((elem) => elem.children[0].volume = 0);
        //     checkSoundInputs.forEach((elem) => elem.classList.add("deactivate"));
        //     wrapperControlSound.removeEventListener("click",handlerClickChangeBeepAndAlarm);
        //
        //     return
        // }
        // let volume = takeVolumeSound();
        // buttonOnOffSound.innerHTML = "ВЫКЛ ЗВУК";
        // buttonOnOffSound.classList.remove("soundOn");
        // circleBigVolume.classList.remove("deactivate");
        // ballVolume.addEventListener("mousedown", config.handlerMouseDown);
        // activeElements.forEach((elem) => elem.children[0].volume = volume);
        // checkSoundInputs.forEach((elem) => elem.classList.remove("deactivate"));
        // wrapperControlSound.addEventListener( "click" , handlerClickChangeBeepAndAlarm );

    }
    function handlerChangePeriodOfSound(){
        let timerIsRun = buttonStartStop.classList.contains("timerRun");
        let activeAlarm = document.querySelector(".checkAlarm").querySelector(".checkSoundInputActive").children[0];
        let activeBeep = document.querySelector(".checkBeep").querySelector(".checkSoundInputActive").children[0];

        activeAlarm.addEventListener("ended",function () {
            if(timerIsRun) {
                activeBeep.volume = takeVolumeSound();
                activeBeep.play();
            }
        },{once:true});

        activeBeep.pause();
         activeAlarm.volume = takeVolumeSound();
        activeAlarm.play();

    }
    function takeVolumeSound(){
        let value = Number(currentVolume.innerHTML)/100;
        return value
    }

    let wrapperControlSound = document.querySelector( ".wrapperControlSound" );
    let ballVolume = document.querySelector( ".ballVolume" );
    let circleBigVolume = document.querySelector( ".circleBigVolume" );
    let buttonOnOffSound = document.querySelector(".onOffSound");
    let nameCurrentPeriod = document.querySelector(".nameCurrentPeriod");
    let buttonStartStop = document.querySelector(".start");
    let beepElementParent = document.querySelector(".checkBeep");
    let alarmElementParent = document.querySelector(".checkAlarm");
    let circleBigHeight = circleBigVolume.offsetHeight;
    let ballHeight = ballVolume.offsetHeight;
    let currentVolume = document.querySelector(".currentVolume");
    ballVolume.style.top = 0;
    ballVolume.style.left = ( circleBigHeight / 2 ) - ( ballHeight / 2 ) + "px";

    let observeNameCurrentPeriod = new MutationObserver(handlerChangePeriodOfSound);
    let configMutationObserver = {
        childList     : true ,
        characterData : true ,
    };
    observeNameCurrentPeriod.observe(nameCurrentPeriod, configMutationObserver);

    wrapperControlSound.addEventListener( "click" , handlerClickChangeBeepAndAlarm );


    ballVolume.addEventListener("mousedown",handlerMouseDown);
    buttonOnOffSound.addEventListener("click",handlerClickButtonOnOffSound)




    defaultLoading()
}