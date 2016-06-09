require('./definitions');

// Question 1
var q1_alarm = 5.5/100;
var q1_noise_rms = 1.5;
var q1_reflect_signal = 3.3;
var q1_nondetect = 1/100;

// Question 2
var q2_A = 10.5;
var q2_Vt_negative = -5.85;
var q2_Vt_positive = 5.35;
var q2_std = 1.8;

(function Question1() {
	var Vt = q1_noise_rms * Qinv(q1_alarm);	
	console.log(`1.a) Vt = ${Vt / milli} mV`);

	var Pmt = Q((q1_reflect_signal - Vt)/ q1_noise_rms);
	console.log(`1.b) Pmt = ${Pmt * 100} %`);

	var Vvl = Qinv(q1_nondetect) * q1_noise_rms + Vt;
	console.log(`1.c) Vvl = ${Vvl / milli} mV`);
})();

(function Question2() {
	var snr_in = Math.pow(q2_A, 2) / (2 * Math.pow(q2_std, 2));
	console.log(`2.a) SNR_in = ${todb(snr_in)} dB`);

	// Signaal s1 meest rechts
	var Pet11 = 0.25 * Q((q2_A - q2_Vt_positive)/q2_std);
	// Signaal s1 meest links
	var Pet21 = 0.25 * Q((q2_A + q2_Vt_negative)/q2_std);
	var Pet1 = Pet11 + Pet21;

	var Pet2 = 0.5 * Q(-1 * q2_Vt_negative / q2_std) + 0.5 * Q(q2_Vt_positive / q2_std);

	var Pet = Pet1 + Pet2;
	console.log(`2.b.1) Pet1 = ${2 * Pet1} `);
	console.log(`2.b.2) Pet2 = ${2 * Pet2} `);
	console.log(`2.b.3) Pet = ${Pet} `);
})();