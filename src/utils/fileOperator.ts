/* eslint-disable no-unused-vars */
import _filter from 'lodash/filter';
import _union from 'lodash/union';
const fs = window.require('fs');
const sleep = (ms: number) => {
	let start = new Date().getTime();
	for (let i = 0; i < 1e7; i++) {
		if (new Date().getTime() - start > ms) {
			break;
		}
	}
};

export type Data = {
	title: string;
	stared: boolean;
	index: number;
	cover: string;
	path: string;
};
enum Mode {
	Normal,
	Search,
	Stared
}
const positive = (n: number) => {
	return n >= 0 ? n : 0;
};

//DONE 增加、搜索、星标
//TODO 删除、去重
export class FileOperator {
	private constructor() {}
	private static instance: FileOperator;
	private prevPage = '';
	static getInstance(): FileOperator {
		if (!FileOperator.instance) {
			FileOperator.instance = new FileOperator();
		}
		return FileOperator.instance;
	}
	private pages = [] as number[];
	private dirty = false;
	private packs = [] as Data[][];
	private stared = [] as Data[];
	private mode: Mode = Mode.Normal;
	private staredShouldBeUpdated = [] as { index: number; stared: boolean }[];
	private countOfSinglePage = 20;
	currentPack: Data | null = null;
	private missing = new Set<string>();
	total = 0;
	private searchParams = {
		key: '',
		res: [] as Data[],
		total: 0
	};
	get(index: number) {
		this.switchMode(Mode.Normal);
		if (this.pages.includes(index) && !this.dirty) {
			return this.packs[this.pages.indexOf(index)];
		}
		let files: Data[] = [];
		try {
			files = JSON.parse(
				fs.readFileSync(
					'D:\\webDemo\\desktop-reader\\catalog.json',
					'utf-8'
				)
			);
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
	search(key: string, page: number) {
		this.switchMode(Mode.Search);
		if (this.searchParams.key === key) {
			return this.searchParams.res.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			);
		}
		this.searchParams.key = key;
		this.searchParams.res = [];
		let files: Data[] = JSON.parse(
			fs.readFileSync(
				'D:\\webDemo\\desktop-reader\\catalog.json',
				'utf-8'
			)
		);
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
	staredWillUpdated(index: number, stared: boolean) {
		this.staredShouldBeUpdated.push({ index, stared });
	}

	private staredUpdated() {
		if (this.staredShouldBeUpdated.length === 0) {
			return;
		}
		let files = JSON.parse(
			fs.readFileSync(
				'D:\\webDemo\\desktop-reader\\catalog.json',
				'utf-8'
			)
		);
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
		fs.writeFile(
			'D:\\webDemo\\desktop-reader\\catalog.json',
			JSON.stringify(files),
			'utf-8',
			(err: any) => {
				if (err) {
					console.log(err);
				}
			}
		);
	}
	addNewPack(data: { path: string; cover: string; title: string }) {
		if (!data.path || !data.cover || !data.title) {
			return;
		}
		this.dirty = true;
		let root = String.raw`D:\webDemo\desktop-reader\catalog.json`;
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
	getStared(page: number) {
		this.switchMode(Mode.Stared);
		return this.stared.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
	}
	private switchMode(mode: Mode) {
		this.staredUpdated();
		if (mode === this.mode) {
			return;
		}
		this.mode = mode;
	}

	//FIXME 不能正确收集错误的数据
	collectMissing(title: string, index: number) {
		if (this.missing.has(title)) {
			return;
		}
		this.missing.add(title);
	}
	missingUpdated() {
		if (this.missing.size === 0) {
			return;
		}
		let missing = JSON.parse(
			fs.readFileSync('D:\\webDemo\\desktop-reader\\missing.json')
		) as string[];
		fs.writeFile(
			'D:\\webDemo\\desktop-reader\\missing.json',
			JSON.stringify(_union(missing, Array.from(this.missing))),
			'utf-8',
			(err: Error) => {
				this.missing.clear();
				if (err) {
					console.log(err);
				}
			}
		);
	}
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
			return this.packs.flat().find((v) => v.title === pack)?.path;
		} else if (this.mode === Mode.Stared) {
			return this.stared.find((v) => v.title === pack)?.path;
		}
		return this.searchParams.res.find((v) => v.title === pack)?.path;
	}
}
