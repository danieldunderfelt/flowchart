"use strict";
var g = require('../Globals');
var textConfig = {
  fontSize: 14,
  fontFamily: 'Helvetica Neue',
  fill: '#222',
  textAlign: 'center',
  originX: 'center',
  originY: 'center'
};
var NodeText = function NodeText(shape) {
  this.shape = shape;
  this.textElement = new fabric.Text("add your thought", textConfig);
  this.textElement.on('dblclick', this.editText.bind(this));
  return this.textElement;
};
($traceurRuntime.createClass)(NodeText, {
  editText: function(e) {
    this.input = this.createInput();
    this.input.style.top = this.shape.getTop() + "px";
    this.input.style.left = this.shape.getLeft() + "px";
    window.addEventListener('keydown', this.commitEdit.bind(this));
  },
  createInput: function() {
    var textInput = document.createElement('TEXTAREA');
    textInput.classList.add('node-text-input');
    textInput.setAttribute('maxlength', 100);
    textInput.setAttribute('cols', 10);
    textInput.setAttribute('rows', 5);
    textInput.value = this.textElement.text();
    document.querySelector('#flowchart').appendChild(textInput);
    return textInput;
  },
  commitEdit: function(e) {
    if (e.keyCode !== 13 && e.keyCode !== 27) {
      return false;
    }
    e.preventDefault();
    var userText = this.input.value;
    g.purge(this.input);
    this.input.remove();
    if (e.keyCode === 27)
      return false;
    this.textElement.setText(userText);
    g.canvas.renderAll();
  }
}, {});
module.exports = NodeText;
