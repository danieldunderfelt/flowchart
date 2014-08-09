class View {

	init() {
		this.startListeners();
	}

	startListeners() {
		var components = document.querySelectorAll("#components > li");

		for(var c = 0; c < components.length; c++) {
			components[c].addEventListener('dragstart', function(e) {
				e.dataTransfer.effectAllowed = 'copy';
				e.dataTransfer.setData('nodeType', this.getAttribute('data-component'));
			});
		}
	}
}

module.exports = View;