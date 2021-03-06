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
		console.log('Relaxed ' + node);
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

print();
for(let n = 1; n < node_count; n += 1) {
	let changed = false;
	for(let i = 0; i < links.length; i += 1) {
		let link = links[i];
		changed |= relax(nodes[link[0]], nodes[link[1]], link[2]);
	}
	console.log(`loop #${n} ${changed}`);
	print();
	if(!changed) {
		break;
	}
}
