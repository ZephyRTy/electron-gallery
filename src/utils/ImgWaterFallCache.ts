import { BasicData } from '../types/global';

export class ImgWaterfallCache {
	private static instance: ImgWaterfallCache;
	static getInstance(): ImgWaterfallCache {
		if (!ImgWaterfallCache.instance) {
			ImgWaterfallCache.instance = new ImgWaterfallCache();
		}
		return ImgWaterfallCache.instance;
	}
	private data: { img: HTMLImageElement; data: BasicData }[][] = [
		[],
		[],
		[],
		[]
	];
	private dirty = false;
	save(data: { img: HTMLImageElement; data: BasicData }[][]) {
		this.data = data;
		this.dirty = true;
		return [];
	}

	load(): { img: HTMLImageElement; data: BasicData }[][] {
		this.dirty = false;
		let data = this.data;
		this.data = [[], [], [], []];
		return data;
	}

	isDirty() {
		return this.dirty;
	}
}
