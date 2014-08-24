var g = require('../Globals');

var textConfig = {
	width: 90,
	height: 90,
	fontSize: 14,
	fontFamily: 'Helvetica Neue',
	fill: '#222',
	textAlign: 'center',
	originX: 'center',
	originY: 'center'
};

class NodeText {

	constructor(shape) {
		this.shape = shape;
		this.textElement = new fabric.Text("add your thought", textConfig);
		this.textElement.controller = this;
		return this.textElement;
	}

	editText(e) {
		this.input = this.createInput();
		this.input.style.top = this.shape.getTop() + "px";
		this.input.style.left = this.shape.getLeft() + "px";
		window.addEventListener('keydown', this.commitEdit.bind(this));
	}

	createInput() {
		var textInput = document.createElement('TEXTAREA');
		textInput.classList.add('node-text-input');
		textInput.setAttribute('maxlength', 100);
		textInput.setAttribute('cols', 10);
		textInput.setAttribute('rows', 5);
		textInput.value = this.textElement.text;
		document.getElementById('canvasCnt').appendChild(textInput);
		return textInput;
	}

	commitEdit(e) {
		if(e.keyCode !== 13 && e.keyCode !== 27) {
			return false;
		}

		e.preventDefault();

		var userText = this.input.value;
		g.purge(this.input);
		this.input.remove();

		if(e.keyCode === 27) return false;

		this.textElement.setText(userText);
		g.canvas.renderAll();
	}
}

module.exports = NodeText;