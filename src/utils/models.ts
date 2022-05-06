import { BasicData, Bookmark, Model } from '../types/global';

export const starAdmin: Model<BasicData> = {
	dirty: false,
	data: [] as BasicData[],
	dataToUpdate: [] as BasicData[],
	update(newStar: BasicData) {
		this.dirty = true;
		this.dataToUpdate.push(newStar);
	},
	writeBack() {
		if (this.dataToUpdate.length === 0) {
			return;
		}
		this.dataToUpdate.forEach((item) => {
			if (item.stared) {
				this.data.unshift(item);
			} else {
				this.data = this.data.filter((v) => v.index !== item.index);
			}
		});
		this.dataToUpdate = [];
	}
};

export const bookmarkModel: Model<Bookmark> = {
	dirty: false,
	data: [] as Bookmark[],
	dataToUpdate: [] as Bookmark[],
	update(newData: Bookmark, marked: boolean = true) {
		this.dirty = true;
		if (marked) {
			let index = this.data.findIndex((v) => v.title === newData.title);
			if (index !== -1) {
				this.data[index] = newData;
				return;
			}
			this.data.push(newData);
		} else {
			this.data = this.data.filter((v) => {
				if (v.title !== newData.title) {
					return true;
				}
				return false;
			});
		}
	},
	writeBack() {}
};

export const selectionAdmin = {
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
