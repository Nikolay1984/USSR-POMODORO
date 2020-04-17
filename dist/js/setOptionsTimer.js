export default function ( {
    classLabel , classHidden , classCircleBig , classBall , startPosition , classOutputElement , maxRange ,
} ) {

    function reactionLabelAndOutputElementOnChangeOfHidden( arr ) {

        const outputElement = document.querySelector( "." + classOutputElement );

        const value = arr[ 0 ].target.innerText;
        const valueFormatting = Number( value.slice( 0 , 2 ) );

        const period = document.querySelector( ".nameCurrentPeriod" ).innerHTML;

        function calcPositionAndChangePos() {

            let pos;
            let lengthRange;
            let offset;
            let parentHeight;
            switch ( classCircleBig ) {

                case "circleBigTime" :
                    if ( period === "Работа" ) {

                        outputElement.innerHTML = value;

                    }

                    // parentHeight = labelElement.offsetParent.offsetWidth;
                    // pos = (valueFormatting * parentHeight) - 8 ;

                    labelElement.style.left = valueFormatting + "%";

                    break;
                case "circleBigRound" :
                    parentHeight = labelElement.offsetParent.offsetWidth;
                    pos = ( ( valueFormatting * parentHeight ) / 15 ) - 8;

                    if ( pos <= 1 ) {

                        pos = 0;

                    }

                    labelElement.style.left = pos + "px";
                    outputElement.innerHTML = valueFormatting;
                    break;
                case "circleBigBigRest" :
                    parentHeight = labelElement.offsetParent.offsetHeight;
                    if ( period === "Перерыв" ) {

                        let out = valueFormatting;
                        if ( valueFormatting < 10 ) {

                            out = "0" + valueFormatting;

                        }

                        outputElement.innerHTML = out + ":00";

                    }

                    lengthRange = parentHeight - ( ( parentHeight * 6 ) / 100 );
                    offset = ( ( parentHeight * 3 ) / 100 );
                    pos = ( valueFormatting * lengthRange / maxRange ) - offset;
                    if ( pos <= 1 ) {

                        pos = offset;

                    }

                    labelElement.style.top = pos + "px";
                    break;
                case "circleBigRest" :
                    parentHeight = labelElement.offsetParent.offsetHeight;
                    if ( period === "Перемена" ) {

                        let out = valueFormatting;
                        if ( valueFormatting < 10 ) {

                            out = "0" + valueFormatting;

                        }

                        outputElement.innerHTML = out + ":00";

                    }

                    lengthRange = parentHeight - ( ( parentHeight * 6 ) / 100 );
                    offset = ( ( parentHeight * 3 ) / 100 );
                    pos = ( valueFormatting * lengthRange / maxRange ) - offset;
                    if ( pos <= 1 ) {

                        pos = offset;

                    }

                    labelElement.style.top = pos + "px";
                    break;

            }

        }

        calcPositionAndChangePos();

    }

    function positioningBall() {

        if ( classCircleBig === "circleBigTime" || classCircleBig === "circleBigRound" ) {

            ball.style.top = ( circleBigHeight - ballHeight ) / 2 + "px";
            ball.style.left = circleBigHeight - ballHeight + "px";

        }
        else if ( classCircleBig === "circleBigBigRest" || classCircleBig === "circleBigRest" ) {

            ball.style.top = circleBigHeight - ballHeight + "px";

        }

    }

    function handlerMouseDown() {

        let positionHidden;
        const self = this;
        if ( classCircleBig === "circleBigTime" || classCircleBig === "circleBigRound" ) {

            positionHidden = {
                top  : labelElement.offsetTop - 20 + "px" ,
                left : labelElement.offsetLeft + 5 + "px" ,
            };

        }
        else if ( classCircleBig === "circleBigBigRest" ) {

            positionHidden = {
                top  : labelElement.offsetTop - 20 + "px" ,
                left : labelElement.offsetLeft + "px" ,
            };

        }
        else {

            positionHidden = {
                top  : labelElement.offsetTop - 20 + "px" ,
                left : labelElement.offsetLeft - 20 + "px" ,
            };

        }

        elemHidden.style.display = "block";
        elemHidden.style.top = positionHidden.top;
        elemHidden.style.left = positionHidden.left;

        function handlerMove( e ) {

            let top;
            let left;
            switch ( classCircleBig ) {

                case "circleBigBigRest" :
                    top = labelElement.offsetTop - 20 + "px";
                    left = labelElement.offsetLeft + "px";
                    break;
                case "circleBigRest" :
                    top = labelElement.offsetTop - 20 + "px";
                    left = labelElement.offsetLeft - 20 + "px";
                    break;
                default :
                    top = labelElement.offsetTop - 20 + "px";
                    left = labelElement.offsetLeft + 5 + "px";
                    break;

            }

            elemHidden.style.top = top;
            elemHidden.style.left = left;

        }

        document.addEventListener( "mousemove" , handlerMove );

        document.addEventListener( "mouseup" , function () {

            document.removeEventListener( "mousemove" , handlerMove );
            elemHidden.style.display = "none";

        } , {
            once: true ,
        } );

    }

    const labelElement = document.querySelector( "." + classLabel );
    const elemHidden = document.querySelector( "." + classHidden );
    const circleBig = document.querySelector( "." + classCircleBig );
    const ball = document.querySelector( "." + classBall );
    const ballHeight = ball.offsetHeight;
    const circleBigHeight = circleBig.offsetHeight;
    const observeOfHidden = new MutationObserver( reactionLabelAndOutputElementOnChangeOfHidden );
    const configMutationObserver = {
        childList     : true ,
        characterData : true ,
    };

    observeOfHidden.observe( elemHidden , configMutationObserver );
    positioningBall();
    ball.addEventListener( "mousedown" , handlerMouseDown );

    elemHidden.innerHTML = startPosition;

}
