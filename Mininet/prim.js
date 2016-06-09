"use strict";
var node_count = 8,
	nodes = [null],
	links = [
		[1,	2,	2],
		[2,	1,	2],
		[1,	3,	2],
		[3,	1,	2],
		[2,	4,	7],
		[4,	2,	7],
		[2,	5,	1],
		[5,	2,	1],
		[3,	4,	2],
		[4,	3,	2],
		[3,	5,	5],
		[5,	3,	5],
		[4,	6,	3],
		[6,	4,	3],
		[4,	7,	1],
		[7,	4,	1],
		[5,	6,	2],
		[6,	5,	2],
		[5,	7,	8],
		[7,	5,	8],
		[6,	8,	9],
		[8,	6,	9],
		[7,	8,	1],
		[8,	7,	1],
	];

class Node {
	constructor(num, weight, prev) {
		this.num = num;
		this.weight = weight;
		this.prev = prev;
	}

	toString() {
		return `#${this.num}(weight=${this.weight === Number.MAX_VALUE ? 'Inf' : this.weight},prev=${this.prev})`;
	}
}

function relax(prev, node, link_weight) {
	if(node.weight > prev.weight + link_weight) {
		node.weight = prev.weight + link_weight;
		node.prev = prev.num;
		return true;
	}
	return false;
}
function print() {
	for(let i = 1; i < nodes.length; i += 1) {
		console.log(nodes[i] + '');
	}
}

nodes[1] = new Node(1, 0, 'L');
for(let i = 2; i <= node_count; i += 1) {
	nodes[i] = new Node(i, Number.MAX_VALUE, null);
}

// print();

function random(max) {
	return (Math.random() * max) | 0;
}
var start = random(node_count) + 1;
var connected = [start];
var connectedLinks = [];
console.log(`Start at ${start}`);
function connect() {
	var availableLinks = [];
	links.forEach(function(link) {
		if(connected.includes(link[0]) && !connected.includes(link[1])) {
			availableLinks.push(link);
		}
	});
	availableLinks.sort(function(l1, l2) {
		return l1[2] - l2[2];
	});
	if(!availableLinks.length) {
		return false;
	}
	var link = availableLinks.shift();
	connected.push(link[1]);
	connectedLinks.push(link);
	console.log(`Connected ${link[1]} from ${link[0]} cost: ${link[2]}`);
	return true;
}
while(connect()) {

}
var weight = 0;
connectedLinks.forEach(l => { weight += l[2]; });
console.log(`Total weight: ${weight}`);