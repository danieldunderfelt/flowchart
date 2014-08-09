"use strict";
var View = function View() {};
($traceurRuntime.createClass)(View, {
  init: function() {
    this.startListeners();
  },
  startListeners: function() {
    var components = document.querySelectorAll("#components > li");
    for (var c = 0; c < components.length; c++) {
      components[$traceurRuntime.toProperty(c)].addEventListener('dragstart', function(e) {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('nodeType', this.getAttribute('data-component'));
      });
    }
  }
}, {});
module.exports = View;
