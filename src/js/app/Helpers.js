var Helpers = {

	stage: {},

	getMousePos: function(e) {
		var rect = document.querySelector("#flowchart").getBoundingClientRect();

		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
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

module.exports = Helpers;