var g = require('../Globals');
var _ = require('lodash');

var indicatorProps = {
	radius: 500,
	opacity: 0.3,
	selectable: false,
	hasControls: false,
	fill: '#ff0000'
};

class NodeConnection {

	constructor(node1, node2, cb) {
		this.connectFrom = node1;
		this.connectTo = node2;
		this.callback = cb;

		this.indicator = null;
		this.line = null;

		console.log(this.connectTo);
	}

	start() {
		this.indicator = new fabric.Circle(_.merge(indicatorProps, {
			left: this.connectTo.getLeft(),
			top: this.connectTo.getTop(),
		}));

		g.canvas.add(this.indicator);
		this.indicator.sendToBack();

		this.indicator.animate('radius', 100, {
			onChange: g.canvas.renderAll.bind(g.canvas),
			onComplete: this.connect.bind(this),
			duration: 1000,
			easing: fabric.util.ease.easeOutExpo
		});
	}

	cancel() {
		console.log("connection canceled...");
		if(this.indicator !== null) this.indicator.remove();
		g.canvas.renderAll();
	}

	connect() {
		console.log("connecting nodes...");

		this.indicator.remove();

		this.renderConnection();

		g.controllers[this.connectFrom.id].connections.push(this);
		g.controllers[this.connectTo.id].connections.push(this);

		this.callback(this);
	}

	renderConnection() {
		if(this.line !== null) this.line.remove();

		this.line = new fabric.Line(this.buildLinePoints(), {
			stroke: "#000000",
			strokeWidth: 1,
			selectable: false,
			hasControls: false
		});

		g.canvas.add(this.line);
		this.line.sendToBack();
		g.canvas.renderAll();
	}

	buildLinePoints() {
		var n1Pos = this.connectFrom.getCenterPoint();
		var n2Pos = this.connectTo.getCenterPoint();

		var points = [
			n1Pos.x,
			n1Pos.y,
			n2Pos.x,
			n2Pos.y
		];

		return points;
	}
}

module.exports = NodeConnection;