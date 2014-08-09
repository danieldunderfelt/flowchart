var helpers = require('../Helpers');

var textConfig = {
	text: 'Add your thought',
	fontSize: 14,
	fontFamily: 'Helvetica Neue',
	fill: '#222',
	width: 95,
	height: 100,
	padding: 10,
	align: 'center',
};

class NodeText {

	constructor(parent) {
		this.parent = parent;
		this.textElement = new Kinetic.Text(textConfig);
		this.textElement.on('dblclick', this.editText.bind(this));
	}

	editText(e) {
		this.input = this.createInput();
		this.input.style.left = this.parent.x() + "px";
		this.input.style.top = this.parent.y() + "px";
		window.addEventListener('keydown', this.commitEdit.bind(this));
	}

	createInput() {
		var textInput = document.createElement('TEXTAREA');
		textInput.classList.add('node-text-input');
		textInput.setAttribute('maxlength', 100);
		textInput.setAttribute('cols', 10);
		textInput.setAttribute('rows', 5);
		textInput.value = this.textElement.text();
		document.querySelector('#flowchart').appendChild(textInput);
		return textInput;
	}

	commitEdit(e) {
		if(e.keyCode !== 13 && e.keyCode !== 27) {
			return false;
		}

		e.preventDefault();

		var userText = this.input.value;
		helpers.purge(this.input);
		this.input.remove();

		if(e.keyCode === 27) return false;

		this.textElement.text(userText);
		this.parent.draw();
	}
}

module.exports = NodeText;