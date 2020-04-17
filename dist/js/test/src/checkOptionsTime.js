
Object.defineProperty( exports , "__esModule" , {
    value: true ,
} );
exports.default = _default;

function _default() {

    function handlerChangeOfTime( arr ) {

        const outputElement = document.querySelector( ".currentSecondsAndMinute" );
        const period = document.querySelector( ".nameCurrentPeriod" ).innerHTML;
        const value = arr[ 0 ].target.innerText;
        const valueFormatting = Number( value.slice( 0 , 2 ) );
        square.style.left = valueFormatting + "%";

        if ( period === "Работа" ) {

            outputElement.innerHTML = value;

        }

    }

    function handlerMouseDownTime() {

        const self = this;
        const position = {
            top  : square.offsetTop - 20 + "px" ,
            left : square.offsetLeft + 5 + "px" ,
        };
        timeHidden.style.display = "block";
        timeHidden.style.top = position.top;
        timeHidden.style.left = position.left;

        function handlerMove( e ) {

            timeHidden.style.top = square.offsetTop - 20 + "px";
            timeHidden.style.left = square.offsetLeft + 5 + "px";

        }

        document.addEventListener( "mousemove" , handlerMove );
        document.addEventListener( "mouseup" , function () {

            document.removeEventListener( "mousemove" , handlerMove );
            timeHidden.style.display = "none";

        } , {
            once: true ,
        } );

    }

    const square = document.querySelector( ".labelTime " );
    const timeHidden = document.querySelector( ".timeHidden " );
    const configMutationObserver = {
        childList     : true ,
        characterData : true ,
    };
    const observeOfTimeHidden = new MutationObserver( handlerChangeOfTime );
    observeOfTimeHidden.observe( timeHidden , configMutationObserver );
    const circleBig = document.querySelector( ".circleBigTime " );
    const ballTime = circleBig.querySelector( ".ballTime" );
    ballTime.addEventListener( "mousedown" , handlerMouseDownTime );
    const ballHeight = ballTime.offsetHeight;
    const circleBigHeight = circleBig.offsetHeight;
    ballTime.style.top = ( circleBigHeight - ballHeight ) / 2 + "px";
    ballTime.style.left = circleBigHeight - ballHeight + "px";
    timeHidden.innerHTML = "25:00";

}

module.exports = exports.default;