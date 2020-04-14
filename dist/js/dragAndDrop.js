export default function ( config ) {

    //Get target objects from page and create new slider elements

    let target = document.querySelector( config.selectorTargetToPage );
    let outputElem = document.querySelector( config.selectorOutputElem );
    let minPosition = config.minPosition;
    let maxRange = config.maxRange;
    let hint = config.hint;
    let limiter = config.limiter;
    let ball = document.createElement( "div" );
    let circleBig = document.createElement( "div" );
    let circleSmall = document.createElement( "div" );
    let objNamesOfSlider = config.objNamesOfSlider;
    const maxLengthCirclePercent = 99;
    let saveLengthCirclePercent = 0;
    //Configure slider  elements and add to page

    for ( let nameOfArrNamesElem in objNamesOfSlider ) {

        let arrNames = objNamesOfSlider[ nameOfArrNamesElem ];
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
    target.prepend( circleBig );


    //Imitation of drag and drop

    function handlerMouseDown ( e ) {

        let handlerMousemoveBind = handlerMousemove.bind( this );

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
    ball.addEventListener( "mousedown" , handlerMouseDown );

    //Use function

    function handlerMousemove( e ) {

        let ball = this;
        let ballCords = {
            offsetLeft : ball.offsetLeft ,
            offsetTop  : ball.offsetTop ,
            viewX      : ball.getBoundingClientRect().x ,
            viewY      : ball.getBoundingClientRect().y ,
            radius     : ball.offsetWidth / 2 ,
        };
        let mouseCords = {
            x : e.clientX ,
            y : e.clientY ,
        };

        let parent = this.offsetParent;
        let parentRadius = parent.offsetWidth / 2;
        let innerRadius = parentRadius - ballCords.radius;

        let mouseCordsDecard = {
            x : ( mouseCords.x - ballCords.viewX + ballCords.offsetLeft ) - parentRadius ,
            y : ( mouseCords.y - ballCords.viewY + ballCords.offsetTop ) - parentRadius ,
        };
        let mouseCordsPolar = {
            angle: Math.atan( mouseCordsDecard.y / mouseCordsDecard.x ) ,
        };
        if ( mouseCordsDecard.x < 0 ) {

            mouseCordsPolar.angle = mouseCordsPolar.angle + Math.PI;

        }


        let targetCordsDecard = {
            x : innerRadius * Math.cos( mouseCordsPolar.angle ) ,
            y : innerRadius * Math.sin( mouseCordsPolar.angle ) ,
        };
        let targetCordsOffset = {
            x : parentRadius + targetCordsDecard.x - ballCords.radius ,
            y : parentRadius + targetCordsDecard.y - ballCords.radius ,
        };
        let currentArc = calculateValuePosition( mouseCordsPolar.angle , innerRadius );

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

        let lengthCircle = radius * 2 * Math.PI;
        let correctAngle = ( angle + Math.PI / 2 ) * 57;
        let lengthArc = ( correctAngle * Math.PI * radius ) / 180;
        let value = Math.round( lengthArc / ( lengthCircle / 100 ) );
        let resultValue = Math.ceil( ( value * maxRange ) / 100 );
        if ( resultValue < minPosition ) {

            resultValue = minPosition;

        }

        switch ( hint ) {

            case "round":
                break;
            case "time":
                if ( resultValue < 10 ) {

                    resultValue = "0" + resultValue;

                }

                resultValue = resultValue	+ ":00";
                break;
            case "rest":

                break;
            case "sound":
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

