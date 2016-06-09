

// Question 1
var modulation_index = 0.8;
var x_max = 0.5;
var x_min = -1 * x_max;
var E_x2 = 0.125;
var voltage = 140;
var resistance = 95;
var bandwith = 400; // Hz


// Question 2
var type_in_a = 'lssb'; // lssb or ussb
var Am = 1;
var Bm = 4.5;
var Ac = 130;
var R = 115;

var f_hz_above_fc = 160;

require('./definitions.js');

var modulation_depth = modulation_index * (x_max - x_min) * 0.5 * 100;

console.log(`1.a) ${modulation_depth} %`);

var P_avg = (Math.pow(voltage, 2) / (2 * resistance)) * 
	(1 + Math.pow(modulation_index,2) * E_x2);

console.log(`1.b) ${todb(P_avg)} dBW`);

var PEP = (
	Math.pow(voltage, 2) / 
	(2 * resistance)
) * Math.pow(1 + modulation_index * x_max, 2);

console.log(`1.c) ${todb(PEP)} dBW`);

var modulation_efficiency = (
	(Math.pow(modulation_index, 2) * E_x2) /
	(1 + Math.pow(modulation_index, 2) * E_x2)
);

console.log(`1.d) ${modulation_efficiency * 100} %`);

var p_sideband = P_avg * modulation_efficiency;
// half the power in 1 side of the sideband
var p_d = p_sideband * 0.5 / bandwith;

console.log(`1.e) ${todb(p_d / milli)} dBm/Hz`);

console.log('');

if(type_in_a === 'lssb') {
	console.log('2.a) Ac*Am*cos(2*pi(fc-fm)t)+Ac*Bm*sin(2*pi(fc-some_factor*fm)t)');
} else {
	console.log('2.a) Ac*Am*cos(2*pi(fc+fm)t)+Ac*Bm*sin(2*pi(fc+some_factor*fm)t)');
}

var rms = Math.sqrt(
	(Math.pow(Ac * Am / Math.sqrt(2), 2)) +
	(Math.pow(Ac * Bm / Math.sqrt(2), 2))
);

console.log(`2.b) ${rms} V`);

var v_peak = Ac * (Am + Bm);
console.log(`2.c) ${v_peak} V`);

var P_gem = Math.pow(rms, 2) / R;
var PEP_2 = 0.5 * Math.pow(v_peak, 2) / R;
console.log(`2.d.1) ${todb(P_gem)} dBW`);
console.log(`2.d.2) ${todb(PEP_2)} dBW`);