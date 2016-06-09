// "use strict";

require('./definitions.js');
(function Question1(){
	// Question 1
	var f_start_in_hz = 20;
	var f_end_in_khz = 15;

	var f_c_out_in_mhz = 96.3;
	var f_modulator_in_mhz = 4.3;
	var oscilator_side = 'up';

	var frequency_multiplier = 6;
	var peak_phase = 0.25;

	// var f_d = f_end_in_khz * kilo - f_start_in_hz;
	// var f_i = f_c_out_in_mhz * mega / frequency_multiplier + (1/(2 * Math.PI) * f_d);
	var f_i = f_c_out_in_mhz * mega / frequency_multiplier;
	console.log(`1.a.1) ${f_i/kilo} kHz`);

	var f_o = oscilator_side === 'up' ? 
		f_i + f_modulator_in_mhz * mega 
			: 
		f_i - f_modulator_in_mhz * mega;

	console.log(`1.a.2) ${f_o/kilo} kHz`);

	var max_phase = Math.PI / frequency_multiplier;
	console.log(`1.b) ${max_phase} rad`);

	var B = 2 * (peak_phase + 1) * f_end_in_khz * kilo;
	console.log(`1.c) ${B/kilo} kHz`);
})();
console.log('');
(function Question2() {
	// Question 2
	var Ac = 420;
	var beta = 2.2;
	var fm_in_khz = 105;
	var peak_phase = 0.25;
	var Df_in_khz_volt = 95;

	var Df_in_khz_volt_2 = 1;
	var fm_in_khz_2 = 2.5;
	var n = 5;
	var num_zero = 1;

	var f_delta_in_khz = 32;

	var bessel_table = [
		[],
		[2.4, 3.83, 5.14, 6.38, 7.59, 8.77, 9.93],
		[5.52, 7.02, 8.42, 9.76, 11.06, 12.34, 13.59],
	];

	var Am_phase = beta / peak_phase;

	console.log(`2.a) ${Am_phase} V`);

	var Am_frequency = beta * fm_in_khz * kilo / 
		(Df_in_khz_volt * kilo);

	console.log(`2.b) ${Am_frequency} V`);

	var beta_zero = bessel_table[num_zero][n];
	var Am_zero = beta_zero * fm_in_khz_2 * kilo / 
		(Df_in_khz_volt_2 * kilo);

	console.log(`2.c) ${Am_zero} V`);

	var beta_configured = f_delta_in_khz * kilo / (fm_in_khz_2 * kilo);
	console.log(`2.d.1) ${beta_configured} `);
	var Bt = 2 * (beta_configured + 1) * fm_in_khz_2 * kilo;
	console.log(`2.d.2) ${Bt / kilo} kHz`);
})();

console.log('');
(function Question3() {
	var N0_div_2 = 6 * Math.pow(10, -9);
	
	var m2_avg = 0.55;
	var m_avg = 0;
	var m_abs_max = 1;

	var Wm_in_khz = 5;
	var modulation_index = 0.5;

	var P_no_mod_in_dbm = 14;

	var P_no_mod = fromdb(P_no_mod_in_dbm - 30);
	var NO = N0_div_2 * 2;
	var BW = 2 * Wm_in_khz * kilo;
	var P_mod = P_no_mod * 
		(1 + Math.pow(modulation_index, 2) * m2_avg);
	var P_demod = (P_mod - P_no_mod) * 2;

	var SN_baseband = P_mod / (NO * BW);

	var SN_AM_in = P_mod / (NO * BW);
	var SN_AM_out = P_demod / (NO * BW);

	console.log(`3.a.1) ${todb(SN_AM_in)} dB`);
	console.log(`3.a.1) ${todb(SN_AM_out)} dB`);

	var SN_DSB_out = SN_AM_out;
	console.log(`3.b) ${todb(SN_DSB_out)} dB`);

	var SN_SSB_out = P_demod / (2 * NO * BW);
	console.log(`3.c) ${todb(SN_SSB_out)}`);
})();