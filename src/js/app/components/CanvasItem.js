var NodeText = require('./NodeText');

var groupConfig = {
	draggable: true
};

class CanvasItem {

	constructor() {
		this.itemGroup = new Kinetic.Group(groupConfig);
		this.item = new Kinetic[this.nodeType](this.nodeConfig);
		this.text = new NodeText(this.itemGroup);

		this.itemGroup.add(this.item);
		this.itemGroup.add(this.text.textElement);
	}

	addTo(layer, pos) {
		this.setPos(pos);
		this.add(layer);
	}

	remove() {
		this.itemGroup.destroy();
	}

	connectTo(node) {

	}

	add(layer) {
		layer.add(this.itemGroup);
		layer.draw();
	}

	setPos(pos) {
		this.itemGroup.x(pos.x - (this.item.width() / 2));
		this.itemGroup.y(pos.y - (this.item.height() / 2));
	}
}

module.exports = CanvasItem;