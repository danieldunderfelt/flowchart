"use strict";
var SquareNode = require('./components/SquareNode');
var g = require('./Globals');
var _ = require('lodash');
var FlowCanvas = function FlowCanvas() {};
($traceurRuntime.createClass)(FlowCanvas, {
  init: function() {
    g.canvas = new fabric.Canvas('flowchart');
    this.setCanvasDimensions();
    this.startListeners();
  },
  startListeners: function() {
    var canvas = document.querySelector("#canvasCnt");
    canvas.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });
    canvas.addEventListener('drop', this.componentDrop.bind(this));
    window.addEventListener('resize', g.throttle(function() {
      this.setCanvasDimensions();
    }, 200, this));
    g.canvas.on('object:moving', function(e) {
      if (e.target.type === "group") {
        e.target.controller.dragMove(e);
      }
    });
  },
  setCanvasDimensions: function(e) {
    var cnt = document.querySelector("#canvasCnt");
    var width = cnt.clientWidth;
    var height = cnt.clientHeight;
    g.canvas.setDimensions({
      'width': width,
      'height': height
    }).renderAll();
  },
  componentDrop: function(e) {
    e.stopPropagation();
    var newNode = new SquareNode();
    newNode.add(g.getMousePos(e));
  }
}, {});
module.exports = FlowCanvas;
