var g = require('./Globals');

class CanvasItemUtil {

	setPos(pos) {
		this.itemGroup.set('left', pos.x);
		this.itemGroup.set('top', pos.y);
		this.itemGroup.setCoords();
		g.canvas.renderAll();
	}

	highlight() {
		//
	}

	removeHighlight() {
		//
	}
}

module.exports = CanvasItemUtil;