var NodeText = require('./NodeText');
var NodeConnection = require('./NodeConnection');
var g = require('../Globals');
var CanvasItemUtil = require('../CanvasItemUtil');
var _ = require('lodash');

var generalShapeOptions = {
	selectable: false,
	shadow: "0px 0px 5px rgba(0,0,0,0.3)"
};

var isDragging = false;

class CanvasItem extends CanvasItemUtil {

	constructor() {
		this.groupId = Date.now();
		this.item = new fabric[this.nodeType](_.merge(this.nodeConfig, generalShapeOptions));
		this.text = new NodeText(this.item);

		this.itemGroup = new fabric.Group([this.item, this.text], {
			left: 0,
			top: 0,
			id: this.groupId,
			hasControls: false,
			controller: this
		});

		g.controllers[this.groupId] = this;

		this.connections = [];
		this.connectionInProgress = null;

		this.startZIndex = 0;
		this.startPos = null;
	}

	add(pos) {
		this.setPos(pos);
		g.canvas.add(this.itemGroup);
	}

	dragMove(e) {
		e.target.setCoords();
		this.dragStart(e);

		if(this.connections.length > 0) this.updateConnections();
		this.doConnection(e);

		this.dragEnd();
	}

	dragStart(e) {
		if(!this.startPos) {
			this.startPos = this.itemGroup.getCenterPoint();
			this.startZIndex = g.canvas.getObjects().indexOf(this.itemGroup);
			this.itemGroup.bringToFront();
		}
	}

	dragEnd(e) {

	}

	doConnection(e) {
		var me = e.target;

		var intersecting = false;
		var items = g.canvas.getObjects();

		for (var i = 0, n = items.length; i < n; i++) {
			var m = items[i];

			if(me === m || m.type !== "group") continue;

			if (me.intersectsWithObject(m)) {
				intersecting = m;
				break;
			}
		}

		if(!this.intersectionFound && intersecting !== false) {
			this.intersectionFound = true;
			this.connectTo(intersecting);
		}
		else if(this.intersectionFound && intersecting === false) {
			this.intersectionFound = false;
			if(this.connectionInProgress !== null) {
				this.connectionInProgress.cancel();
			}
		}
	}

	updateConnections() {
		for(var con = 0; con < this.connections.length; con++) {
			this.connections[con].renderConnection();
		}
	}

	checkExistingConnections(node) {
		var status = false;
		for(var con = 0; con < this.connections.length; con++) {
			var conn = this.connections[con];
			if(conn.connectTo === node || conn.connectFrom === node) {
				status = true;
			}
		}

		return status;
	}

	connectTo(node) {
		if(!this.checkExistingConnections(node)) {
			this.connectionInProgress = new NodeConnection(this.itemGroup, node, this.afterConnect.bind(this));
			this.connectionInProgress.start();
		}
	}

	afterConnect(connection) {
		var self = this;
		this.intersectionFound = false;
		this.connectionInProgress = null;

		this.itemGroup.animate({
			left: this.startPos.x,
			top: this.startPos.y
		}, {
			duration: 1000,
			easing: fabric.util.ease.easeOutExpo,
			onChange: g.canvas.renderAll.bind(g.canvas),
			onComplete: function() {
				this.startPos = null;
				self.itemGroup.moveTo(self.startZIndex);
			}
		})
	}

	remove() {
		this.itemGroup.remove();
	}
}

module.exports = CanvasItem;