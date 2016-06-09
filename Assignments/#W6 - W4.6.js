require('./definitions');

var q1_bitrate = 1e6;
var q1_distance = 2;

(function Question1() {
	var p_bpsk = Math.pow(q1_distance/2, 2) * 2;
	var p_8psk = Math.pow(q1_distance/2, 2) + Math.pow(q1_distance/2 + q1_distance, 2);
	var p_16qam = p_8psk;
	console.log('1.a.1) BPSK = ${p_bpsk} W');
	console.log('1.a.2) 8-PSK = ${p_8psk} W');
	console.log('1.a.3) 16-QAM = ${p_16qam} W');
	 
})();