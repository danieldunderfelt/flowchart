"use strict";
var CanvasItem = require('./CanvasItem');
var squareNodeConfig = {
  width: 100,
  height: 100,
  fill: '#C9EAFF',
  shadowColor: 'black',
  shadowBlur: 5,
  shadowOffset: 0,
  shadowOpacity: 0.3
};
var SquareNode = function SquareNode(type) {
  this.nodeConfig = squareNodeConfig;
  this.nodeType = 'Rect';
  $traceurRuntime.superCall(this, $SquareNode.prototype, "constructor", []);
};
var $SquareNode = SquareNode;
($traceurRuntime.createClass)(SquareNode, {}, {}, CanvasItem);
module.exports = SquareNode;
