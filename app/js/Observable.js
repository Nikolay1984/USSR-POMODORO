
export default class Observable {
	constructor() {
		this.listeners = {};
	}
	on(e , callback) {
		if (this.listeners[e] == undefined) {
			this.listeners[e] = {};
			this.listeners[e].eventProperty = {};
			this.listeners[e].data = [];
		}
		this.listeners[e].data.push(callback);
	}

	emit(e , data) {
		if (this.listeners[e] == undefined || this.listeners[e].data == undefined) {
			return;
		}

		let itObj = this;

		this.listeners[e].data.forEach(listener => {
			listener(data);
		});
	}
}