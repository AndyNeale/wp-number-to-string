"use strict" ;

var constants	= require( './constants.json' ),
	utils		= require( './utils.js' ) ;

// Convert numbers 1 to 9 to text equivalents
var units = module.exports.units = function( num ) {
	// Error cases
	if ( ! utils.isInteger( num ) ) return ;
	if ( ! ( num in constants.units ) ) return ;
	if ( num < 1 || num > 9 ) return ;

	// Convert number to text
	return constants.units[ num ] ;
} ;

// Convert numbers 11 to 19 to text equivalents
var teens = module.exports.teens = function( num ) {
	// Error cases
	if ( ! utils.isInteger( num ) ) return ;
	if ( ! ( num in constants.teens ) ) return ;
	if ( num < 11 || num > 19 ) return ;

	// Convert number to text
	return constants.teens[ num ] ;
} ;

// Convert numbers 10, 20, 30, 40, 50, 60, 70, 80, 90 to text equivalents
var tens = module.exports.tens = function( num ) {
	// Error cases
	if ( ! utils.isInteger( num ) ) return ;
	if ( ! ( num in constants.tens ) ) return ;
	if ( ! utils.isMultipleOf( num, 10 ) ) return ;
	if ( num < 10 || num > 90 ) return ;

	// Convert number to text
	return constants.tens[ num ] ;
} ;

// Convert two-digit numbers to text equivalents
var twodigits = module.exports.twodigits = function( num ) {
	// Error cases
	if ( ! utils.isInteger( num ) ) return ;
	if ( num < 0 || num > 99 ) return ;

	// Convert number to text
	// Use directly-mapped numbers if possible
	if ( num === 0 ) return 'zero' ;
	if ( num < 10 ) return units( num ) ;
	if ( num < 20 ) return teens( num ) ;
	if ( utils.isMultipleOf( num, 10 ) ) return tens( num ) ;
	// Otherwise parse and render tens and units
	var arr = utils.parseDecimal( num ) ;
	return tens( arr[ 1 ] * 10 ) + ( ! utils.isMultipleOf( num, 10 ) ? '-' : '' ) + units( arr [ 0 ] ) ;
} ;

var threedigits = module.exports.threedigits = function( num ) {
	// Error cases
	if ( ! utils.isInteger( num ) ) return ;
	if ( num < 0 ) return ;

	// Convert number to text
	// Use two-digit converter if possible
	if ( num < 100 ) return twodigits( num ) ;
	// Otherwise parse into hundreds, tens and units ...
	var arr = utils.parseDecimal( num ) ;
	// ... write the hundreds part ...
	var res = units( arr[ 2 ] ) + ' hundred' ;
	if ( utils.isMultipleOf( num, 100 ) ) return res ;
	// ... and then convert the remaining two-digit number
	return res + ' and ' + twodigits( num - arr[ 2 ] * 100 ) ;
} ;

var poweroften = module.exports.poweroften = function( num ) {
	// Error cases
	if ( ! utils.isInteger( num ) ) return ;
	if ( num < 0 ) return ;
	if ( ! utils.isMultipleOf( num, 3 ) ) return ;

	// Convert power to text
	return constants.powers[ num ] ;
} ;

var totext = module.exports.totext = function( num ) {
	// Error cases
	if ( ! utils.isInteger( num ) ) return ;
	if ( num < 0 ) return ;

	// Convert number to text
	// Use the two-digit converter if possible
	if ( num < 100 ) return twodigits( num ) ;
	// Use the three-digit converter if possible
	if ( num < 1000 ) return threedigits( num ) ;
	// Otherwise parse into powers of 10^3 ...
	var arr = utils.parsePowersOfTen( num ) ;
	var tmp = [] ;
	// ... write the millions bit, but only if this section is non-zero ...
	if ( arr.length >= 3 && arr[ 2 ] > 0 ) tmp.push( threedigits( arr[ 2 ] ) + ' million' ) ;
	// ... write the thousands bit, but only if this section is non-zero ...
	if ( arr.length >= 2 && arr[ 1 ] > 0 ) tmp.push( threedigits( arr[ 1 ] ) + ' thousand' ) ;
	// If the last block is non-zero ...
	if ( arr[ 0 ] > 0 ) {
		// ... include an "and" if the last bit is less than a hundred ...
		if ( arr[ 0 ] < 100 ) tmp.push( 'and' ) ;
		// ... and convert the final three digits to text
		tmp.push( threedigits( arr[ 0 ] ) ) ;
	}
	// Concatenate the results and return as a string
	return tmp.join( ' ' ) ;
} ;
