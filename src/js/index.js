var Application = require('./app/Application');
window.Kinetic = require('kinetic');

window.onload = function() {
	var app = new Application();
	app.init();
}