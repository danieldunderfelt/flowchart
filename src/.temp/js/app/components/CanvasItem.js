"use strict";
var NodeText = require('./NodeText');
var NodeConnection = require('./NodeConnection');
var g = require('../Globals');
var CanvasItemUtil = require('../CanvasItemUtil');
var _ = require('lodash');
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
  this.startZIndex = 0;
  this.startPos = null;
};
($traceurRuntime.createClass)(CanvasItem, {
  add: function(pos) {
    this.setPos(pos);
    g.canvas.add(this.itemGroup);
  },
  dragMove: function(e) {
    e.target.setCoords();
    this.dragStart(e);
    if (this.connections.length > 0)
      this.updateConnections();
    this.doConnection(e);
    this.dragEnd();
  },
  dragStart: function(e) {
    if (!this.startPos) {
      this.startPos = this.itemGroup.getCenterPoint();
      this.startZIndex = g.canvas.getObjects().indexOf(this.itemGroup);
      this.itemGroup.bringToFront();
    }
  },
  dragEnd: function(e) {},
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
      if (this.connectionInProgress !== null) {
        this.connectionInProgress.cancel();
      }
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
      var conn = this.connections[$traceurRuntime.toProperty(con)];
      if (conn.connectTo === node || conn.connectFrom === node) {
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
    var self = this;
    this.intersectionFound = false;
    this.connectionInProgress = null;
    this.itemGroup.animate({
      left: this.startPos.x,
      top: this.startPos.y
    }, {
      duration: 1000,
      easing: fabric.util.ease.easeOutExpo,
      onChange: g.canvas.renderAll.bind(g.canvas),
      onComplete: function() {
        this.startPos = null;
        self.itemGroup.moveTo(self.startZIndex);
      }
    });
  },
  remove: function() {
    this.itemGroup.remove();
  }
}, {}, CanvasItemUtil);
module.exports = CanvasItem;
