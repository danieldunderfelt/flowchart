"use strict";
var _ = require('lodash');
var Helpers = {
  stage: {},
  layer: {},
  tempLayer: {},
  connectionLayer: {},
  itemsOnCanvas: [],
  controllers: {},
  getMousePos: function(e) {
    var rect = document.querySelector("#flowchart").getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },
  removeFromIndex: function(item) {
    for (var i = 0; i < this.itemsOnCanvas.length; i++) {
      var extItem = this.itemsOnCanvas[$traceurRuntime.toProperty(i)];
      if (extItem.id() === item.id()) {
        this.itemsOnCanvas.splice(i, 1);
        return;
      }
    }
  },
  dragOver: function(pos, excludeId) {
    var matchingNode = false;
    for (var item = 0; item < this.itemsOnCanvas.length; item++) {
      if (this.itemsOnCanvas[$traceurRuntime.toProperty(item)].id() === excludeId)
        continue;
      var itemShape = this.itemsOnCanvas[$traceurRuntime.toProperty(item)].find('.nodeShape')[0];
      var itemPos = itemShape.getAbsolutePosition();
      var match = [];
      var xRange = _.range(itemPos.x, itemPos.x + itemShape.width(), 1);
      var yRange = _.range(itemPos.y, itemPos.y + itemShape.height(), 1);
      if (xRange.indexOf(pos.x) > -1) {
        match.push(true);
      }
      if (yRange.indexOf(pos.y) > -1) {
        match.push(true);
      }
      if (match.length === 2) {
        matchingNode = this.itemsOnCanvas[$traceurRuntime.toProperty(item)];
        break;
      }
    }
    return matchingNode;
  },
  purge: function(d) {
    var a = d.attributes,
        i,
        l,
        n;
    if (a) {
      for (i = a.length - 1; i >= 0; i -= 1) {
        n = a[$traceurRuntime.toProperty(i)].name;
        if (typeof d[$traceurRuntime.toProperty(n)] === 'function') {
          $traceurRuntime.setProperty(d, n, null);
        }
      }
    }
    a = d.childNodes;
    if (a) {
      l = a.length;
      for (i = 0; i < l; i += 1) {
        purge(d.childNodes[$traceurRuntime.toProperty(i)]);
      }
    }
  }
};
module.exports = Helpers;
