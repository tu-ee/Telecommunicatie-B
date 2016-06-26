require('./definitions');

// Question 1
var q1_bitrate = 1e6;
var q1_distance = 2;

// Question 2
var q2_bitrate = 32e3;
var q2_f_delta = 15e3;
var q2_factor_below = fromdb(-6);

// Question 3
var q3_bitrate = 1e6;
var q3_received_power = fromdb(-14 - 30);
var q3_percentage_carrier = 25 / 100;

// Question 4
var q4_bandwith = 10e6;
var q4_required_bitrate = 20e6;
var q4_subcarriers = 8;

(function Question1() {
	var p_bpsk = Math.pow(q1_distance/2, 2);
	var p_8psk = Math.pow(q1_distance/2, 2) + Math.pow(q1_distance/2 + Math.sqrt(q1_distance), 2);
	var p_16qam = Math.pow(q1_distance/2, 2) + Math.pow(q1_distance/2 + q1_distance, 2);
	console.log(`1.a.1) BPSK = ${p_bpsk} W`);
	console.log(`1.a.2) 8-PSK = ${p_8psk} W`);
	console.log(`1.a.3) 16-QAM = ${p_16qam} W`);

	var Tb = 1 / q1_bitrate;
	var p_bpsk_e = p_bpsk * Tb;
	var p_8psk_e = p_8psk * (Tb*3); // 3 bits per sample(Ts = 3 * Tb)
	var p_16qam_e = p_16qam * (Tb*4); // 4 bits per sample (Ts = 4 * Tb)
	console.log(`1.b.1) BPSK = ${p_bpsk_e / micro} μJ`);
	console.log(`1.b.2) 8-PSK = ${p_8psk_e / micro} μJ`);
	console.log(`1.b.3) 16-QAM = ${p_16qam_e / micro} μJ`);
	 
	var BW_bpsk = 2 * q1_bitrate; // Double sided
	var BW_8psk = (1/3) * 2 * q1_bitrate; // Double sided
	var BW_16qam = (1/4) * 2 * q1_bitrate; // Double sided

	console.log(`1.c.1) BPSK = ${BW_bpsk / mega} MHz`);
	console.log(`1.c.2) 8-PSK = ${BW_8psk / mega} MHz`);
	console.log(`1.c.3) 16-QAM = ${BW_16qam / mega} MHz`);
	
})();
console.log('');
(function Question2() {
	var Bt = 2 * (q2_f_delta + q2_bitrate);
	
	// var n = (bitrate / Bt);
	console.log(`2.a) ${Bt/kilo} kHz`);

	var msk_bitrate = q2_f_delta * 4;
	console.log(`2.b) ${msk_bitrate/kilo} kbit/sec`);

	// Must approximate
	var target = q2_factor_below;
	var step = 1000000;
	var formula = (f) => {
		return Math.pow(Math.cos(2 * Math.PI * f / msk_bitrate), 2) / 
		(
			(1 - (4 * f / msk_bitrate) * (4 * f / msk_bitrate)) *
			(1 - (4 * f / msk_bitrate) * (4 * f / msk_bitrate))
		);
	};
	var f = downwardsapproximate(target, step, formula);
	console.log(`2.c) ${f * 2 / kilo} kHz`);
})();
console.log('');
(function Question3() {

	console.log(`3.a) Ac [cos(angle_sensitivity)*cos(2*pi*fc*t) - d(t)*sin(angle_sensitivity)*sin(2*pi*fc*t)`);
	var angle_sensitivity = Math.acos(Math.sqrt(q3_percentage_carrier));
	console.log(`3.b) ${angle_sensitivity/Math.PI} Pi Rad`);

	console.log(`3.c) 0.5 * P (at fc) + sinc^2 spectrum with 0's at fc +- k * bitrate`);
})();
console.log('');
(function Question4() {
	var bitrate_ss = q4_bandwith / (q4_subcarriers + 1);
	var bits = Math.ceil(q4_required_bitrate / (bitrate_ss * q4_subcarriers));
	var m = Math.pow(2, bits);
	console.log(`4.a) M = ${m}`);

	var bitrate = bits * bitrate_ss * q4_subcarriers;
	console.log(`4.b) R = ${bitrate / mega} Mbit/s`);

	var n = bitrate / q4_bandwith;
	console.log(`4.c) n = ${n} bits/hz/s`);
}) ();