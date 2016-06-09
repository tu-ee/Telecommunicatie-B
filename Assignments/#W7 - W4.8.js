require('./definitions');

var q1_alarm = 0.02;
var q1_noise_rms = 1;
var q1_reflect_signal = 3;
var q1_ratio = 2;

var q2_A = 8;
var q2_Vt_negative = -4;
var q2_Vt_positive = 5;
var q2_std = 1.4;

var q3_birate = 1.5e6;
var q3_p_in = fromdb(-18 - 30);
var q3_n0 = fromdb(-92 - 30);

var q4_bitrate = 150e3;
var q4_alpha = 4.5;
var q4_beta = 2.5;
var q4_n0 = fromdb(-91 - 30);
var q4_noise_bandwith = q4_bitrate / 2;
var q4_p_in = fromdb(-21.2 - 30);

var q4_alternative_bitrate = 1.6 * q4_bitrate;

(function Question1() {
	var Vt = q1_noise_rms * Qinv(q1_alarm);	
	console.log(`1.a) Vt = ${Vt} V`);

	var Pmt = Q((q1_reflect_signal - Vt)/ q1_noise_rms);
	console.log(`1.b) Pmt = ${Pmt}`);
})();

console.log('');

(function Question2() {

	var snr_in = Math.pow(q2_A, 2) / (2 * Math.pow(q2_std, 2));
	console.log(`2.a) SNR_in = ${todb(snr_in)} dB`);

	// Signaal s1 meest rechts
	var Pet11 = 0.5 * Q((q2_A - q2_Vt_positive)/q2_std);
	// Signaal s1 meest links
	var Pet21 = 0.5 * Q((q2_A + q2_Vt_negative)/q2_std);
	var Pe1 = Pet11 + Pet21;

	var Pe2 = Q(-1 * q2_Vt_negative / q2_std) + Q(q2_Vt_positive / q2_std);

	var Pe = 0.5 * (Pe1 + Pe2);
	console.log(`2.b) Pe1 = ${Pe1}`);
	console.log(`2.b) Pe2 = ${Pe2}`);
	console.log(`2.b) Pe = ${Pe}`);
})();

console.log('');

(function Question3() {
	var snr = q3_p_in / (q3_n0 * q3_birate);
	var pe = Q(Math.sqrt(snr));
	console.log(`3.a) Pe = ${pe} `);

	var snr_dpsk = Math.log(pe * 2) * -1;
	console.log(`3.b) SNR_dpsk = ${todb(snr_dpsk)} dB`);

	var snr_bpsk = Math.pow(Qinv(pe), 2) / 2;
	console.log(`3.b) SNR_bpsk = ${todb(snr_bpsk)} dB`);
})();

console.log('');

(function Question4() {
	var P_bpsk = (
		Math.pow(q4_beta, 2) / 
		(Math.pow(q4_beta, 2) + Math.pow(q4_alpha, 2))
	) * q4_p_in;

	var snr = P_bpsk / (q4_n0 * q4_noise_bandwith);
	// console.log(`${Math.sqrt(snr)}`);
	var pe = Q(Math.sqrt(snr));
	console.log(`4.a) Pe = ${pe} `);
	pe = Q(Math.sqrt(P_bpsk / (q4_n0 * q4_alternative_bitrate)));
	console.log(`4.b) Pe = ${pe} `);
})();