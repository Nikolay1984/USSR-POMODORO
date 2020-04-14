export default function (config) {
    function handlerMouseDown(e) {

        function handlerMouseMove(e){
            let activeElements = document.querySelectorAll(".checkSoundInputActive");

            let volume =  Number(document.querySelector(".currentVolume").innerHTML)/100;

            activeElements.forEach(function (elem) {
                elem.children[0].volume = volume;

            })
        };

        document.addEventListener("mousemove",handlerMouseMove);

        this.addEventListener("mouseup",function () {

            document.removeEventListener("mousemove",handlerMouseMove);

        },{once:true});
    }
    function handlerClickChangeBeepAndAlarm ( e ) {
        let timerIsRun = document.querySelector(".start ").classList.contains(".timerRun");
        //TODO


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


            let rate = Number(document.querySelector(".currentVolume").innerHTML) /100;



            targetAudioElem.volume = rate;
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
        let rate = Number(document.querySelector(".currentVolume").innerHTML) /100;
        arrCheckSoundInputActive.forEach(function (elem) {
            elem.children[0].volume = rate;
        })
    }
    function handlerClickButtonOnOffSound(e){
        let activeElement = document.querySelectorAll(".checkSoundInputActive");
        let checkSoundInput = document.querySelectorAll(".checkSoundInput");


        if(!buttonOnOffSound.classList.contains("soundOn")){
            buttonOnOffSound.innerHTML = "ВКЛ ЗВУК";
            buttonOnOffSound.classList.add("soundOn");
            circleBigVolume.classList.add("deactivate");
            ballVolume.removeEventListener("mousedown", config.handlerMouseDown);
            activeElement.forEach((elem) => elem.children[0].volume = 0);
            checkSoundInput.forEach((elem) => elem.classList.add("deactivate"));
            wrapperControlSound.removeEventListener("click",handlerClickChangeBeepAndAlarm);


            return

        }
        let volume = Number(document.querySelector(".currentVolume").innerHTML)/100;
        buttonOnOffSound.innerHTML = "ВЫКЛ ЗВУК";
        buttonOnOffSound.classList.remove("soundOn");
        circleBigVolume.classList.remove("deactivate");
        ballVolume.addEventListener("mousedown", config.handlerMouseDown);
        activeElement.forEach((elem) => elem.children[0].volume = volume);
        checkSoundInput.forEach((elem) => elem.classList.remove("deactivate"));
        wrapperControlSound.addEventListener( "click" , handlerClickChangeBeepAndAlarm );

    }

    let wrapperControlSound = document.querySelector( ".wrapperControlSound" );
    let ballVolume = document.querySelector( ".ballVolume" );
    let circleBigVolume = document.querySelector( ".circleBigVolume" );
    let buttonOnOffSound = document.querySelector(".onOffSound")
    let circleBigHeight = circleBigVolume.offsetHeight;
    let ballHeight = ballVolume.offsetHeight;

    ballVolume.style.top = 0;
    ballVolume.style.left = ( circleBigHeight / 2 ) - ( ballHeight / 2 ) + "px";


    wrapperControlSound.addEventListener( "click" , handlerClickChangeBeepAndAlarm );



    ballVolume.addEventListener("mousedown",handlerMouseDown);
    buttonOnOffSound.addEventListener("click",handlerClickButtonOnOffSound)




    defaultLoading()
}