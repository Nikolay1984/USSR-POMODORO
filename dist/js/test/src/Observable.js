
Object.defineProperty( exports , "__esModule" , {
    value: true ,
} );
exports.default = void 0;

class Observable {

    constructor() {

        this.listeners = {
        };

    }

    on( e , callback ) {

        if ( this.listeners[ e ] == undefined ) {

            this.listeners[ e ] = {
            };
            this.listeners[ e ].eventProperty = {
            };
            this.listeners[ e ].data = [];

        }

        this.listeners[ e ].data.push( callback );

    }

    emit( e , data ) {

        if ( this.listeners[ e ] == undefined || this.listeners[ e ].data == undefined ) {

            return;

        }

        const itObj = this;
        this.listeners[ e ].data.forEach( ( listener ) => {

            listener( data );

        } );

    }

}

exports.default = Observable;
module.exports = exports.default;