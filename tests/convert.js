"use strict" ;

var convert	= require( '../lib/convert' ),
	test	= require( 'tape' ) ;

test( 'units converter', function( assert ) {

	// Expected to pass
	assert.equal( convert.units( 1 ), 'one', '1 => one' ) ;
	assert.equal( convert.units( 2 ), 'two', '2 => two' ) ;
	assert.equal( convert.units( 3 ), 'three', '3 => three' ) ;
	assert.equal( convert.units( 4 ), 'four', '4 => four' ) ;
	assert.equal( convert.units( 5 ), 'five', '5 => five' ) ;
	assert.equal( convert.units( 6 ), 'six', '6 => six' ) ;
	assert.equal( convert.units( 7 ), 'seven', '7 => seven' ) ;
	assert.equal( convert.units( 8 ), 'eight', '8 => eight' ) ;
	assert.equal( convert.units( 9 ), 'nine', '9 => nine' ) ;
	// Expected to fail
	assert.equal( convert.units(), undefined, 'no arguments => undefined' ) ;
	assert.equal( convert.units( 0 ), undefined, '0 => undefined' ) ;
	assert.equal( convert.units( 11 ), undefined, '11 => undefined' ) ;
	assert.equal( convert.units( 32768 ), undefined, '32768 => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'teens converter', function( assert ) {

	// Expected to pass
	assert.equal( convert.teens( 11 ), 'eleven', '11 => eleven' ) ;
	assert.equal( convert.teens( 12 ), 'twelve', '12 => twelve' ) ;
	assert.equal( convert.teens( 13 ), 'thirteen', '13 => thirteen' ) ;
	assert.equal( convert.teens( 14 ), 'fourteen', '14 => fourteen' ) ;
	assert.equal( convert.teens( 15 ), 'fifteen', '15 => fifteen' ) ;
	assert.equal( convert.teens( 16 ), 'sixteen', '16 => sixteen' ) ;
	assert.equal( convert.teens( 17 ), 'seventeen', '17 => seventeen' ) ;
	assert.equal( convert.teens( 18 ), 'eighteen', '18 => eighteen' ) ;
	assert.equal( convert.teens( 19 ), 'nineteen', '19 => nineteen' ) ;
	// Expected to fail
	assert.equal( convert.teens(), undefined, 'no arguments => undefined' ) ;
	assert.equal( convert.teens( 9 ), undefined, '9 => undefined' ) ;
	assert.equal( convert.teens( 10 ), undefined, '10 => undefined' ) ;
	assert.equal( convert.teens( 20 ), undefined, '20 => undefined' ) ;
	assert.equal( convert.teens( 16384 ), undefined, '16384 => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'tens converter', function( assert ) {

	// Expected to pass
	assert.equal( convert.tens( 10 ), 'ten', '10 => ten' ) ;
	assert.equal( convert.tens( 20 ), 'twenty', '20 => twenty' ) ;
	assert.equal( convert.tens( 30 ), 'thirty', '30 => thirty' ) ;
	assert.equal( convert.tens( 40 ), 'forty', '40 => forty' ) ;
	assert.equal( convert.tens( 50 ), 'fifty', '50 => fifty' ) ;
	assert.equal( convert.tens( 60 ), 'sixty', '60 => sixty' ) ;
	assert.equal( convert.tens( 70 ), 'seventy', '70 => seventy' ) ;
	assert.equal( convert.tens( 80 ), 'eighty', '80 => eighty' ) ;
	assert.equal( convert.tens( 90 ), 'ninety', '90 => ninety' ) ;
	// Expected to fail
	assert.equal( convert.tens(), undefined, 'no arguments => undefined' ) ;
	assert.equal( convert.tens( 0 ), undefined, '0 => undefined' ) ;
	assert.equal( convert.tens( 100 ), undefined, '100 => undefined' ) ;
	assert.equal( convert.tens( 1010101010 ), undefined, '1010101010 => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'zero to ninety-nine', function( assert ) {

	// Expected to pass
	assert.equal( convert.twodigits( 0 ), 'zero', '0 => zero' ) ;
	assert.equal( convert.twodigits( 21 ), 'twenty-one', '21 => twenty-one' ) ;
	assert.equal( convert.twodigits( 34 ), 'thirty-four', '34 => thirty-four' ) ;
	assert.equal( convert.twodigits( 56 ), 'fifty-six', '56 => fifty-six' ) ;
	assert.equal( convert.twodigits( 99 ), 'ninety-nine', '99 => ninety-nine' ) ;
	// Expected to fail
	assert.equal( convert.twodigits(), undefined, 'empty string => undefined' ) ;
	assert.equal( convert.twodigits( -273 ), undefined, '-273 => undefined' ) ;
	assert.equal( convert.twodigits( 100 ), undefined, '100 => undefined' ) ;
	assert.equal( convert.twodigits( 1010101010 ), undefined, '1010101010 => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'three digits', function( assert ) {

	// Expected to pass
	assert.equal( convert.threedigits( 0 ), 'zero', '0 => zero' ) ;
	assert.equal( convert.threedigits( 21 ), 'twenty-one', '21 => twenty-one' ) ;
	assert.equal( convert.threedigits( 34 ), 'thirty-four', '34 => thirty-four' ) ;
	assert.equal( convert.threedigits( 56 ), 'fifty-six', '56 => fifty-six' ) ;
	assert.equal( convert.threedigits( 99 ), 'ninety-nine', '99 => ninety-nine' ) ;
	assert.equal( convert.threedigits( 100 ), 'one hundred', '100 => one hundred' ) ;
	assert.equal( convert.threedigits( 101 ), 'one hundred and one', '101 => one hundred and one' ) ;
	assert.equal( convert.threedigits( 120 ), 'one hundred and twenty', '120 => one hundred and twenty' ) ;
	assert.equal( convert.threedigits( 121 ), 'one hundred and twenty-one', '121 => one hundred and twenty-one' ) ;
	// Expected to fail
	assert.equal( convert.threedigits(), undefined, 'empty string => undefined' ) ;
	assert.equal( convert.threedigits( 3.141 ), undefined, '3.141 => undefined' ) ;
	assert.equal( convert.threedigits( -3 ), undefined, '-3 => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'powers of ten', function( assert ) {

	// Expected to pass
	assert.equal( convert.poweroften( 3 ), 'thousand', '10^3 = thousand' ) ;
	assert.equal( convert.poweroften( 6 ), 'million', '10^6 = million' ) ;
	assert.equal( convert.poweroften( 9 ), 'billion', '10^9 = billion' ) ;
	// Expected to fail
	assert.equal( convert.poweroften(), undefined, 'empty string => undefined' ) ;
	assert.equal( convert.poweroften( 3.141 ), undefined, '3.141 => undefined' ) ;
	assert.equal( convert.poweroften( -3 ), undefined, '-3 => undefined' ) ;
	assert.equal( convert.poweroften( 13 ), undefined, '13 => undefined' ) ;
	// Done
	assert.end() ;

} ) ;

test( 'the big one', function( assert ) {

	// Expected to pass
	assert.equal( convert.totext( 0 ), 'zero', '0 => zero' ) ;
	assert.equal( convert.totext( 1 ), 'one', '1 => one' ) ;
	assert.equal( convert.totext( 21 ), 'twenty-one', '21 => twenty-one' ) ;
	assert.equal( convert.totext( 105 ), 'one hundred and five', '105 => one hundred and five' ) ;
	assert.equal( convert.totext( 123 ), 'one hundred and twenty-three', '123 => one hundred and twenty-three' ) ;
	assert.equal( convert.totext( 1005 ), 'one thousand and five', '1005 => one thousand and five' ) ;
	assert.equal( convert.totext( 1042 ), 'one thousand and forty-two', '1042 => one thousand and forty-two' ) ;
	assert.equal( convert.totext( 1105 ), 'one thousand one hundred and five', '1105 => one thousand one hundred and five' ) ;
	assert.equal( convert.totext( 56945781 ), 'fifty-six million nine hundred and forty-five thousand seven hundred and eighty-one', '56945781 => fifty-six million nine hundred and forty-five thousand seven hundred and eighty-one' ) ;
	assert.equal( convert.totext( 999999999 ), 'nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine', '999999999 => nine hundred and ninety-nine million nine hundred and ninety-nine thousand nine hundred and ninety-nine' ) ;
	assert.equal( convert.totext( 2000 ), 'two thousand', '2000 => two thousand' ) ;
	assert.equal( convert.totext( 16384 ), 'sixteen thousand three hundred and eighty-four', '16384 => sixteen thousand three hundred and eighty-four' ) ;
	assert.equal( convert.totext( 42042 ), 'forty-two thousand and forty-two', '42042 => forty-two thousand and forty-two' ) ;
	assert.equal( convert.totext( 1001001 ), 'one million one thousand and one', '1001001 => one million one thousand and one' ) ;
	assert.equal( convert.totext( 6000000 ), 'six million', '6000000 => six million' ) ;
	assert.equal( convert.totext( 7000007 ), 'seven million and seven', '7000007 => seven million and seven' ) ;
	// Expected to fail
	assert.equal( convert.totext(), undefined, 'empty string => undefined' ) ;
	// Done
	assert.end() ;

} ) ;
