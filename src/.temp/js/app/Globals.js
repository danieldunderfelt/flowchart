"use strict";
var _ = require('lodash');
window.Globals = {
  canvas: {},
  controllers: {},
  getMousePos: function(e) {
    var rect = document.querySelector("#flowchart").getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },
  throttle: function(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function() {
      var context = scope || this;
      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
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
module.exports = window.Globals;
