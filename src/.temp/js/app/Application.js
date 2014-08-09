"use strict";
var View = require('./View');
var FlowCanvas = require('./FlowCanvas');
var Application = function Application() {
  this.view = new View();
  this.flowCanvas = new FlowCanvas();
};
($traceurRuntime.createClass)(Application, {init: function() {
    this.view.init();
    this.flowCanvas.init();
  }}, {});
module.exports = Application;
