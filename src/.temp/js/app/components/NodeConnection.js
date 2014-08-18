"use strict";
var helpers = require('../Helpers');
var NodeConnection = function NodeConnection(node1, node2, cb) {
  this.connectFrom = node1;
  this.connectTo = node2;
  this.callback = cb;
  this.connectFromShape = node1.find(".nodeShape")[0];
  this.connectToShape = node2.find(".nodeShape")[0];
  this.anim = null;
  this.indicator = null;
  this.n1Width = 0;
  this.n1Height = 0;
  this.n2Width = 0;
  this.n2Height = 0;
  this.staticElePos = {};
};
($traceurRuntime.createClass)(NodeConnection, {
  start: function() {
    var self = this;
    var indPos = this.connectTo.getAbsolutePosition();
    var targetShape = this.connectTo.find(".nodeShape");
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
    helpers.connectionLayer.add(this.indicator);
    this.indicator.moveToBottom();
    helpers.connectionLayer.draw();
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
    helpers.connectionLayer.draw();
  },
  connect: function() {
    console.log("connecting nodes...");
    this.indicator.destroy();
    this.cacheConnection(this.connectFrom.id());
    this.line = new Kinetic.Line({
      points: this.buildLinePoints(this.connectFrom.id()),
      stroke: "#000000",
      strokeWidth: 1
    });
    helpers.connectionLayer.add(this.line);
    helpers.stage.draw();
    helpers.controllers[$traceurRuntime.toProperty(this.connectTo.id().split("-")[1])].connections.push(this);
    this.callback(this);
  },
  cacheConnection: function(eleId) {
    if (eleId === this.connectTo.id()) {
      var staticEle = this.connectFrom;
      var mobileEle = this.connectTo;
    } else {
      var staticEle = this.connectTo;
      var mobileEle = this.connectFrom;
    }
    this.staticElePos = staticEle.getAbsolutePosition();
    this.n1Width = mobileEle.width();
    this.n2Width = staticEle.width();
    this.n1Height = mobileEle.height();
    this.n2Height = staticEle.height();
  },
  updateConnection: function(ele) {
    this.line.setAttr("points", this.buildLinePoints(ele));
    helpers.stage.batchDraw();
  },
  buildLinePoints: function(eleId) {
    var mobileEle = eleId === this.connectTo.id() ? this.connectTo : this.connectFrom;
    var n1Pos = mobileEle.getAbsolutePosition();
    var n2Pos = this.staticElePos;
    var n1X = n1Pos.x + (this.n1Width / 2);
    var n1Y = n1Pos.y + (this.n1Height / 2);
    var n2X = n2Pos.x + (this.n2Width / 2);
    var n2Y = n2Pos.y + (this.n2Height / 2);
    var points = [n1X, n1Y, n2X, n2Y];
    return points;
  }
}, {});
module.exports = NodeConnection;
