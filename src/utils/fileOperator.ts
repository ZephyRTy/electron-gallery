/* eslint-disable no-unused-vars */
import _filter from 'lodash/filter';
import { Bookmark, Data } from '../types/global';
const fs = window.require('fs');
const sleep = (ms: number) => {
	let start = new Date().getTime();
	for (let i = 0; i < 1e7; i++) {
		if (new Date().getTime() - start > ms) {
			break;
		}
	}
};
let root = String.raw`D:\webDemo\desktop-reader\src\json\catalog.json`;
let bookmarkPath = String.raw`D:\webDemo\desktop-reader\src\json\bookmark.json`;

enum Mode {
	Normal,
	Search,
	Stared,
	Bookmark
}
const positive = (n: number) => {
	return n >= 0 ? n : 0;
};

//DONE 增加、搜索、星标
//TODO 删除、去重、动态设置catalog.json的路径、书签
export class FileOperator {
	currentPack: Data | null = null;
	total = 0;
	private static instance: FileOperator;
	private prevPage = '';

	static getInstance(): FileOperator {
		if (!FileOperator.instance) {
			FileOperator.instance = new FileOperator();
		}
		return FileOperator.instance;
	}
	private dirty = false;
	private mode: Mode = Mode.Normal;
	private pages = [] as number[];

	private packs = [] as Data[][];

	private stared = [] as Data[];
	private staredShouldBeUpdated = [] as { index: number; stared: boolean }[];

	private bookmark: Bookmark[] = [];
	private bookmarksToBeAdded = [] as Bookmark[];
	private bookmarksToBeRemoved = [] as Bookmark[];

	private countOfSinglePage = 20;

	private searchParams = {
		key: '',
		res: [] as Data[],
		total: 0
	};
	private constructor() {}
	//获取图包
	getPacksNormally(index: number) {
		this.switchMode(Mode.Normal);
		if (this.pages.includes(index) && !this.dirty) {
			return this.packs[this.pages.indexOf(index)];
		}
		let files: Data[] = [];
		try {
			files = JSON.parse(fs.readFileSync(root, 'utf-8'));
		} catch (err) {
			sleep(1000);
		}
		if (this.stared.length === 0) {
			this.stared = _filter(files, (item) => item.stared).reverse();
		}

		if (this.total === 0) {
			this.total = files.length;
		}
		this.pages = [];
		this.packs = [];
		for (let page = index; page < index + 8; page++) {
			this.packs.push(
				files
					.slice(
						positive(this.total - page * this.countOfSinglePage),
						positive(
							this.total - (page - 1) * this.countOfSinglePage
						)
					)
					.reverse()
			);
			this.pages.push(page);
		}
		files = [];
		return this.packs[0];
	}

	//搜索图包
	searchPacks(key: string, page: number) {
		this.switchMode(Mode.Search);
		if (this.searchParams.key === key) {
			return this.searchParams.res.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			);
		}
		this.searchParams.key = key;
		this.searchParams.res = [];
		let files: Data[] = JSON.parse(fs.readFileSync(root, 'utf-8'));
		let result = _filter(files, (item) =>
			item.title.includes(key)
		).reverse();
		this.searchParams.res = result;
		this.searchParams.total = result.length;
		files = [];
		return result.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
	}

	//星标缓存
	staredWillUpdated(index: number, stared: boolean) {
		this.staredShouldBeUpdated.push({ index, stared });
	}
	//更新星标
	private staredUpdated() {
		if (this.staredShouldBeUpdated.length === 0) {
			return;
		}
		let files = JSON.parse(fs.readFileSync(root, 'utf-8'));
		this.staredShouldBeUpdated.forEach((item) => {
			files[item.index].stared = item.stared;
			if (item.stared) {
				this.stared.unshift(
					this.packs.flat().find((v) => {
						if (item.index === v.index) {
							v.stared = true;
							return true;
						}
						return false;
					}) ??
						(this.searchParams.res.find((v) => {
							if (item.index === v.index) {
								v.stared = true;
								return true;
							}
							return false;
						}) as any)
				);
			} else {
				this.stared = this.stared.filter((v) => v.index !== item.index);
				this.packs.flat().find((v) => {
					if (item.index === v.index) {
						v.stared = false;
						return true;
					}
					return false;
				});
				this.searchParams.res.find((v) => {
					if (item.index === v.index) {
						v.stared = false;
						return true;
					}
					return false;
				});
			}
		});
		this.staredShouldBeUpdated = [];
		fs.writeFile(root, JSON.stringify(files), 'utf-8', (err: any) => {
			if (err) {
				console.log(err);
			}
		});
	}

	//添加图包
	addNewPack(data: { path: string; cover: string; title: string }) {
		if (!data.path || !data.cover || !data.title) {
			return;
		}
		this.dirty = true;

		//let newPacks = JSON.parse(fs.readFileSync('./new.json', 'utf8'));
		let catalog = JSON.parse(fs.readFileSync(root, 'utf8'));
		let index = catalog.length;
		catalog.push({
			path: data.path,
			cover: '\\' + data.cover,
			title: data.title,
			stared: false,
			index
		});
		fs.writeFileSync(root, JSON.stringify(catalog));
		this.dirty = true;
		this.refresh();
	}

	//获取星标图包
	getStared(page: number) {
		this.switchMode(Mode.Stared);
		return this.stared.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
	}

	//模式切换
	private switchMode(mode: Mode) {
		this.staredUpdated();
		this.updateBookmark();
		if (mode === this.mode) {
			return;
		}
		this.mode = mode;
	}

	//刷新
	refresh() {
		this.pages = this.packs = [];
		this.total = 0;
	}

	get searchTotal() {
		return this.searchParams.total;
	}

	get staredTotal() {
		return this.stared.length;
	}

	savePrevPage(url: string) {
		this.prevPage = url;
	}

	loadPrevPage() {
		let url = this.prevPage;
		return url;
	}

	current(pack: string) {
		if (this.mode === Mode.Normal) {
			return this.packs.flat().find((v) => v.title === pack);
		} else if (this.mode === Mode.Stared) {
			return this.stared.find((v) => v.title === pack);
		} else if (this.mode === Mode.Search) {
			return this.searchParams.res.find((v) => v.title === pack);
		} else if (this.mode === Mode.Bookmark) {
			return this.bookmark.find((v) => v.title === pack);
		}
	}

	bookmarkWillBeUpdated(bookmark: Bookmark, marked: boolean = true) {
		if (marked) {
			this.bookmarksToBeAdded.push(bookmark);
		} else {
			this.bookmarksToBeRemoved.push(bookmark);
		}
	}
	private updateBookmark() {
		if (
			this.bookmarksToBeAdded.length === 0 &&
			this.bookmarksToBeRemoved.length === 0
		) {
			return;
		}
		let marks = JSON.parse(
			fs.readFileSync(bookmarkPath, 'utf8')
		) as Bookmark[];
		let newMarks = [...marks];
		this.bookmarksToBeRemoved.forEach((item) => {
			newMarks = newMarks.filter((v) => {
				if (v.timeStamp !== item.timeStamp) {
					return true;
				}
				return false;
			});
		});
		this.bookmarksToBeAdded.forEach((item) => {
			newMarks.push(item);
		});
		this.bookmarksToBeAdded = [];
		this.bookmarksToBeRemoved = [];
		this.bookmark = [];
		fs.writeFileSync(bookmarkPath, JSON.stringify(newMarks), 'utf-8');
	}

	getBookmarks() {
		this.switchMode(Mode.Bookmark);
		if (this.bookmark.length === 0) {
			this.bookmark = JSON.parse(
				fs.readFileSync(bookmarkPath, 'utf8')
			) as Bookmark[];
		}
		return this.bookmark;
	}
}
