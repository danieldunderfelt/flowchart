"use strict";
var NodeText = require('./NodeText');
var NodeConnection = require('./NodeConnection');
var g = require('../Globals');
var CanvasItemUtil = require('../CanvasItemUtil');
var _ = require('lodash');
var startZIndex = 0;
var startPos = {};
var generalShapeOptions = {
  selectable: false,
  shadow: "0px 0px 5px rgba(0,0,0,0.3)"
};
var isDragging = false;
var CanvasItem = function CanvasItem() {
  this.groupId = Date.now();
  this.item = new fabric[$traceurRuntime.toProperty(this.nodeType)](_.merge(this.nodeConfig, generalShapeOptions));
  this.text = new NodeText(this.item);
  this.itemGroup = new fabric.Group([this.item, this.text], {
    left: 0,
    top: 0,
    id: this.groupId,
    hasControls: false,
    controller: this
  });
  $traceurRuntime.setProperty(g.controllers, this.groupId, this);
  this.connections = [];
  this.connectionInProgress = null;
};
($traceurRuntime.createClass)(CanvasItem, {
  add: function(pos) {
    this.setPos(pos);
    g.canvas.add(this.itemGroup);
  },
  dragMove: function(e) {
    e.target.setCoords();
    if (this.connections.length > 0)
      this.updateConnections();
    this.doConnection(e);
  },
  doConnection: function(e) {
    var me = e.target;
    var intersecting = false;
    var items = g.canvas.getObjects();
    for (var i = 0,
        n = items.length; i < n; i++) {
      var m = items[$traceurRuntime.toProperty(i)];
      if (me === m || m.type !== "group")
        continue;
      if (me.intersectsWithObject(m)) {
        intersecting = m;
        break;
      }
    }
    if (!this.intersectionFound && intersecting !== false) {
      this.intersectionFound = true;
      this.connectTo(intersecting);
    } else if (this.intersectionFound && intersecting === false) {
      this.intersectionFound = false;
      if (this.connectionInProgress !== null)
        this.connectionInProgress.cancel();
    }
  },
  updateConnections: function() {
    for (var con = 0; con < this.connections.length; con++) {
      this.connections[$traceurRuntime.toProperty(con)].renderConnection();
    }
  },
  checkExistingConnections: function(node) {
    var status = false;
    for (var con = 0; con < this.connections.length; con++) {
      if (this.connections[$traceurRuntime.toProperty(con)].connectTo === node) {
        status = true;
      }
    }
    return status;
  },
  connectTo: function(node) {
    if (!this.checkExistingConnections(node)) {
      this.connectionInProgress = new NodeConnection(this.itemGroup, node, this.afterConnect.bind(this));
      this.connectionInProgress.start();
    }
  },
  afterConnect: function(connection) {
    this.intersectionFound = false;
    this.connectionInProgress = null;
  },
  remove: function() {
    g.removeFromIndex(this.itemGroup);
    this.itemGroup.destroy();
  }
}, {}, CanvasItemUtil);
module.exports = CanvasItem;
