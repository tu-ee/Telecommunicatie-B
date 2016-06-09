require('./definitions');

// Question 1
var q1_a = 10;
var q1_fm_in_khz = 4.5;
var q1_fm_mod_in_mhz = 10;
var q1_df_div_2pi_in_khz_per_volt = 3;

// Question 2
var q2_f_min = 20;
var q2_f_max = 15e3; //khz
var q2_fm = 5e6; // mhz;
var q2_required_carrier = 95e6; //mhz
var q2_f_delta = 50e3; //khz
var q2_multiplier = 8;

// Question 4
var q4_r = 50;
var q4_a = 1.5;
var q4_modulation_index = 0.5;
var q4_m2_avg = 0.75;
var q4_n0 = fromdb(-43 - 30); // dbm - 30 -> value
var q4_bandwith = 5e3; // Khz

// Question 5
var q5_b = 15e3; // KHz
var q5_f_delta = 50e3; // KHz
var q5_m2_avg_div_vp2 = 0.7;
var q5_p_in = fromdb(-24 - 30); // dbm - 30 -> value
var q5_n0_div_2 = fromdb(-90 - 30); // dbm - 30 -> value

// Question 6
var q6_s_a = 20;
var q6_s_f = 1000;
var q6_m_a = 5;
var q6_m_f = 9;
var q6_modulation_index = 12;
var q6_b = 60;

(function Question1() {
	var fm = q1_fm_in_khz * kilo;
	var fmod = q1_fm_mod_in_mhz * mega;
	var df = q1_df_div_2pi_in_khz_per_volt * kilo * (2 * Math.PI);
	var a = q1_a;

	var fdelta = df * a / (2 * Math.PI);
	console.log(`1.a) ${fdelta/kilo} KHz`);

	var beta = fdelta / fm;
	var J0 = require('./bessel').besselj(beta, 0);
	// P_carrier = (A^2 / 2R) * J0(beta)^2; 
	var carrier_power_n = Math.pow(J0, 2);
	// console.log(J0);

	console.log(`1.b) ${carrier_power_n * 100} % `);

	var Bt = 2 * (beta + 1) * fm;
	console.log(`1.c) ${Bt / kilo} kHz`);
})();
console.log('');
(function Question2() {
	// var df = q2_f_delta * Math.PI * 2;
	// var fi = q2_fc + q2_f_delta;
	var fi = q2_required_carrier / q2_multiplier;
	var fo_up = q2_fm + fi;
	var fo_down = q2_fm + fi;
	console.log(`2.a) fi = ${fi/kilo} KHz`);
	console.log(`2.a) fo_up = ${fo_up/kilo} KHz`);
	console.log(`2.a) fo_down = ${fo_down/kilo} KHz`);

	var f_delta = q2_f_delta / q2_multiplier;
	console.log(`2.b) f_delta = ${f_delta/kilo} KHz`);

	var beta = f_delta / q2_f_max;
	var bw = 2 * (beta + 1) * q2_f_max;
	console.log(`2.c) bw = ${bw/kilo} KHz`);
})();
console.log('');
(function Question3() {

})();
console.log('');
(function Question4() {
	var p_in = (Math.pow(q4_a, 2) / (2 * q4_r)) * (1 + Math.pow(q4_modulation_index,2) * q4_m2_avg);
	var p_noise = 2 * q4_bandwith * q4_n0;

	// console.log(todb(p_in) + 30);
	// console.log(todb(p_noise) + 30);
	console.log(`4.a) SNR_in = ${todb(p_in / p_noise)} dB`);

	var p_out = (Math.pow(q4_a, 2) / (q4_r)) * (Math.pow(q4_modulation_index,2) * q4_m2_avg);
	var snr_out = p_out / p_noise;
	console.log(`4.b) SNR_out = ${todb(snr_out)} dB`);

	var p_out_ussb = (Math.pow(q4_a, 2) / (2 * q4_r)) * (Math.pow(q4_modulation_index,2) * q4_m2_avg / 2);
	var snr_out_ussb = p_out_ussb * 2 / p_noise;
	console.log(`4.c) SNR_out_ussb = ${todb(snr_out_ussb)} dB`);
})();
console.log('');
(function Question5() {
	var beta_f = q5_f_delta / q5_b;

	var Bt = 2 * (beta_f + 1) * q5_b;
	var snr_in = q5_p_in / (Bt * 2 * q5_n0_div_2);
	var snr_out = (3 * q5_p_in * Math.pow(q5_f_delta, 2) * q5_m2_avg_div_vp2) / 
		(Math.pow(q5_b, 3) * q5_n0_div_2);
	console.log(`5.a) SNR_in = ${todb(snr_in)} dB`);
	console.log(`5.a) SNR_out = ${todb(snr_out)} dB`);

	var snr_out_2 = (3 * q5_p_in * Math.pow(q5_f_delta, 2) * q5_m2_avg_div_vp2) / 
		(Math.pow(q5_b * 2, 3) * q5_n0_div_2);
	console.log(`5.b) SNR_out = ${todb(snr_out_2)} dB`);
})();
console.log('');
(function Question6() {
	var p_in = Math.pow(q6_s_a, 2) / 2;
	console.log(`6.a) ${p_in} W`);

	// modulation_index = (hz / volt);
	// Df / 2pi = modulation_index = (hz / volt);
	var f_delta = q6_m_a * q6_modulation_index;
	var beta_f = f_delta / q6_m_f;
	var p_out = Math.pow(require('./bessel').besselj(beta_f, 0), 2);
	for(var i = 1; i < ((q6_m_f-1) / 2); i += 1) {
		console.log(i, beta_f);
		p_out += 2 * Math.pow(require('./bessel').besselj(beta_f, i), 2);
	}
	p_out *= Math.pow(q6_s_a, 2) / 2;
	console.log(`6.b) ${p_out} W`);
})();