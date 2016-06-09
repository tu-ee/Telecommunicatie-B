// definitions
global.todb = val => 10 * Math.log10(val);
global.fromdb = val => Math.pow(10, val / 10);

global.kilo = 1000;			// k
global.mega = kilo * kilo;		// M
global.giga = mega * kilo;		// G

global.deci = 0.1; 			// d
global.centi = deci / 10; 		// c
global.milli = centi / 10; 	// m
global.micro = milli / 1000; 	// μ
global.nano = micro / 1000; 	// n
global.pico = nano / 1000; 	// p
global.lightspeed = 3 * Math.pow(10, 8);
global.t0 = 290;
global.k = 1.38 * Math.pow(10, -23); // Blotzman
global.h = 6.63 * Math.pow(10, -34); // Planck

global.fromf = val => (val - 1) * t0;
global.tof = val => val / t0 + 1;

global.downwardsapproximate = (target, step, formula, base, depth) => {
	var calc = 0, i = 0;
	base = base || 0;
	depth = depth || 0;
	
	do {
		i += 1;
		calc = formula(base + i * step);
	} while(calc > target)
	if(depth > 20) {
		return base + (i - 1) * step;
	}
	return downwardsapproximate(target, step / 10, formula, base + (i - 1) * step, depth+1);
};

global.upwardsapproximate = (target, step, formula, base, depth) => {
	var calc = 0, i = 0;
	base = base || 0;
	depth = depth || 0;
	
	do {
		i += 1;
		calc = formula(base + i * step);
	} while(calc < target)
	if(depth > 20) {
		return base + (i - 1) * step;
	}
	return upwardsapproximate(target, step / 10, formula, base + (i - 1) * step, depth + 1);
};

var p = 0.2316419;
var b1 = 0.31981530;
var b2 = -0.356563782;
var b3 = 1.781477937;
var b4 = -1.821255978;
var b5 = 1.330274429;

global.Q = (z) => {
	// var t = 1 / (1 + p * z);
	// var x = b1 * t + 
	// b2 * Math.pow(t, 2) + 
	// b3 * Math.pow(t, 3) + 
	// b4 * Math.pow(t, 4) + 
	// b5 * Math.pow(t, 5);
	// return Math.pow(Math.e, -1 * z * z / 2) * x / Math.sqrt(2 * Math.PI);
	return 0.5 * require('./erfc').erfc(z / Math.sqrt(2));
};

global.Qinv = (p) => {
	return Math.sqrt(2) * require('./erfc').invErfc(p / 0.5);
};