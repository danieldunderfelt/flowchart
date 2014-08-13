"use strict";
var connections = require('../connections');
var helpers = require('../Helpers');
var NodeConnection = function NodeConnection(node1, node2, cb) {
  this.connectFrom = node1;
  this.connectTo = node2;
  this.callback = cb;
  this.anim = null;
  this.indicator = null;
};
($traceurRuntime.createClass)(NodeConnection, {
  start: function() {
    var self = this;
    var indPos = this.connectTo.getAbsolutePosition();
    var targetShape = this.connectTo.find(".nodeShape");
    console.log(targetShape[0].width());
    this.indicator = new Kinetic.Circle({
      width: 100,
      heigth: 100,
      scaleX: 5,
      scaleY: 5,
      opacity: 0.3,
      x: (indPos.x + (targetShape[0].width() / 2)),
      y: (indPos.y + (targetShape[0].height() / 2)),
      fill: '#ff0000'
    });
    helpers.layer.add(this.indicator);
    this.indicator.moveToBottom();
    helpers.layer.draw();
    this.anim = new Kinetic.Tween({
      node: this.indicator,
      duration: 1,
      scaleX: 1,
      scaleY: 1,
      easing: Kinetic.Easings.EaseOut,
      onFinish: this.connect.bind(this)
    });
    this.anim.play();
  },
  cancel: function() {
    console.log("connection canceled...");
    if (this.anim !== null)
      this.anim.reset();
    if (this.indicator !== null)
      this.indicator.destroy();
    helpers.layer.draw();
  },
  connect: function() {
    console.log("connecting nodes...");
    this.line = new Kinetic.Line({
      points: this.buildLinePoints(),
      stroke: "black",
      strokeWidth: 1
    });
    helpers.connectionLayer.add(this.line);
    helpers.connectionLayer.draw();
    this.setListeners();
    this.callback();
  },
  buildLinePoints: function() {
    var n1Shape = this.connectFrom.find(".nodeShape")[0];
    var n2Shape = this.connectTo.find(".nodeShape")[0];
    var n1Pos = this.connectFrom.getAbsolutePosition();
    var n2Pos = this.connectTo.getAbsolutePosition();
    var n1X = n1Pos.x + (n1Shape.width() / 2);
    var n1Y = n1Pos.y + (n1Shape.height() / 2);
    var n2X = n2Pos.x + (n2Shape.width() / 2);
    var n2Y = n2Pos.y + (n2Shape.height() / 2);
    return [n1X, n1Y, n2X, n2Y];
  }
}, {});
module.exports = NodeConnection;
