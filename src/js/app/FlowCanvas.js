var SquareNode = require('./components/SquareNode');

var helpers = require('./Helpers');
var _ = require('lodash');

class FlowCanvas {

	constructor() {
		helpers.stage = new Kinetic.Stage({
			container: 'flowchart',
			width: 1400,
			height: 900
		});

		helpers.layer = new Kinetic.Layer({
			id: "mainLayer"
		});

		helpers.stage.add(helpers.layer);
	}

	init() {
		this.startListeners();
	}

	startListeners() {
		var canvasCnt = document.querySelector("#flowchart");

		canvasCnt.addEventListener('dragover', function(e) {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		});

		canvasCnt.addEventListener('drop', this.componentDrop.bind(this));
	}

	componentDrop(e) {
		e.stopPropagation();
		var newNode = new SquareNode();
		newNode.addTo(helpers.layer, helpers.getMousePos(e));
	}
}

module.exports = FlowCanvas;