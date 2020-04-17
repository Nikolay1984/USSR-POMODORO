const {
    assert ,
} = require( "chai" );
const {
    expect ,
} = require( "chai" );
const Timer = require( "./src/Timer.js" );
require( "jsdom-global" )();
require( "geteventlisteners" )();

describe( "class Timer" , function() {

    let instTimer ,
        timerDomElement;

    describe( "testing of constructor Timer" , function() {

        beforeEach( function () {

            timerDomElement = document.createElement( "button" );
            timerDomElement.classList.add( "displayTimer" );
            document.body.append( timerDomElement );
            instTimer = new Timer();

        } );
        afterEach( function () {

            instTimer = null;
            timerDomElement.parentNode.removeChild( timerDomElement );
            timerDomElement = null;

        } );

        it( "create work instance" , function() {

            assert.typeOf( instTimer , "object" );

        } );

    } );

} );