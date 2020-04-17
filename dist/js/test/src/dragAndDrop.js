
Object.defineProperty( exports , "__esModule" , {
    value: true ,
} );
exports.default = _default;

function _default( config ) {

    // Get target objects from page and create new slider elements

    const target = document.querySelector( config.selectorTargetToPage );
    const outputElem = document.querySelector( config.selectorOutputElem );
    const {
        minPosition ,
    } = config;
    const {
        maxRange ,
    } = config;
    const {
        hint ,
    } = config;
    const {
        limiter ,
    } = config;
    const ball = document.createElement( "div" );
    const circleBig = document.createElement( "div" );
    const circleSmall = document.createElement( "div" );
    const {
        objNamesOfSlider ,
    } = config;
    const maxLengthCirclePercent = 99;
    let saveLengthCirclePercent = 0; // Configure slider  elements and add to page

    for ( const nameOfArrNamesElem in objNamesOfSlider ) {

        const arrNames = objNamesOfSlider[ nameOfArrNamesElem ];

        if ( nameOfArrNamesElem === "arrClassNamesBall" ) {

            addClassNameToElemFromArr( arrNames , ball );

        }
        else if ( nameOfArrNamesElem === "arrClassNamesCircleBig" ) {

            addClassNameToElemFromArr( arrNames , circleBig );

        }
        else if ( nameOfArrNamesElem === "arrClassNamesCircleSmall" ) {

            addClassNameToElemFromArr( arrNames , circleSmall );

        }

    }

    circleBig.prepend( ball , circleSmall );
    target.prepend( circleBig ); // Imitation of drag and drop

    function handlerMouseDown( e ) {

        const handlerMousemoveBind = handlerMousemove.bind( this );
        document.addEventListener( "mousemove" , handlerMousemoveBind );
        document.addEventListener( "mouseup" , function ( e ) {

            document.removeEventListener( "mousemove" , handlerMousemoveBind );

        } , {
            once: true ,
        } );

    }

    ball.addEventListener( "dragstart" , function ( e ) {

        e.preventDefault();

    } );
    ball.addEventListener( "mousedown" , handlerMouseDown ); // Use function

    function handlerMousemove( e ) {

        const ball = this;
        const ballCords = {
            offsetLeft : ball.offsetLeft ,
            offsetTop  : ball.offsetTop ,
            viewX      : ball.getBoundingClientRect().x ,
            viewY      : ball.getBoundingClientRect().y ,
            radius     : ball.offsetWidth / 2 ,
        };
        const mouseCords = {
            x : e.clientX ,
            y : e.clientY ,
        };
        const parent = this.offsetParent;
        const parentRadius = parent.offsetWidth / 2;
        const innerRadius = parentRadius - ballCords.radius;
        const mouseCordsDecard = {
            x : mouseCords.x - ballCords.viewX + ballCords.offsetLeft - parentRadius ,
            y : mouseCords.y - ballCords.viewY + ballCords.offsetTop - parentRadius ,
        };
        const mouseCordsPolar = {
            angle: Math.atan( mouseCordsDecard.y / mouseCordsDecard.x ) ,
        };

        if ( mouseCordsDecard.x < 0 ) {

            mouseCordsPolar.angle = mouseCordsPolar.angle + Math.PI;

        }

        const targetCordsDecard = {
            x : innerRadius * Math.cos( mouseCordsPolar.angle ) ,
            y : innerRadius * Math.sin( mouseCordsPolar.angle ) ,
        };
        const targetCordsOffset = {
            x : parentRadius + targetCordsDecard.x - ballCords.radius ,
            y : parentRadius + targetCordsDecard.y - ballCords.radius ,
        };
        const currentArc = calculateValuePosition( mouseCordsPolar.angle , innerRadius );

        if ( limiter ) {

            if ( saveLengthCirclePercent == maxLengthCirclePercent && ( currentArc >= maxLengthCirclePercent || currentArc < 50 ) ) {

                return;

            }

            if ( saveLengthCirclePercent <= 10 && currentArc > 50 ) {

                return;

            }

            saveLengthCirclePercent = currentArc;

        }

        ball.style.left = targetCordsOffset.x + "px";
        ball.style.top = targetCordsOffset.y + "px";
        outputElem.innerHTML = calculateValuePosition( mouseCordsPolar.angle , innerRadius , maxRange , hint , minPosition );

    }

    function addClassNameToElemFromArr( arrNames , elem ) {

        for ( let i = 0; i < arrNames.length; i++ ) {

            elem.classList.add( arrNames[ i ] );

        }

    }

    function calculateValuePosition( angle , radius , maxRange = 100 , hint , minPosition ) {

        const lengthCircle = radius * 2 * Math.PI;
        const correctAngle = ( angle + Math.PI / 2 ) * 57;
        const lengthArc = correctAngle * Math.PI * radius / 180;
        const value = Math.round( lengthArc / ( lengthCircle / 100 ) );
        let resultValue = Math.ceil( value * maxRange / 100 );

        if ( resultValue < minPosition ) {

            resultValue = minPosition;

        }

        switch ( hint ) {

            case "round" :
                break;

            case "time" :
                if ( resultValue < 10 ) {

                    resultValue = "0" + resultValue;

                }

                resultValue = resultValue + ":00";
                break;

            case "rest" :
                break;

            case "sound" :
                if ( resultValue < 10 ) {

                    resultValue = "0" + resultValue;

                }

                break;

        }

        return resultValue;

    }

    return {
        ball ,
        circleBig ,
        hint ,
        handlerMouseDown ,
    };

}

module.exports = exports.default;