var helpers = require('./Helpers');

class CanvasItemUtil {

	setPos(pos) {
		this.itemGroup.x(pos.x - (this.item.width() / 2));
		this.itemGroup.y(pos.y - (this.item.height() / 2));
	}

	highlight() {
		this.item.setAttrs({
			shadowOpacity: 0.5,
			shadowBlur: 20
		});
	}

	removeHighlight() {
		this.item.setAttrs({
			shadowOpacity: 0.3,
			shadowBlur: 5
		});
	}

	add(layer) {
		layer.add(this.itemGroup);
		layer.draw();
	}
}

module.exports = CanvasItemUtil;