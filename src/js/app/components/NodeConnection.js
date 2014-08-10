var connections = require('../connections');

class NodeConnection {

	constructor(node1, node2) {
		this.connectFrom = node1;
		this.connectTo = node2;

		this.connect();
	}

	connect() {
		console.log("connecting nodes...");
	}
}

module.exports = NodeConnection;