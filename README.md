# Installation

Expects Node.js to be installed.

# Testing

To run unit tests:

```
npm install
npm test
```

# In action

Open **ui/index.html** in a web browser. Type a number, hit **Convert**. No, it's not the slickest UI in the world, but hey, that wasn't the challenge!

# How it works

Split number into powers of 10^3

e.g. 21 => 21
e.g. 123 => 123
e.g. 4,999 => 4 | 999
e.g. 99,001 => 99 | 1
e.g. 16,384,512 = 16 | 384 | 512

Each unit then gets parsed into a string followed by the name of the power of 10^3

e.g. 21 => 21 => twenty-one
e.g. 123 => 123 => one hundred and twenty-three
e.g. 4,999 => 4 | 999 => four thousand | nine hundred and ninety-nine
e.g. 99,001 => 99 | 1 => ninety-nine thousand | and one
e.g. 16,384,512 = 16 | 384 | 512 => sixteen million | three hundred and eighty-four | five hundred and twelve

Requires us to store the names of the 10^3 powers:

10^3^1 = thousand
10^3^2 = million
(Can extend this indefinitely to cater for any number not just 999,999,999)

So the main part of the problem simply involves rendering numbers 0 to 999

The only number where "zero" is ever output is 0 itself so that is a special case

Single digits get rendered directy 1 => one, 2 => two etc.
Numbers 10 to 19 also get rendered directly 10 => ten, 11 => eleven etc.
Multiples of 10 between 20 and 99 get rendered directly 20 => twenty, 30 => thirty etc.
Numbers 20 to 99 get rendered as prefix | suffix 2 => twenty, 1 => -one
Hundreds (if they exist) get rendered as number e.g. 1 => one then hundred

# Build

```
browserify ui/src/button.js -o ui/lib/button.js
```
