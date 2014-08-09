"use strict";
var CanvasItem = require('./CanvasItem');
var FlowItem = function FlowItem() {
  $traceurRuntime.defaultSuperCall(this, $FlowItem.prototype, arguments);
};
var $FlowItem = FlowItem;
($traceurRuntime.createClass)(FlowItem, {}, {}, CanvasItem);
module.exports = FlowItem;
