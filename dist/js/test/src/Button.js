
Object.defineProperty( exports , "__esModule" , {
    value: true ,
} );
exports.default = void 0;

class Button {

    constructor( configButton ) {

        this.state = false;
        this.configHandlerEvent = null;
        this.type = configButton.type;
        this.targetButton = configButton.targetButton;

    }

    toggle() {

        this.state = this.state === false ? true : false;

    }

    addEventListenerToButton( configHandlerEvent ) {

        if ( arguments.length == 0 ) {

            throw new Error( "The arguments is not pass" );

        }

        this.targetButton.addEventListener( configHandlerEvent.nameEvent , configHandlerEvent.handler );

    }

}

exports.default = Button;
module.exports = exports.default;