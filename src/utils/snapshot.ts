import { Data } from './fileOperator';

export const snapshot = {
	value: [] as {
		img: HTMLImageElement;
		data: Data;
	}[][],
	ready: false,
	load() {
		this.ready = false;
		const v = this.value;
		this.value = [];
		return v;
	},
	save(
		value: {
			img: HTMLImageElement;
			data: Data;
		}[][]
	) {
		console.log(value);

		this.ready = true;
		this.value = value;
	}
};
