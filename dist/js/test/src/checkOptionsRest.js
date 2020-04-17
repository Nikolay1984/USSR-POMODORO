
Object.defineProperty( exports , "__esModule" , {
    value: true ,
} );
exports.default = _default;

function _default() {

    function handlerChangeOfRest( arr ) {

        let triangle;
        let maxRange;
        const outputElement = document.querySelector( ".currentSecondsAndMinute" );
        const period = document.querySelector( ".nameCurrentPeriod" ).innerHTML;
        const value = Number( arr[ 0 ].target.innerText );

        if ( arr[ 0 ].target.className === "bigRestHidden" ) {

            maxRange = 30;
            triangle = document.querySelector( ".labelBigRest" );

            if ( period === "Перерыв" ) {

                let out = value;

                if ( value < 10 ) {

                    out = "0" + value;

                }

                outputElement.innerHTML = out + ":00";

            }

        }
        else if ( arr[ 0 ].target.className === "restHidden" ) {

            maxRange = 10;
            triangle = document.querySelector( ".labelRest" );

            if ( period === "Перемена" ) {

                let out = value;

                if ( value < 10 ) {

                    out = "0" + value;

                }

                outputElement.innerHTML = out + ":00";

            }

        }

        const parentHeight = document.querySelector( ".displayOfRests" ).offsetHeight;
        const lengthRange = parentHeight - parentHeight * 6 / 100;
        const offset = parentHeight * 3 / 100;
        let pos = value * lengthRange / maxRange - offset;

        if ( pos <= 1 ) {

            pos = offset;

        }

        triangle.style.top = pos + "px";

    }

    function handlerMouseDownRest( e ) {

        const self = this;
        let display;
        let position;

        if ( this.closest( ".controlMinuteOfBigRest" ) ) {

            display = bigRestHidden;
            position = {
                top  : labelBigRest.offsetTop - 20 + "px" ,
                left : labelBigRest.offsetLeft + "px" ,
            };

        }
        else if ( this.closest( ".controlMinuteOfRest" ) ) {

            display = restHidden;
            position = {
                top  : labelRest.offsetTop - 20 + "px" ,
                left : labelRest.offsetLeft - 20 + "px" ,
            };

        }

        display.style.display = "block";
        display.style.top = position.top;
        display.style.left = position.left;

        function handlerMove( e ) {

            if ( self.closest( ".controlMinuteOfBigRest" ) ) {

                bigRestHidden.style.top = labelBigRest.offsetTop - 20 + "px";
                bigRestHidden.style.left = labelBigRest.offsetLeft + "px";

            }
            else if ( self.closest( ".controlMinuteOfRest" ) ) {

                restHidden.style.top = labelRest.offsetTop - 20 + "px";
                restHidden.style.left = labelRest.offsetLeft - 20 + "px";

            }

        }

        document.addEventListener( "mousemove" , handlerMove );
        document.addEventListener( "mouseup" , function () {

            document.removeEventListener( "mousemove" , handlerMove );
            bigRestHidden.style.display = "none";
            restHidden.style.display = "none";

        } , {
            once: true ,
        } );

    }

    const bigRestHidden = document.querySelector( ".bigRestHidden" );
    const restHidden = document.querySelector( ".restHidden" );
    const configMutationObserver = {
        childList     : true ,
        characterData : true ,
    };
    const observeOfBigRestHidden = new MutationObserver( handlerChangeOfRest );
    observeOfBigRestHidden.observe( bigRestHidden , configMutationObserver );
    const observeOfRestHidden = new MutationObserver( handlerChangeOfRest );
    observeOfRestHidden.observe( restHidden , configMutationObserver );
    const controlMinuteOfBigRest = document.querySelector( ".controlMinuteOfBigRest" );
    const controlMinuteOfRest = document.querySelector( ".controlMinuteOfRest" );
    const controlMinuteOfBigRestBall = controlMinuteOfBigRest.querySelector( ".ball " );
    const controlMinuteOfRestBall = controlMinuteOfRest.querySelector( ".ball " );
    const labelBigRest = document.querySelector( ".labelBigRest" );
    const labelRest = document.querySelector( ".labelRest" );
    controlMinuteOfBigRestBall.addEventListener( "mousedown" , handlerMouseDownRest );
    controlMinuteOfRestBall.addEventListener( "mousedown" , handlerMouseDownRest );
    const circleBig = document.querySelector( ".circleBigRest " );
    const ballHeight = controlMinuteOfBigRestBall.offsetHeight;
    const circleBigHeight = circleBig.offsetHeight;
    controlMinuteOfBigRestBall.style.top = circleBigHeight - ballHeight + "px";
    controlMinuteOfRestBall.style.top = circleBigHeight - ballHeight + "px";
    bigRestHidden.innerHTML = 15;
    restHidden.innerHTML = 5;

}

module.exports = exports.default;