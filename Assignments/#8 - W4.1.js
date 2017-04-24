// Question 1
var low_frequency_in_khz = 24300;
var high_frequency_in_khz = 39400;
var higher_or_lower = 'lower'; // lower/higher
var if_frequency_in_khz = 3395;


require('./definitions.js');

var factor = higher_or_lower === 'higher' ? 1 : -1;

var oscilator_low = low_frequency_in_khz + factor * if_frequency_in_khz;
oscilator_low *= kilo;
var oscilator_high = high_frequency_in_khz + factor * if_frequency_in_khz;
oscilator_high *= kilo;

console.log(`1.a.1) ${oscilator_low/kilo} kHz`);
console.log(`1.a.2) ${oscilator_high/kilo} kHz`);

var image_low = low_frequency_in_khz + factor * 2 * if_frequency_in_khz;
image_low *= kilo;
var image_high = high_frequency_in_khz + factor * 2 * if_frequency_in_khz;
image_high *= kilo;

console.log(`1.b.1) ${image_low/kilo} kHz`);
console.log(`1.b.2) ${image_high/kilo} kHz`);

var if_min = high_frequency_in_khz - low_frequency_in_khz;
if_min *= kilo;
if_min /= 2;

console.log(`1.c) f_if > ${if_min/kilo} kHz`);


// Bandpass filter around carier frequency before hand.
console.log(`1.d) F`);