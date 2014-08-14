"use strict";
var NodeText = require('./NodeText');
var NodeConnection = require('./NodeConnection');
var helpers = require('../Helpers');
var CanvasItemUtil = require('../CanvasItemUtil');
var groupConfig = {draggable: true};
var startZIndex = 0;
var startPos = {};
var isDragging = false;
var CanvasItem = function CanvasItem() {
  this.groupId = Date.now();
  this.itemGroup = new Kinetic.Group(groupConfig);
  this.item = new Kinetic[$traceurRuntime.toProperty(this.nodeType)](this.nodeConfig);
  this.text = new NodeText(this.itemGroup);
  this.itemGroup.setAttrs({
    id: 'group-' + this.groupId,
    name: 'nodeContainer'
  });
  this.item.setAttrs({
    id: 'item-' + this.groupId,
    name: 'nodeShape'
  });
  this.text.textElement.setAttrs({
    id: 'text-' + this.groupId,
    name: 'nodeText',
    text: 'group-' + this.groupId
  });
  this.itemGroup.add(this.item);
  this.itemGroup.add(this.text.textElement);
  helpers.itemsOnCanvas.push(this.itemGroup);
  $traceurRuntime.setProperty(helpers.controllers, this.groupId, this);
  this.itemGroup.on('dragstart', this.dragStart.bind(this));
  this.itemGroup.on('dragend', this.dragEnd.bind(this));
  this.itemGroup.on('dragmove', helpers.throttle(function(e) {
    this.dragMove(e);
  }, 20, this));
  this.intersectionFound = false;
  this.connections = [];
};
($traceurRuntime.createClass)(CanvasItem, {
  addTo: function(layer, pos) {
    this.setPos(pos);
    this.add(layer);
  },
  dragStart: function(e) {
    startZIndex = e.target.getZIndex();
    startPos = e.target.getAbsolutePosition();
    e.target.moveToTop();
    this.highlight();
  },
  dragMove: function(e) {
    if (this.connections.length > 0)
      this.updateConnections();
    this.doConnection(e);
  },
  dragEnd: function(e) {
    e.target.setZIndex(startZIndex);
    this.removeHighlight();
  },
  doConnection: function(e) {
    var pos = helpers.stage.getPointerPosition();
    var intersecting = helpers.dragOver(pos, this.itemGroup.id());
    if (!this.intersectionFound && intersecting !== false) {
      this.intersectionFound = true;
      if (intersecting.id() !== e.target.id()) {
        this.connectTo(intersecting);
      }
    } else if (this.intersectionFound && intersecting === false) {
      this.intersectionFound = false;
    }
  },
  updateConnections: function() {
    for (var con = 0; con < this.connections.length; con++) {
      this.connections[$traceurRuntime.toProperty(con)].updateConnection();
    }
  },
  connectTo: function(node) {
    var connectionInProgress = new NodeConnection(this.itemGroup, node, this.afterConnect.bind(this));
    connectionInProgress.start();
  },
  afterConnect: function(connection) {
    this.connections.push(connection);
    this.intersectionFound = false;
    var returnAnim = new Kinetic.Tween({
      x: startPos.x,
      y: startPos.y,
      node: this.itemGroup,
      duration: 0.3,
      easing: Kinetic.Easings.EaseOut
    });
    returnAnim.play();
  },
  remove: function() {
    helpers.removeFromIndex(this.itemGroup);
    this.itemGroup.destroy();
  }
}, {}, CanvasItemUtil);
module.exports = CanvasItem;
