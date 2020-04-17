
Object.defineProperty( exports , "__esModule" , {
    value: true ,
} );
exports.default = _default;

function _default() {

    function handlerChangeOfRound( arr ) {

        const outputElement = document.querySelector( ".currentCountOfWork" );
        const value = Number( arr[ 0 ].target.innerText );
        const parentHeight = document.querySelector( ".displayOfTime" ).offsetWidth;
        let pos = value * parentHeight / 15 - 8;

        if ( pos <= 1 ) {

            pos = 0;

        }

        square.style.left = pos + "px";
        outputElement.innerHTML = value;

    }

    function handlerMouseDownRound() {

        const self = this;
        const position = {
            top  : square.offsetTop - 20 + "px" ,
            left : square.offsetLeft + 5 + "px" ,
        };
        roundHidden.style.display = "block";
        roundHidden.style.top = position.top;
        roundHidden.style.left = position.left;

        function handlerMove( e ) {

            roundHidden.style.top = square.offsetTop - 20 + "px";
            roundHidden.style.left = square.offsetLeft + 5 + "px";

        }

        document.addEventListener( "mousemove" , handlerMove );
        document.addEventListener( "mouseup" , function () {

            document.removeEventListener( "mousemove" , handlerMove );
            roundHidden.style.display = "none";

        } , {
            once: true ,
        } );

    }

    const square = document.querySelector( ".labelRound " );
    const roundHidden = document.querySelector( ".roundHidden " );
    const configMutationObserver = {
        childList     : true ,
        characterData : true ,
    };
    const observeOfRoundHidden = new MutationObserver( handlerChangeOfRound );
    observeOfRoundHidden.observe( roundHidden , configMutationObserver );
    const circleBig = document.querySelector( ".circleBigRound " );
    const ballTime = circleBig.querySelector( ".ballTime" );
    ballTime.addEventListener( "mousedown" , handlerMouseDownRound );
    const ballHeight = ballTime.offsetHeight;
    const circleBigHeight = circleBig.offsetHeight;
    ballTime.style.top = ( circleBigHeight - ballHeight ) / 2 + "px";
    ballTime.style.left = circleBigHeight - ballHeight + "px";
    roundHidden.innerHTML = "3";

}

module.exports = exports.default;