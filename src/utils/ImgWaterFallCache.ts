import { BasicData, Bookmark } from '../types/global';
import { isBookmark } from './functions';

export class ImgWaterfallCache {
	private static instance: ImgWaterfallCache;
	private temp: { img: HTMLImageElement; data: BasicData }[][] = [
		[],
		[],
		[],
		[]
	];
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
	private cacheNeeded = false;
	saveTemp(data: { img: HTMLImageElement; data: BasicData }[][]) {
		this.temp = data;
	}
	save() {
		this.data = this.temp;
		this.temp = [[], [], [], []];
		this.cacheNeeded = true;
	}

	load(): { img: HTMLImageElement; data: BasicData }[][] {
		this.cacheNeeded = false;
		let data = this.data;
		this.data = [[], [], [], []];
		return data;
	}

	isNeeded(sample: BasicData[] | Bookmark[]) {
		if (isBookmark(sample[0])) {
			this.cacheNeeded = false;
		} else if (this.count !== sample.length) {
			this.cacheNeeded = false;
		} else if (
			this.data
				.flat()
				.map((e) => e.data.id)
				.sort()
				.join(',') !==
			sample
				.map((e) => e.id)
				.sort()
				.join(',')
		) {
			return false;
		}
		return this.cacheNeeded;
	}

	get count() {
		return this.data.reduce((a, b) => a + b.length, 0);
	}
}
