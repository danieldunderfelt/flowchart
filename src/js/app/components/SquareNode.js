var CanvasItem = require('./CanvasItem');

var squareNodeConfig = {
	width: 100,
	height: 100,
	fill: '#C9EAFF',
	shadowColor: 'black',
	shadowBlur: 5,
	shadowOffset: 0,
	shadowOpacity: 0.3
}

class SquareNode extends CanvasItem {

	constructor(type) {
		this.nodeConfig = squareNodeConfig;
		this.nodeType = 'Rect';
		super();
	}
}

module.exports = SquareNode;