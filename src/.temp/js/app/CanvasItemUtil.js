"use strict";
var helpers = require('./Helpers');
var CanvasItemUtil = function CanvasItemUtil() {};
($traceurRuntime.createClass)(CanvasItemUtil, {
  setPos: function(pos) {
    this.itemGroup.x(pos.x - (this.item.width() / 2));
    this.itemGroup.y(pos.y - (this.item.height() / 2));
  },
  highlight: function() {
    this.item.setAttrs({
      shadowOpacity: 0.5,
      shadowBlur: 20
    });
  },
  removeHighlight: function() {
    this.item.setAttrs({
      shadowOpacity: 0.3,
      shadowBlur: 5
    });
  },
  add: function(layer) {
    layer.add(this.itemGroup);
    layer.draw();
  }
}, {});
module.exports = CanvasItemUtil;
