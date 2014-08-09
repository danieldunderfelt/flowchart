var SquareNode = require('./components/SquareNode');

var helpers = require('./Helpers');
var _ = require('lodash');

class FlowCanvas {

	constructor() {
		helpers.stage = new Kinetic.Stage({
			container: 'flowchart',
			width: 1000,
			height: 800
		});

		this.layer = new Kinetic.Layer();
		helpers.stage.add(this.layer);
	}

	init() {
		this.startListeners();
	}

	startListeners() {
		var canvasEle = document.querySelector("#flowchart canvas");

		canvasEle.addEventListener('dragover', function(e) {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		});

		canvasEle.addEventListener('drop', this.componentDrop.bind(this));
	}

	componentDrop(e) {
		e.stopPropagation();
		var newNode = new SquareNode();
		newNode.addTo(this.layer, helpers.getMousePos(e));
	}
}

module.exports = FlowCanvas;