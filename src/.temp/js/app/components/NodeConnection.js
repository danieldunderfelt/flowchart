"use strict";
var connections = require('../connections');
var NodeConnection = function NodeConnection(node1, node2) {
  this.connectFrom = node1;
  this.connectTo = node2;
  this.connect();
};
($traceurRuntime.createClass)(NodeConnection, {connect: function() {
    console.log("connecting nodes...");
  }}, {});
module.exports = NodeConnection;
