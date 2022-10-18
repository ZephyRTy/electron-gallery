import {
	BasicBookmark,
	BasicData,
	ImageBookmark,
	Mode,
	Model
} from '../types/global';
import { isBookmarkOfBook, isImageBookmark } from './functions';
import { mysqlOperator } from './mysqlOperator';

export const createStarModel = <T extends BasicData>(): Model<T> => {
	return {
		dirty: false,
		data: [] as T[],
		dataToUpdate: [] as T[],
		async update(newStar?: T) {
			this.dirty = true;
			if (newStar) {
				await mysqlOperator.updateStar(newStar);
			}
			this.data = await mysqlOperator.select([], Mode.Stared);
		}
	};
};
export const bookmarkModel: Model<ImageBookmark> = {
	dirty: false,
	data: [] as ImageBookmark[],
	dataToUpdate: [] as ImageBookmark[],
	async update(newData: ImageBookmark, marked: boolean = true) {
		if (this.data.find((item) => item.id === newData.id)) {
			await mysqlOperator.updateGalleryBookmark(
				newData,
				marked,
				'update'
			);
		} else {
			await mysqlOperator.updateGalleryBookmark(
				newData,
				marked,
				'insert'
			);
		}
		this.data = (await mysqlOperator.select(
			[],
			Mode.Bookmark
		)) as ImageBookmark[];
	}
};
export const createBookmarkModel = <T extends BasicBookmark>(): Model<T> => {
	return {
		dirty: false,
		data: [] as T[],
		dataToUpdate: [] as T[],
		async update(newData: T, marked: boolean = true) {
			if (isImageBookmark(newData)) {
				if (this.data.find((item) => item.id === newData.id)) {
					await mysqlOperator.updateGalleryBookmark(
						newData,
						marked,
						'update'
					);
				} else {
					await mysqlOperator.updateGalleryBookmark(
						newData,
						marked,
						'insert'
					);
				}
			} else if (isBookmarkOfBook(newData)) {
				if (this.data.find((item) => item.id === newData.id)) {
					await mysqlOperator.updateBookmarkOfBook(
						newData,
						marked,
						'update'
					);
				} else {
					await mysqlOperator.updateBookmarkOfBook(
						newData,
						marked,
						'insert'
					);
				}
			}

			this.data = (await mysqlOperator.select([], Mode.Bookmark)) as T[];
		}
	};
};
export const selectionModel = {
	selected: new Set<number>(),
	update(index: number, selected: boolean) {
		if (selected) {
			this.selected.add(index);
		} else if (this.selected.has(index)) {
			this.selected.delete(index);
		}
	},
	submit() {}
};
