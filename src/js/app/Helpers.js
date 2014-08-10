var _ = require('lodash');

var Helpers = {

	stage: {},
	layer: {},
	tempLayer: {},

	itemsOnCanvas: [],

	getMousePos: function(e) {
		var rect = document.querySelector("#flowchart").getBoundingClientRect();

		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
	},

	dragOver: function(pos, excludeId) {
		var matchingNode = false;

		for(var item = 0; item < this.itemsOnCanvas.length; item++) {

			if(this.itemsOnCanvas[item].id() === excludeId) continue;

			var itemShape = this.itemsOnCanvas[item].find('.nodeShape')[0];
			var itemPos = itemShape.getAbsolutePosition();

			var match = [];

			var xRange = _.range(itemPos.x, itemPos.x + itemShape.width(), 1);
			var yRange = _.range(itemPos.y, itemPos.y + itemShape.height(), 1);

			if(xRange.indexOf(pos.x) > -1) {
				match.push(true);
			}

			if(yRange.indexOf(pos.y) > -1) {
				match.push(true);
			}

			if(match.length === 2) {
				matchingNode = this.itemsOnCanvas[item];
				break;
			}
		}

		return matchingNode;
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

module.exports = Helpers;