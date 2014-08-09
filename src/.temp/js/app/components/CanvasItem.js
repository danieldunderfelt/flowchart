"use strict";
var NodeText = require('./NodeText');
var groupConfig = {draggable: true};
var CanvasItem = function CanvasItem() {
  this.itemGroup = new Kinetic.Group(groupConfig);
  this.item = new Kinetic[$traceurRuntime.toProperty(this.nodeType)](this.nodeConfig);
  this.text = new NodeText(this.itemGroup);
  this.itemGroup.add(this.item);
  this.itemGroup.add(this.text.textElement);
};
($traceurRuntime.createClass)(CanvasItem, {
  addTo: function(layer, pos) {
    this.setPos(pos);
    this.add(layer);
  },
  remove: function() {
    this.itemGroup.destroy();
  },
  connectTo: function(node) {},
  add: function(layer) {
    layer.add(this.itemGroup);
    layer.draw();
  },
  setPos: function(pos) {
    this.itemGroup.x(pos.x - (this.item.width() / 2));
    this.itemGroup.y(pos.y - (this.item.height() / 2));
  }
}, {});
module.exports = CanvasItem;
