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

	/*dragOver: function(pos, excludeId) {
		var matchingNode = false;

		for(var item = 0; item < this.itemsOnCanvas.length; item++) {
			if(this.itemsOnCanvas[item].attrs.id === excludeId) continue;

			var itemShape = this.itemsOnCanvas[item].find('.nodeShape')[0];
			var width = itemShape.width();
			var height = itemShape.height();
			var itemPos = itemShape.getAbsolutePosition();

			var xRange = this.range(itemPos.x, itemPos.x + width);
			var yRange = this.range(itemPos.y, itemPos.y + height);

			if(xRange.indexOf(pos.x) > -1 && yRange.indexOf(pos.y) > -1) {
				matchingNode = this.itemsOnCanvas[item];
				break;
			}
		}

		return matchingNode;
	},

	range: function(start, add) {
		var rangeArr = [];

		for(var r = start; r < add; r++) {
			rangeArr.push(r);
		}

		return rangeArr;
	},*/

	throttle: function(fn, threshhold, scope) {
		threshhold || (threshhold = 250);
			var last,
				deferTimer;
			return function () {
				var context = scope || this;

			var now = +new Date,
				args = arguments;
			if (last && now < last + threshhold) {
				// hold on to it
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function () {
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
		var a = d.attributes, i, l, n;
		if (a) {
			for (i = a.length - 1; i >= 0; i -= 1) {
				n = a[i].name;
				if (typeof d[n] === 'function') {
					d[n] = null;
				}
			}
		}
		a = d.childNodes;
		if (a) {
			l = a.length;
			for (i = 0; i < l; i += 1) {
				purge(d.childNodes[i]);
			}
		}
	}
};

module.exports = window.Globals;