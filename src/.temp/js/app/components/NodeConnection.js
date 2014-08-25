"use strict";
var g = require('../Globals');
var _ = require('lodash');
var indicatorProps = {
  radius: 300,
  opacity: 0.3,
  selectable: false,
  hasControls: false,
  fill: '#ff0000'
};
var NodeConnection = function NodeConnection(node1, node2, cb) {
  this.connectFrom = node1;
  this.connectTo = node2;
  this.callback = cb;
  this.indicator = null;
  this.line = null;
  this.cancelConnect = false;
};
($traceurRuntime.createClass)(NodeConnection, {
  start: function() {
    var self = this;
    this.connectTo.setCoords();
    var indPos = this.connectTo.getCenterPoint();
    this.indicator = new fabric.Circle(_.merge(indicatorProps, {
      left: indPos.x,
      top: indPos.y
    }));
    g.canvas.add(this.indicator);
    this.indicator.sendToBack();
    this.indicator.animate('radius', 100, {
      onChange: g.canvas.renderAll.bind(g.canvas),
      onComplete: this.connect.bind(this),
      abort: function() {
        return self.cancelConnect;
      },
      duration: 800,
      easing: fabric.util.ease.easeOutExpo
    });
  },
  cancel: function() {
    console.log("connection canceled...");
    this.cancelConnect = true;
    if (this.indicator !== null)
      this.indicator.remove();
    g.canvas.renderAll();
  },
  connect: function() {
    console.log("connecting nodes...");
    this.cancelConnect = false;
    this.indicator.remove();
    this.renderConnection();
    g.controllers[$traceurRuntime.toProperty(this.connectFrom.id)].connections.push(this);
    g.controllers[$traceurRuntime.toProperty(this.connectTo.id)].connections.push(this);
    this.callback(this);
  },
  renderConnection: function() {
    if (this.line !== null)
      this.line.remove();
    this.line = new fabric.Line(this.buildLinePoints(), {
      stroke: "#000000",
      strokeWidth: 1,
      selectable: false,
      hasControls: false
    });
    g.canvas.add(this.line);
    this.line.sendToBack();
    g.canvas.renderAll();
  },
  buildLinePoints: function() {
    this.connectFrom.setCoords();
    var n1Pos = this.connectFrom.getCenterPoint();
    var n2Pos = this.connectTo.getCenterPoint();
    var points = [n1Pos.x, n1Pos.y, n2Pos.x, n2Pos.y];
    return points;
  }
}, {});
module.exports = NodeConnection;
