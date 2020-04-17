const {
    assert ,
} = require( "chai" );
const {
    expect ,
} = require( "chai" );
const Button = require( "./src/Button.js" );
require( "jsdom-global" )();
// подключаем DOM в node

require( "geteventlisteners" )();

// добавляет DOM элементу метод getEventListeners, который позвражает объект с обрабочиками на данном элементе

describe( "class Button" , function() {

    let startButton , configButton , instanceButton , configHandlerEvent;

    describe( "create work instance" , function () {

        beforeEach( function () {

            startButton = document.createElement( "button" );
            startButton.classList.add( "start" );
            configButton = {
                type         : "start" ,
                targetButton : startButton ,
            };
            instanceButton = new Button( configButton );

        } );
        afterEach( function () {

            startButton = null;
            configButton = null;
            instanceButton = null;

        } );

        it( "instance should has state " , function() {

            const currentState = instanceButton.state;
            assert.isFalse( currentState );

        } );
        it( "instance should has configHandlerEvent " , function() {

            const currentConfigHandlerEvent = instanceButton.configHandlerEvent;
            assert.isNull( currentConfigHandlerEvent );

        } );
        it( "instance should has type " , function() {

            const currentType = instanceButton.type;
            assert.typeOf( currentType , "string" );

        } );
        it( "instance should has targetButton " , function() {

            const currentTargetButton = instanceButton.targetButton;
            assert.equal( currentTargetButton.tagName , "BUTTON" );

        } );

    } );
    describe( "toggle" , function () {

        beforeEach( function () {

            startButton = document.createElement( "button" );
            startButton.classList.add( "start" );
            configButton = {
                type         : "start" ,
                targetButton : startButton ,
            };
            instanceButton = new Button( configButton );

        } );
        afterEach( function () {

            startButton = null;
            configButton = null;
            instanceButton = null;

        } );

        it( "should toggle state" , function() {

            instanceButton.toggle();
            assert.isTrue( instanceButton.state );
            instanceButton.toggle();
            assert.isFalse( instanceButton.state );

        } );

    } );
    describe( "addEventListenerToButton" , function () {

        beforeEach( function () {

            startButton = document.createElement( "button" );
            startButton.classList.add( "start" );
            configButton = {
                type         : "start" ,
                targetButton : startButton ,
            };
            configHandlerEvent = {
                nameEvent: "click" ,
                handler ( event ) {

                } ,
            };

            instanceButton = new Button( configButton );
            instanceButton.addEventListenerToButton( configHandlerEvent );

        } );
        afterEach( function () {

            startButton = null;
            configButton = null;
            instanceButton = null;
            configHandlerEvent = null;

        } );

        it( "should add  EventListener To Button" , function() {

            let result = false;
            const objectOfEvents = instanceButton.targetButton.getEventListeners();
            const arrEvents = objectOfEvents[ configHandlerEvent.nameEvent ];

            arrEvents.forEach( function ( item ) {

                if ( item.listener === configHandlerEvent.handler ) {

                    result = true;

                }

            } );

            assert.isTrue( result );

        } );
        it( "should trow error if parameters not pass to addEventListenerToButton" , function() {

            expect( instanceButton.addEventListenerToButton ).to.throw();

        } );

    } );

} );

