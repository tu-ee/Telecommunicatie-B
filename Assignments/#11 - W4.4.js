require('./definitions');

// Question 1
var q1_wm_in_khz = 10;
var q1_delta_f_in_khz = 50;
var q1_m2_div_vp2 = 0.4;
var q1_s_in_dbm = -21;
var q1_n0_div_2_in_dbm_hz = -95;

var q1_carson_times = 2.5;
var q1_bb_times = 1.5;

// Question 2
var q2_num_order = 3;
var q2_bitrate_in_kbit = 270;

// s(t) = Ac * cose(2 * pi * fc * t + dp * pi * d(t))
var q2_Ac = 30;
var q2_dp = 0.7;

var q2_resistance = 60;


(function Question1() {

	var n0 = fromdb(q1_n0_div_2_in_dbm_hz - 30) * 2;
	var Bbb = q1_wm_in_khz * kilo;
	var Bcarson = 2 * (q1_delta_f_in_khz * kilo + Bbb);
	var Bt = q1_carson_times * Bcarson;

	var s_in = fromdb(q1_s_in_dbm - 30);
	var snr_in = (s_in) / (n0 * Bt);
	console.log(`1.a) ${todb(snr_in)} dB`);

	var Ac = Math.sqrt(2 * s_in);
	var beta_f = q1_delta_f_in_khz * kilo / Bt;
 
	var snr_out = 
		(
			(3 * Math.pow(Ac, 2) * Math.pow(beta_f, 2) * q1_m2_div_vp2) / 
			(2 * n0 * Bbb)
		) *
		(Math.pow(Bt, 2) / Math.pow(Bbb, 2));


	console.log(`1.b) ${todb(snr_out)} dB`);

	Bbb *= q1_bb_times;
	snr_out = 
		(
			(3 * Math.pow(Ac, 2) * Math.pow(beta_f, 2) * q1_m2_div_vp2) / 
			(2 * n0 * Bbb)
		) *
		(Math.pow(Bt, 2) / Math.pow(Bbb, 2));

	console.log(`1.c) ${todb(snr_out)} dB`);
})();

console.log('');

(function Question2() {
	var B_0_0 = 2 * q2_bitrate_in_kbit * kilo * q2_num_order;
	console.log(`2.a) ${B_0_0/kilo} kHz`);


	var Dp = q2_dp * Math.PI;
	// Signal Power
	var Ps = (Math.pow(q2_Ac, 2) / 2) * (Math.pow(Math.cos(Dp), 2) + Math.pow(Math.sin(Dp), 2));
	var Ptot = Ps / q2_resistance;
	console.log(`2.b) ${todb(Ptot) + 30} dBm`);
	
	// Power in carrier
	var Pc = (Math.pow(q2_Ac, 2) / 2) * Math.pow(Math.cos(Dp), 2);
	console.log(`2.c) ${(Pc / Ps) * 100} %`);
})();