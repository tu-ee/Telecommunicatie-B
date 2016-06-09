require('./definitions');

// Question 1
var q1_bitrate = 770e3;
var q1_alpha = 3.8;
var q1_beta = 2;
var q1_N0 = fromdb(-91 - 30);
var q1_b_eq = q1_bitrate / 2;
var q1_b_eq_alternative = 1.1 * q1_bitrate;
var q1_snr_in = fromdb(10.5);

// Question 2
var q2_bitrate = 350e3;
var q2_N0 = 20 * pico;
var q2_b_eq = 1 * q2_bitrate;
var q2_pe = 9e-4;

var q2_b_eq_alternative = 2.5 * q2_bitrate;
var q2_pe_alternative = 8e-4;

// Question 3
var q3_bitrate = 190e3;
var q3_alpha = 4;
var q3_beta = 3.6;
var q3_dual_N0 = fromdb(-81 - 30);
var q3_b_eq = q3_bitrate / 4;
var q3_s_in_no_mod = fromdb(-29 - 30);
var q3_snr_after_filter = fromdb(9.5);

(function Question1() {
	/*
		SNR = (Ac^2 / 2) / (2 * N0 * Beq)
	*/
	var s_in = q1_snr_in * q1_N0 * q1_b_eq * 4;
	console.log(`1.a) Sin = ${todb(s_in) + 30} dBm`);

	// s_in = 0.5 * Ac^2 * (a^2 + b^2 * E[d(t)^2])
	// s_in = 0.5 * Ac^2 * (a^2 + b^2)
	var Ac = Math.sqrt(2 * s_in / (Math.pow(q1_alpha,2) + Math.pow(q1_beta,2)));
	var P = Math.pow(Ac, 2) * 0.5 * Math.pow(2 * q1_beta, 2);
	var pe = Q(Math.sqrt(P / (4 * q1_N0 * q1_b_eq)));
	console.log(`1.b) Pe = ${pe}`);

	pe = Q(Math.sqrt(P / (4 * q1_N0 * q1_b_eq_alternative)));
	console.log(`1.c) Pe = ${pe}`);
})();

console.log('');

(function Question2() {
	var pin = Math.pow(Qinv(q2_pe), 2) * q2_N0 * q2_b_eq;
	console.log(`2.a) Pontv = ${todb(pin) + 30} dBm`);

	// Fixed
	pin = Math.pow(Qinv(q2_pe_alternative), 2) * 2 * q2_N0 * q2_b_eq_alternative;

	// pin = -1 * Math.log(q2_pe_alternative) * q2_N0 * q2_b_eq_alternative;
	console.log(`2.b) Pontv = ${todb(pin) + 30} dBm`);
})();

console.log('');

(function Question3() {

	var SNR_I = q3_s_in_no_mod * Math.pow(q3_alpha, 2) / (2 * q3_dual_N0 * q3_b_eq);

	console.log(`3.a) SNR_I = ${todb(SNR_I)} dB`);

	var Pin = q3_s_in_no_mod;
	var E_I = Pin * Math.pow(q3_alpha, 2);
	var E_Q = Pin * Math.pow(q3_beta, 2);

	// SNR changed, Pin did not: N0 must have changed
	var N0 = E_I / q3_snr_after_filter;

	var Pe_I = Q(Math.sqrt(E_I / N0));
	var Pe_Q = Q(Math.sqrt(E_Q / N0));

	// Average
	var Pe = 0.5 * (Pe_I + Pe_Q);
	console.log(`3.b) Pe = ${Pe}`);
})();