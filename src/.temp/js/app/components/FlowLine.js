"use strict";
var CanvasItem = require('./CanvasItem');
var FlowLine = function FlowLine(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
};
($traceurRuntime.createClass)(FlowLine, {
  startDraw: function(pos) {
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
    this.draw();
  },
  draw: function() {
    var $__0 = this;
    this.canvas.addEventListener('mousemove', (function(e) {
      var pos = $__0.getMousePos($__0.canvas, e);
      $__0.ctx.lineTo(pos.x, pos.y);
      $__0.ctx.stroke();
    }));
  }
}, {}, CanvasItem);
module.exports = FlowLine;
