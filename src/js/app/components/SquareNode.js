var CanvasItem = require('./CanvasItem');

var squareNodeConfig = {
	width: 100,
	height: 100,
	fill: '#C9EAFF',
	originX: 'center',
	originY: 'center'
}

class SquareNode extends CanvasItem {

	constructor(type) {
		console.log("Creating square..");
		this.nodeConfig = squareNodeConfig;
		this.nodeType = 'Rect';
		super();
	}
}

module.exports = SquareNode;