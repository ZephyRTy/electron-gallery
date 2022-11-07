import { ImageBookmark, ImageData } from '../types/global';
import { isImageBookmark } from './functions/typeAssertion';

// 缓存进入图片时的页面，保证前后页面排列的一致性
export class ImgWaterfallCache {
	private static instance: ImgWaterfallCache;
	private temp: { img: HTMLImageElement; data: ImageData }[][] = [
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
	private data: { img: HTMLImageElement; data: ImageData }[][] = [
		[],
		[],
		[],
		[]
	];
	private cacheNeeded = false;
	saveTemp(data: { img: HTMLImageElement; data: ImageData }[][]) {
		this.temp = data;
	}
	save() {
		this.data = this.temp;
		this.temp = [[], [], [], []];
		this.cacheNeeded = true;
	}

	load(): { img: HTMLImageElement; data: ImageData }[][] {
		this.cacheNeeded = false;
		let data = this.data;
		this.data = [[], [], [], []];
		return data;
	}

	isNeeded(sample: ImageData[] | ImageBookmark[]) {
		if (isImageBookmark(sample[0])) {
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

	updateCover(data: ImageData) {
		this.data.forEach((e) => {
			let index = e.findIndex((e) => e.data.id === data.id);
			if (index !== -1) {
				e[index].data.cover = data.cover;
				e[index].img.src = ((data as any).path ?? '') + data.cover;
			}
		});
	}
}
