var convert = require( '../../lib/convert' ) ;

$( document ).ready( function() {

	$( '#convert' ).click( function( event ) {
		$( '#result' ).html( convert.totext( $( '#number' ).val() ) ) ;
	} ) ;

} ) ;
