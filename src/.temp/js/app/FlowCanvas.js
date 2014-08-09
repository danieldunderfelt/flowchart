"use strict";
var SquareNode = require('./components/SquareNode');
var helpers = require('./Helpers');
var _ = require('lodash');
var FlowCanvas = function FlowCanvas() {
  helpers.stage = new Kinetic.Stage({
    container: 'flowchart',
    width: 1000,
    height: 800
  });
  this.layer = new Kinetic.Layer();
  helpers.stage.add(this.layer);
};
($traceurRuntime.createClass)(FlowCanvas, {
  init: function() {
    this.startListeners();
  },
  startListeners: function() {
    var canvasEle = document.querySelector("#flowchart canvas");
    canvasEle.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    canvasEle.addEventListener('drop', this.componentDrop.bind(this));
  },
  componentDrop: function(e) {
    e.stopPropagation();
    var newNode = new SquareNode();
    newNode.addTo(this.layer, helpers.getMousePos(e));
  }
}, {});
module.exports = FlowCanvas;
