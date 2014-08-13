var NodeText = require('./NodeText');
var NodeConnection = require('./NodeConnection');
var helpers = require('../Helpers');
var CanvasItemUtil = require('../CanvasItemUtil');

var groupConfig = {
	draggable: true
};

var startZIndex = 0;
var startPos = {};

var isDragging = false;
var intersectionFound = false;
var connectionInProgress = false;

class CanvasItem extends CanvasItemUtil {

	constructor() {
		this.groupId = Date.now();

		this.itemGroup = new Kinetic.Group(groupConfig);
		this.item = new Kinetic[this.nodeType](this.nodeConfig);
		this.text = new NodeText(this.itemGroup);

		this.itemGroup.setAttrs({
			id: 'group-'+this.groupId,
			name: 'nodeContainer'
		});

		this.item.setAttrs({
			id: 'item-'+this.groupId,
			name: 'nodeShape'
		});

		this.text.textElement.setAttrs({
			id: 'text-'+this.groupId,
			name: 'nodeText',
			text: 'group-'+this.groupId
		});

		this.itemGroup.add(this.item);
		this.itemGroup.add(this.text.textElement);

		helpers.itemsOnCanvas.push(this.itemGroup);

		this.itemGroup.on('dragstart', this.dragStart.bind(this));
		this.itemGroup.on('dragend', this.dragEnd.bind(this));
		this.itemGroup.on('dragmove', this.dragMove.bind(this));
	}

	addTo(layer, pos) {
		this.setPos(pos);
		this.add(layer);
	}

	dragStart(e) {
		startZIndex = e.target.getZIndex();
		startPos = e.target.getAbsolutePosition();
		e.target.moveToTop();
		this.highlight();
	}

	dragMove(e) {
		var pos = helpers.stage.getPointerPosition();
		var intersecting = helpers.dragOver(pos, this.itemGroup.id());

		if(!intersectionFound && intersecting !== false) {
			intersectionFound = true;
		 	if(intersecting.id() !== e.target.id()) {
				this.connectTo(intersecting);
			}
		}
		else if(connectionInProgress && intersecting === false) {
			connectionInProgress.cancel();
		}
	}

	dragEnd(e) {
		e.target.setZIndex(startZIndex);
		this.removeHighlight();
	}

	connectTo(node) {
		connectionInProgress = new NodeConnection(this.itemGroup, node, this.afterConnect.bind(this));
		connectionInProgress.start();
	}

	afterConnect() {
		connectionInProgress = false;
		intersectionFound = false;

		var returnAnim = new Kinetic.Tween({
			x: startPos.x,
			y: startPos.y,
			node: this.itemGroup,
			duration: 0.3,
			easing: Kinetic.Easings.EaseOut
		});

		returnAnim.play();
	}

	remove() {
		helpers.removeFromIndex(this.itemGroup);
		this.itemGroup.destroy();
	}
}

module.exports = CanvasItem;