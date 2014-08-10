"use strict";
var SquareNode = require('./components/SquareNode');
var helpers = require('./Helpers');
var _ = require('lodash');
var FlowCanvas = function FlowCanvas() {
  helpers.stage = new Kinetic.Stage({
    container: 'flowchart',
    width: 1400,
    height: 900
  });
  helpers.layer = new Kinetic.Layer({id: "mainLayer"});
  helpers.stage.add(helpers.layer);
};
($traceurRuntime.createClass)(FlowCanvas, {
  init: function() {
    this.startListeners();
  },
  startListeners: function() {
    var canvasCnt = document.querySelector("#flowchart");
    canvasCnt.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    canvasCnt.addEventListener('drop', this.componentDrop.bind(this));
  },
  componentDrop: function(e) {
    e.stopPropagation();
    var newNode = new SquareNode();
    newNode.addTo(helpers.layer, helpers.getMousePos(e));
  }
}, {});
module.exports = FlowCanvas;
