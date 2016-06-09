/* jshint esversion: 6 */
require('./definitions');

// Question 1
var q1_f_low = 100e6; // MHz
var q1_f_high = 120e6; // MHz
var q1_if = 8e6; // MHz
var q1_tune = 114e6; // MHz

// Question 2
var q2_f_low = 0.5e6; // MHz
var q2_f_high = 30e6; // MHz
var q2_if = 40e6; // MHz 
var q2_f_receive = 81.2e6; // MHz

// Question 3
var q3_a = 1;
var q3_f_a = 1000;
var q3_b = 2;
var q3_f_b = 3000;
var q3_modulation_index = 0.14;

var q3_amplitude = 300;
var q3_resistance = 50;

// Question 4
var q4_Am = 2;
var q4_Ac = 150;
var q4_factor_above = 3;
var q4_resistance = 50;

(function question1() {
	var low = q1_f_low - q1_if;
	var high = q1_f_high - q1_if;
	console.log(`1.a) low = ${low/mega} MHz`);
	console.log(`1.a) high = ${high/mega} MHz`);

	var image_low = low - q1_if;
	var image_high = high - q1_if;

	console.log(`1.b) image_low = ${image_low/mega} MHz`);
	console.log(`1.b) image_high = ${image_high/mega} MHz`);	

	console.log(`1.c) f_if > ${(high-low)/(2*mega)} MHz`);

	var f_tune_lo = q1_tune - q1_if; 
	var f_image1 = f_tune_lo - q1_if;
	var f_image2 = 2 * f_tune_lo - q1_if;
	var f_image3 = 2 * f_tune_lo + q1_if;

	console.log(`1.d) f_image1 = ${f_image1/mega} MHz`);	
	console.log(`1.d) f_image2 = ${f_image2/mega} MHz`);	
	console.log(`1.d) f_image3 = ${f_image3/mega} MHz`);	
})();
console.log('');

(function question2() {
	var low = q2_f_low + q2_if;
	var high = q2_f_high + q2_if;
	console.log(`2.a) low = ${low/mega} MHz`);
	console.log(`2.a) high = ${high/mega} MHz`);

	var f_tune = q2_f_receive - 2 * q2_if;
	console.log(`2.b.1) f_tune = ${f_tune/mega} MHz`);
	console.log(`2.b.2) Image frequencies `);
	console.log(`2.b.3) Band pass filtering before mixer`);

	var image_low = low + q2_if;
	var image_high = high * 3 + q2_if;
	console.log(`2.c) image_low = ${image_low/mega} MHz`);
	console.log(`2.c) image_high = ${image_high/mega} MHz`);	

	console.log(`2.d) filter out image frequencies before mixer`);
	console.log(`2.d) suppress 3rd harmonic in oscillator signal, also makes f_image1 and f_image2 disappear`);
})();
console.log('');

(function question3() {
	// u * (max - min) * 0.5
	// max = a + b, min = - (a + b); => max - min = 2(a + b)\
	var a = q3_a + q3_b;
	var E_x2 = (q3_a * q3_a + q3_b * q3_b) / 2;
	var am_modulation = q3_modulation_index * (q3_a + q3_b) * 2 / 2;
	console.log(`3.a) ${am_modulation*100} %`);

	var p_carrier = (Math.pow(q3_amplitude, 2) / (2 * q3_resistance));
	var p_sideband = p_carrier * Math.pow(q3_modulation_index, 2);

	var p_avg = (Math.pow(q3_amplitude, 2) / (2 * q3_resistance)) * (1 + Math.pow(q3_modulation_index, 2) * E_x2);
	console.log(`3.b) ${p_avg} W`);

	var p_peak = (Math.pow(q3_amplitude, 2) / (2 * q3_resistance)) * Math.pow(1 + q3_modulation_index * a,2);
	console.log(`3.c) ${p_peak} W`);

	var n = (Math.pow(q3_modulation_index, 2) * E_x2) / (1 + Math.pow(q3_modulation_index, 2) * E_x2);
	console.log(`3.d) ${n * 100} %`);
})();
console.log('');

(function question4() {
	console.log(`4.a) ${q4_Ac * q4_Am}*cos(2*pi(fc+fm)t)+${q4_Ac * q4_Am}*sin(2*pi(fc+${q4_factor_above}*fm)t)`);

	var rms = Math.sqrt(
		(Math.pow(q4_Ac * q4_Am / Math.sqrt(2), 2)) +
		(Math.pow(q4_Ac * q4_Am / Math.sqrt(2), 2))
	);
	console.log(`4.b) ${rms} V`);

	var v_peak = q4_Ac * (q4_Am + q4_Am);
	console.log(`4.c) ${v_peak} V`);

	var P_gem = Math.pow(rms, 2) / q4_resistance;
	var PEP_2 = 0.5 * Math.pow(v_peak, 2) / q4_resistance;
	console.log(`4.d.1) ${todb(P_gem)} dBW`);
	console.log(`4.d.2) ${todb(PEP_2)} dBW`);
})();
console.log('');

(function question5() {

})();
console.log('');