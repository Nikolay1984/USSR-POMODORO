
Object.defineProperty( exports , "__esModule" , {
    value: true ,
} );
exports.default = _default;

function _default( config ) {

    function handlerMouseDown( e ) {

        function handlerMouseMove( e ) {

            // когда крутим крутилку тут меняем звук на всех элементах

            const volume = takeVolumeSound();
            checkSoundInputAll.forEach( function ( elem ) {

                elem.children[ 0 ].volume = volume;

            } );

        }

        document.addEventListener( "mousemove" , handlerMouseMove );
        document.addEventListener( "mouseup" , function () {

            document.removeEventListener( "mousemove" , handlerMouseMove );

        } , {
            once: true ,
        } );

    }

    function handlerClickChangeBeepAndAlarm( e ) {

        const timerIsRun = document.querySelector( ".start " ).classList.contains( ".timerRun" );

        function handlerClickSound() {

            if ( !targetAudioElem.paused ) {

                targetAudioElem.pause();
                return;

            }

            if ( timerIsRun && parentTarget.classList.contains( "checkAlarm" ) ) {

                return;

            }

            activeAudioElements.forEach( function ( elem ) {

                const activeAudioElem = elem.children[ 0 ];
                activeAudioElem.pause();
                activeAudioElem.currentTime = 0;
                targetAudioElem.loop = false;

            } );

            if ( timerIsRun ) {

                targetAudioElem.loop = true;

            }

            targetAudioElem.play();

        }

        const {
            target ,
        } = e;

        if ( target.className.indexOf( "checkSoundInput" ) === -1 ) {

            return;

        }

        const {
            currentTarget ,
        } = e;
        const activeAudioElements = currentTarget.querySelectorAll( ".checkSoundInputActive" );
        const parentTarget = target.parentElement;
        const targetAudioElem = target.children[ 0 ];
        const activeElem = parentTarget.querySelector( ".checkSoundInputActive" );
        activeElem.classList.remove( "checkSoundInputActive" );
        target.classList.add( "checkSoundInputActive" );
        handlerClickSound();

    }

    function defaultLoading() {

        // задаем звук при загрузке страницы

        const volume = takeVolumeSound();
        checkSoundInputAll.forEach( function ( elem ) {

            elem.children[ 0 ].volume = volume;

        } ); // позиционирование начальное крутилки на странице

        ballVolume.style.top = 0;
        ballVolume.style.left = circleBigHeight / 2 - ballHeight / 2 + "px";

    }

    function handlerClickButtonOnOffSound( e ) {

        const soundIsOn = buttonOnOffSound.classList.contains( "soundOn" );

        if ( soundIsOn ) {

            checkSoundInputAll.forEach( ( elem ) => {

                elem.children[ 0 ].muted = true;

            } );
            buttonOnOffSound.classList.remove( "soundOn" );
            buttonOnOffSound.innerHTML = "ВКЛ ЗВУК";
            return;

        }

        checkSoundInputAll.forEach( ( elem ) => {

            elem.children[ 0 ].muted = false;

        } );
        buttonOnOffSound.classList.add( "soundOn" );
        buttonOnOffSound.innerHTML = "ВЫКЛ ЗВУК";

    }

    function handlerChangePeriodOfSound() {

        const timerIsRun = buttonStartStop.classList.contains( "timerRun" );
        const activeAlarm = alarmElementParent.querySelector( ".checkSoundInputActive" ).children[ 0 ];
        const activeBeep = beepElementParent.querySelector( ".checkSoundInputActive" ).children[ 0 ];
        activeAlarm.addEventListener( "ended" , function () {

            console.log( "timerIsRun" );

            if ( timerIsRun ) {

                activeBeep.loop = true;
                activeBeep.play();

            }

        } , {
            once: true ,
        } );
        activeBeep.pause();
        activeAlarm.play();

    }

    function takeVolumeSound() {

        const value = Number( currentVolume.innerHTML ) / 100;
        return value;

    }

    const checkSoundInputAll = document.querySelectorAll( ".checkSoundInput" );
    const wrapperControlSound = document.querySelector( ".wrapperControlSound" );
    const ballVolume = document.querySelector( ".ballVolume" );
    const circleBigVolume = document.querySelector( ".circleBigVolume" );
    const buttonOnOffSound = document.querySelector( ".onOffSound" );
    const nameCurrentPeriod = document.querySelector( ".nameCurrentPeriod" );
    const buttonStartStop = document.querySelector( ".start" );
    const beepElementParent = document.querySelector( ".checkBeep" );
    const alarmElementParent = document.querySelector( ".checkAlarm" );
    const currentVolume = document.querySelector( ".currentVolume" );
    const circleBigHeight = circleBigVolume.offsetHeight;
    const ballHeight = ballVolume.offsetHeight;
    const observeNameCurrentPeriod = new MutationObserver( handlerChangePeriodOfSound );
    const configMutationObserver = {
        childList     : true ,
        characterData : true ,
    };
    observeNameCurrentPeriod.observe( nameCurrentPeriod , configMutationObserver );
    wrapperControlSound.addEventListener( "click" , handlerClickChangeBeepAndAlarm );
    ballVolume.addEventListener( "mousedown" , handlerMouseDown );
    buttonOnOffSound.addEventListener( "click" , handlerClickButtonOnOffSound );
    defaultLoading();

}

module.exports = exports.default;