import { BasicData } from '../types/global';

export const snapshot = {
	value: [] as {
		img: HTMLImageElement;
		data: BasicData;
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
			data: BasicData;
		}[][]
	) {
		console.log(value);

		this.ready = true;
		this.value = value;
	}
};
