"use strict" ;

// Returns true if num is an integer
var isInteger = module.exports.isInteger = function( num ) {
	if ( isNaN( num ) ) return false ;
	var x = parseFloat( num ) ;
	return ( x | 0 ) === x ;
} ;

// Returns true if num is a number
var isNumber = module.exports.isNumber = function( num ) {
	return !isNaN( parseFloat( num ) ) && isFinite( num ) ;
} ;

// Returns true if num1 is an integer multiple of num2
var isMultipleOf = module.exports.isMultipleOf = function( num1, num2 ) {
	if ( isNaN( num1 ) || isNaN( num2 ) ) return false ;
	return ( num1 / num2 === parseInt( num1 / num2 ) ) ;
} ;

// Parses an integer into an array representing the number in powers of 10
// e.g. 1234 converts to [ 4, 3, 2, 1 ] = ( 4 * 10^0 ) + ( 3 * 10^1 ) + ( 2 * 10^2 ) + ( 1 * 10^3 )
var parseDecimal = module.exports.parseDecimal = function( num ) {
	if ( ! isInteger( num ) ) return ;
	return num.toString().split('').reverse().map( parseFloat ) ;
} ;

// Parses an integer into an array repsenting the number in powers of 1,000 (10^3)
// e.g. 123456789 converts to [ 789, 456, 123 ] = ( 789 * 10^0 ) + ( 456 * 10^3 ) + ( 123 * 10^6 )
var parsePowersOfTen = module.exports.parsePowersOfTen = function( num ) {
	if ( ! isInteger( num ) ) return ;
	if ( num < 0 ) return ;
	var res = [], done = false, pow = 3, segment ;
	while ( ! done ) {
		segment = num - ( parseInt( num / Math.pow( 10, pow ) ) * Math.pow( 10, pow ) ) ;
		res.push( segment / Math.pow( 10, pow - 3 ) ) ;
		num = num - segment ;
		if ( num === 0 ) done = true ;
		pow = pow + 3 ;
	}
	return res ;
} ;
