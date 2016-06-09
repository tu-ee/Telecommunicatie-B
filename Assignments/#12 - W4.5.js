require('./definitions');

// Question 1
var q1_bitrate_in_kbit = 180;
var q1_Ps_in_dbm = -18;

// BPSK = 0
var q1_delta_f_in_khz = 396;

var q1_f_above_fc_in_khz = 432;

var q1_roll_of_factor = 0.25;

// Question 2
var q2_bitrate_in_kbit = 180;
var q2_delta_f_in_khz = 90;

var q2_change_in_db = -20;

// Question 3
var q3_num_carriers = 46;
var q3_bw_in_mhz = 103;
// BPSK = 2, QPSK = 4
var q3_num_qam = 32;

var q3_alternative_num_qam = 32;

(function Question1() {
	var fdelta = q1_delta_f_in_khz * kilo;
	var bitrate = q1_bitrate_in_kbit * kilo;
	var Ps = fromdb(q1_Ps_in_dbm - 30);

	var Bt = 2 * (fdelta + bitrate);
	
	var n = (bitrate / Bt);
	console.log(`1.a.1) ${Bt/kilo} kHz`);
	console.log(`1.a.2) ${n} bit/sec/Hz`);

	// Ps *= 1.5;
	// var ps_hz = Ps / (Bt - q1_f_above_fc_in_khz * kilo);
	// TODO: check me, factor 2 too high
	var f_diff = Math.abs(q1_delta_f_in_khz - q1_f_above_fc_in_khz) * kilo;
	var ps_hz = (Ps / (4 * bitrate)) * (Math.pow(Math.sin(Math.PI * f_diff / bitrate), 2) / Math.pow(Math.PI * f_diff / bitrate,2));
	console.log(`1.b) ${todb(ps_hz) + 30} dBm/Hz`);

	// Fixed
	Bt = bitrate * (1 + q1_roll_of_factor);
	console.log(`1.c) ${Bt/kilo} kHz`);
})();
console.log('');
(function Question2() {
	var fdelta = q2_delta_f_in_khz * kilo;
	var bitrate = q2_bitrate_in_kbit * kilo;

	var B = bitrate;
	var Bt = 2 * (fdelta + bitrate);
	
	var n = (B / Bt);
	console.log(`2.a) ${Bt/kilo} kHz`);

	bitrate = fdelta * 4;
	console.log(`2.b) ${bitrate/kilo} kbit/sec`);

	// Must approximate
	var target = fromdb(q2_change_in_db);
	var step = 1000000;
	var formula = (f) => {
		return Math.pow(Math.cos(2 * Math.PI * f / bitrate), 2) / 
		(
			(1 - (4 * f / bitrate) * (4 * f / bitrate)) *
			(1 - (4 * f / bitrate) * (4 * f / bitrate))
		);
	};
	var f = downwardsapproximate(target, step, formula);
	console.log(`2.c) ${f * 2 / kilo} kHz`);
})();
console.log('');
(function Question3() {
	var bits = Math.log2(q3_num_qam);
	var bw = q3_bw_in_mhz * mega;

	var bitrate_ss = bw / (q3_num_carriers + 1);
	console.log(`3.a) ${bitrate_ss/kilo} kBaud`);

	var bitrate = bitrate_ss * bits * q3_num_carriers;
	console.log(`3.b) ${bitrate/mega} Mbit/sec`);

	var n = bitrate / bw;
	console.log(`3.c) ${n} bits/s/Hz`);

	bits = Math.log2(q3_alternative_num_qam);
	var bt = 2 * bitrate / bits;
	n = bitrate / bt;
	console.log(`3.d) ${n} bits/s/Hz`);
})();