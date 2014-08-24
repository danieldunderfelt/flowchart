"use strict";
var CanvasItem = require('./CanvasItem');
var squareNodeConfig = {
  width: 100,
  height: 100,
  fill: '#C9EAFF',
  originX: 'center',
  originY: 'center'
};
var SquareNode = function SquareNode(type) {
  console.log("Creating square..");
  this.nodeConfig = squareNodeConfig;
  this.nodeType = 'Rect';
  $traceurRuntime.superCall(this, $SquareNode.prototype, "constructor", []);
};
var $SquareNode = SquareNode;
($traceurRuntime.createClass)(SquareNode, {}, {}, CanvasItem);
module.exports = SquareNode;
