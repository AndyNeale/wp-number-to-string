(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
	"units": {
		"1": "one",
		"2": "two",
		"3": "three",
		"4": "four",
		"5": "five",
		"6": "six",
		"7": "seven",
		"8": "eight",
		"9": "nine"
	},

	"teens": {
		"10": "ten",
		"11": "eleven",
		"12": "twelve",
		"13": "thirteen",
		"14": "fourteen",
		"15": "fifteen",
		"16": "sixteen",
		"17": "seventeen",
		"18": "eighteen",
		"19": "nineteen"
	},

	"tens": {
		"10": "ten",
		"20": "twenty",
		"30": "thirty",
		"40": "forty",
		"50": "fifty",
		"60": "sixty",
		"70": "seventy",
		"80": "eighty",
		"90": "ninety"
	},

	"powers": {
		"3": "thousand",
		"6": "million",
		"9": "billion"
	}
}

},{}],2:[function(require,module,exports){
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

},{"./constants.json":1,"./utils.js":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var convert = require( '../../lib/convert' ) ;

$( document ).ready( function() {

	$( '#convert' ).click( function( event ) {
		$( '#result' ).html( convert.totext( $( '#number' ).val() ) ) ;
	} ) ;

} ) ;

},{"../../lib/convert":2}]},{},[4]);
