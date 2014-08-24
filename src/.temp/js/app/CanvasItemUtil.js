"use strict";
var g = require('./Globals');
var CanvasItemUtil = function CanvasItemUtil() {};
($traceurRuntime.createClass)(CanvasItemUtil, {
  setPos: function(pos) {
    this.itemGroup.set('left', pos.x);
    this.itemGroup.set('top', pos.y);
    this.itemGroup.setCoords();
    g.canvas.renderAll();
  },
  highlight: function() {},
  removeHighlight: function() {}
}, {});
module.exports = CanvasItemUtil;
