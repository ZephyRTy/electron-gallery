import { BasicData, Bookmark, Mode, Model } from '../types/global';
import { mysqlOperator } from './mysqlOperator';

export const starModel: Model<BasicData> = {
	dirty: false,
	data: [] as BasicData[],
	dataToUpdate: [] as BasicData[],
	async update(newStar?: BasicData) {
		this.dirty = true;
		if (newStar) {
			await mysqlOperator.updateStar(newStar);
		}
		this.data = await mysqlOperator.select([], Mode.Stared);
	}
};

export const bookmarkModel: Model<Bookmark> = {
	dirty: false,
	data: [] as Bookmark[],
	dataToUpdate: [] as Bookmark[],
	async update(newData: Bookmark, marked: boolean = true) {
		if (this.data.find((item) => item.id === newData.id)) {
			await mysqlOperator.updateBookmark(newData, marked, 'update');
		} else {
			await mysqlOperator.updateBookmark(newData, marked, 'insert');
		}
		this.data = (await mysqlOperator.select(
			[],
			Mode.Bookmark
		)) as Bookmark[];
	}
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
