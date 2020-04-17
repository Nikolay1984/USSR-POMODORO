
// var fs = require("fs");
// // console.log(process.env);
// function  bla() {
//     fs.readFile("./dist/js/Button.js",(err, data) => {
//         if (err) throw err;
//         console.log(data);
//     });
// }
// bla();
//

const server = require( "http" ).Server();

server.listen( 8008 , "127.0.0.1" );
server.on( "request" , function ( req , resp ) {

    console.log( "123" );
    resp.end( "5" );

} );