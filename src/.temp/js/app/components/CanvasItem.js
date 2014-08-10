"use strict";
var NodeText = require('./NodeText');
var NodeConnection = require('./NodeConnection');
var helpers = require('../Helpers');
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
  this.itemGroup.on('dragstart', this.dragStart.bind(this));
  this.itemGroup.on('dragend', this.dragEnd.bind(this));
  this.itemGroup.on('dragmove', this.dragMove.bind(this));
};
($traceurRuntime.createClass)(CanvasItem, {
  addTo: function(layer, pos) {
    this.setPos(pos);
    this.add(layer);
  },
  add: function(layer) {
    layer.add(this.itemGroup);
    layer.draw();
  },
  setPos: function(pos) {
    this.itemGroup.x(pos.x - (this.item.width() / 2));
    this.itemGroup.y(pos.y - (this.item.height() / 2));
  },
  dragStart: function(e) {
    startZIndex = e.target.getZIndex();
    startPos = e.target.getAbsolutePosition();
    e.target.moveToTop();
    this.highlight();
  },
  dragMove: function(e) {
    var pos = helpers.stage.getPointerPosition();
    var intersecting = helpers.dragOver(pos, this.itemGroup.id());
    console.log(intersecting);
    if (intersecting) {
      var overEle = intersecting.getParent();
      if (overEle.id() !== e.target.id()) {
        this.connectTo(overEle);
      }
    }
  },
  dragEnd: function(e) {
    e.target.setZIndex(startZIndex);
    this.removeHighlight();
  },
  connectTo: function(node) {
    var connection = new NodeConnection(this.itemGroup, node);
    this.afterConnect();
  },
  afterConnect: function() {
    var returnAnim = new Kinetic.Tween({
      x: startPos.x,
      y: startPos.y,
      node: this.itemGroup,
      duration: 0.3,
      easing: Kinetic.Easings.EaseOut
    });
    returnAnim.play();
  },
  highlight: function() {
    this.item.setAttrs({
      shadowOpacity: 0.5,
      shadowBlur: 20
    });
    helpers.layer.draw();
  },
  removeHighlight: function() {
    this.item.setAttrs({
      shadowOpacity: 0.3,
      shadowBlur: 5
    });
    helpers.layer.draw();
  },
  remove: function() {
    this.itemGroup.destroy();
  }
}, {});
module.exports = CanvasItem;
