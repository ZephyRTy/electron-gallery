import { BasicBookmark, BasicData, Mode, Model } from '../types/global';
import { isBookmarkOfBook, isImageBookmark } from './functions/typeAssertion';
import { RequestOperator } from './requestOperator';

export const createStarModel = <T extends BasicData>(
	sqlOperator: RequestOperator
): Model<T> => {
	return {
		dirty: false,
		data: [] as T[],
		dataToUpdate: [] as T[],
		sqlOperator: sqlOperator,
		async update(newStar?: T) {
			this.dirty = true;
			if (newStar) {
				await this.sqlOperator.updateStar(newStar);
			}
			this.data = await this.sqlOperator.select([], Mode.Stared);
		},
		remove(id) {
			this.data = this.data.filter((item) => item.id !== id);
		}
	};
};

export const createBookmarkModel = <T extends BasicBookmark>(
	sqlOperator: RequestOperator
): Model<T> => {
	return {
		dirty: false,
		data: [] as T[],
		dataToUpdate: [] as T[],
		sqlOperator: sqlOperator,
		remove(id) {
			this.data = this.data.filter((item) => item.id !== id);
		},
		async update(newData: T, marked: boolean = true) {
			if (isImageBookmark(newData)) {
				if (this.data.find((item) => item.id === newData.id)) {
					await this.sqlOperator.updateGalleryBookmark(
						newData,
						marked,
						'update'
					);
				} else {
					await this.sqlOperator.updateGalleryBookmark(
						newData,
						marked,
						'insert'
					);
				}
			} else if (isBookmarkOfBook(newData)) {
				if (this.data.find((item) => item.id === newData.id)) {
					await this.sqlOperator.updateBookmarkOfBook(
						newData,
						marked,
						'update'
					);
				} else {
					await this.sqlOperator.updateBookmarkOfBook(
						newData,
						marked,
						'insert'
					);
				}
			}

			this.data = (await this.sqlOperator.select(
				[],
				Mode.Bookmark
			)) as T[];
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
