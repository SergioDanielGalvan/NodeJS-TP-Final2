var mongoose = require( 'mongoose' );
var mongoDB = 'mongodb://localhost/TPFinal';

mongoose.connect( mongoDB, { useNewUrlParser: true, function( error ) {
if ( error ) {
    console.log( "Error de conexion a la base de datos: " + error );
    throw
}
else {
    console.log( "Conexion a la base de datos establecida" );
}
}} );

module.exports = mongoose;

