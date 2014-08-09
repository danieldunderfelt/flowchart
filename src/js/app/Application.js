var View = require('./View');
var FlowCanvas = require('./FlowCanvas');

class Application {

	constructor() {
		this.view = new View();
		this.flowCanvas = new FlowCanvas();
	}

	init() {
		this.view.init();
		this.flowCanvas.init();
	}
}

module.exports = Application;