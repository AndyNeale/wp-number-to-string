"use strict" ;

var utils	= require( '../lib/utils' ),
	test	= require( 'tape' ) ;

test( 'isNumber function', function( assert ) {

	// Expected to pass
	assert.true( utils.isNumber( '1' ), '1 is a number' ) ;
	assert.true( utils.isNumber( '3.141' ), '3.141 is a number' ) ;
	assert.true( utils.isNumber( '4294967296' ), '4294967296 is a number' ) ;
	assert.true( utils.isNumber( '-1.2345678' ), '-1.2345678 is a number' ) ;
	assert.true( utils.isNumber( '69' ), '69 is a number' ) ;
	assert.true( utils.isNumber( '6.' ), '6. is a number' ) ;
	assert.true( utils.isNumber( '6.02214086e23' ), '6.02214086e23 is a number' ) ;
	// Expected to fail
	assert.false( utils.isNumber( 'seven' ), 'seven is not a number' ) ;
	assert.false( utils.isNumber( '12345g7890' ), '12345g7890 is not a number' ) ;
	assert.false( utils.isNumber( '' ), 'empty string is not a number' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'isMultipleOf function', function( assert ) {

	// Expected to pass
	assert.true( utils.isMultipleOf( 4, 2 ), '4 is a multiple of 2' ) ;
	assert.true( utils.isMultipleOf( 16384, 16 ), '16384 is a multiple of 16' ) ;
	assert.true( utils.isMultipleOf( 4294967296, 65536 ), '4294967296 is a multiple of 65536' ) ;
	assert.true( utils.isMultipleOf( 23986, 179 ), '23986 is a multiple of 179' ) ;
	assert.true( utils.isMultipleOf( 5, 5 ), '5 is a multiple of 5' ) ;
	// Expected to fail
	assert.false( utils.isMultipleOf( 5, 3 ), '5 is not a multiple of 3' ) ;
	assert.false( utils.isMultipleOf( 2001, 8 ), '2001 is not a multiple of 8' ) ;
	assert.false( utils.isMultipleOf( 16, 16384 ), '16 is not a multiple of 16384' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'parseDecimal function', function( assert ) {

	// Expected to pass
	assert.deepEqual( utils.parseDecimal( 5 ), [ 5 ], '5 => [5]' ) ;
	assert.deepEqual( utils.parseDecimal( 1234 ), [ 4, 3, 2, 1 ], '1234 => [4,3,2,1]' ) ;
	assert.deepEqual( utils.parseDecimal( 987654321 ), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], '987654321 => [1,2,3,4,5,6,7,8,9]' ) ;
	// Exptected to fail
	assert.equal( utils.parseDecimal(), undefined, 'empty string => undefined' ) ;
	assert.equal( utils.parseDecimal( 6.2 ), undefined, '6.2 => undefined' ) ;
	assert.equal( utils.parseDecimal( 'pizza' ), undefined, 'pizza => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'parsePowersOfTen function', function( assert ) {

	// Expected to pass
	assert.deepEqual( utils.parsePowersOfTen( 1 ), [ 1 ], '1 => [ 1 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 12 ), [ 12 ], '12 => [ 12 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 123 ), [ 123 ], '123 => [ 123 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 1234 ), [ 234, 1 ], '1234 => [ 234, 1 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 12345 ), [ 345, 12 ], '12345 => [ 345, 12 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 123456 ), [ 456, 123 ], '123456 => [ 456, 123 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 1234567 ), [ 567, 234, 1 ], '1234567 => [ 567, 234, 1 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 12345678 ), [ 678, 345, 12 ], '12345678 => [ 678, 345, 12 ]' ) ;
	assert.deepEqual( utils.parsePowersOfTen( 123456789 ), [ 789, 456, 123 ], '123456789 => [ 789, 456, 123 ]' ) ;
	// Expected to fail
	assert.equal( utils.parsePowersOfTen(), undefined, 'empty string => undefined' ) ;
	assert.equal( utils.parsePowersOfTen( '-12345' ), undefined, '-12345 => undefined' ) ;
	assert.equal( utils.parsePowersOfTen( 'number' ), undefined, 'number => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

