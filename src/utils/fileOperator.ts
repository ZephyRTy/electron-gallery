/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
import { fromJS, Map } from 'immutable';
import React from 'react';
import { defaultCover, packCountOfSinglePage } from '../types/constant';
import { BasicData, Bookmark, DirectoryInfo, Mode } from '../types/global';
import {
	compress,
	convertJsRegToMysqlReg,
	endsWith,
	notMoreThanOne,
	parseUrlQuery
} from './functions';
import { ImgWaterfallCache } from './ImgWaterFallCache';
import { bookmarkModel, selectionModel, starModel } from './models';
import { mysqlOperator } from './mysqlOperator';
const fs = window.require('fs');
const isImage = (v: string) =>
	endsWith(v.toLocaleLowerCase(), '.jpg', 'png', 'jpeg', 'webp');
const checkImageSize = (path: string) => {
	const size = fs.statSync(path).size;
	return size;
};
// 对文件进行操作，可与数据进行交互
export class FileOperator {
	private directories: BasicData[] = [];
	private fileCache = {
		startPage: 0,
		data: [] as BasicData[]
	};
	private prevPage = '';
	private refreshFn: React.Dispatch<React.SetStateAction<boolean>> = (
		v: any
	) => {};
	private setTitleFn: React.Dispatch<React.SetStateAction<string>> = (
		v: any
	) => {};
	private static instance: FileOperator;
	static getInstance(): FileOperator {
		if (!FileOperator.instance) {
			FileOperator.instance = new FileOperator();
		}
		return FileOperator.instance;
	}

	private mode: Mode = Mode.Init;
	private total = 0;
	private currentPacks = [] as BasicData[];
	dirMap = fromJS({}) as Map<string, DirectoryInfo>;
	private readonly starModel = starModel;
	private readonly bookmarkModel = bookmarkModel;
	private selection = selectionModel;

	private searchCache = {
		key: '',
		mode: Mode.Normal,
		res: [] as BasicData[],
		total: 0,
		reg: false,
		valid: false
	};

	private constructor() {
		mysqlOperator.getCount().then((res) => {
			this.total = res;
		});
		mysqlOperator.select([], Mode.Stared).then((res) => {
			this.starModel.data = res;
		});
		mysqlOperator.select([], Mode.Bookmark).then((res) => {
			this.bookmarkModel.data = res as Bookmark[];
		});
		mysqlOperator.select([], Mode.ShowDir).then((res) => {
			this.directories = res;
		});
		mysqlOperator.mapDir().then((res) => {
			this.dirMap = Map(res);
		});
	} //获取图包
	private async getPacksNormally(page: number) {
		let res = this.fileCache.data;
		if (
			this.switchMode(Mode.Normal) ||
			page < this.fileCache.startPage ||
			page >= this.fileCache.startPage + 10 ||
			this.fileCache.startPage === 0
		) {
			res = await mysqlOperator.select(
				[
					(page - 1) * packCountOfSinglePage,
					10 * packCountOfSinglePage
				],
				Mode.Normal
			);
			this.fileCache.data = res;
			this.fileCache.startPage = page;
		}
		this.currentPacks = this.fileCache.data;
		return this.currentPacks.slice(
			(page - this.fileCache.startPage) * packCountOfSinglePage,
			(page - this.fileCache.startPage + 1) * packCountOfSinglePage
		);
	}

	//搜索图包
	private async searchPacks(key: string, page: number) {
		this.setTitle('Search=' + this.searchCache.key);
		if (this.searchCache.key === key && this.searchCache.valid) {
			return this.searchCache.res.slice(
				(page - 1) * packCountOfSinglePage,
				page * packCountOfSinglePage
			);
		}
		this.searchCache.valid = true;
		this.searchCache.key = key;
		this.searchCache.res = [];
		let result = [] as BasicData[];
		if (this.mode === Mode.InDir) {
			result = this.currentPacks.filter((v) => v.title.includes(key));
		} else {
			result = await mysqlOperator.search(
				this.searchCache.reg ? convertJsRegToMysqlReg(key) : key,
				this.mode,
				this.searchCache.reg
			);
		}

		this.searchCache.res = result;
		this.searchCache.total = result.length;
		this.currentPacks = result;
		return this.currentPacks.slice(
			(page - 1) * packCountOfSinglePage,
			page * packCountOfSinglePage
		);
	}

	//获取星标图包
	private getStared(page: number) {
		this.switchMode(Mode.Stared);
		this.currentPacks = this.starModel.data;
		return this.currentPacks.slice(
			(page - 1) * packCountOfSinglePage,
			page * packCountOfSinglePage
		);
	}

	private getBookmarks(page: number): [BasicData[], number] {
		this.switchMode(Mode.Bookmark);
		this.currentPacks = this.bookmarkModel.data;
		return [
			this.currentPacks.slice(
				(page - 1) * packCountOfSinglePage,
				page * packCountOfSinglePage
			),
			this.bookmarks.length
		];
	}
	//模式切换
	private switchMode(mode: Mode) {
		if (mode !== Mode.Detail) {
			this.setTitle(this.modeType(mode));
		}

		if (mode === this.mode) {
			return false;
		}
		this.searchCache.valid = false;
		this.mode = mode;
		return true;
	}

	private async getDirContent(
		index: number,
		page: number
	): Promise<[BasicData[], number]> {
		if (this.switchMode(Mode.InDir)) {
			this.currentPacks = await mysqlOperator.select([], Mode.InDir);
		}
		return [
			this.currentPacks.slice(
				(page - 1) * packCountOfSinglePage,
				page * packCountOfSinglePage
			),
			this.currentPacks.length
		];
	}

	private get bookmarks() {
		return this.bookmarkModel.data;
	}

	register(
		fn: React.Dispatch<React.SetStateAction<any>>,
		flag: boolean = false
	) {
		if (!flag) {
			this.refreshFn = fn;
		} else {
			this.setTitleFn = fn;
		}
	}

	async addNewPack(
		data:
			| { path: string; cover?: string; title: string }
			| { path: string; cover?: string; title: string }[],
		duplicate: boolean = false
	) {
		if (!Array.isArray(data)) {
			if (!data.path || !data.title) {
				return;
			}
			let cover = data.cover;
			if (!cover || !isImage(cover)) {
				cover = fs
					.readdirSync(data.path)
					.find((v: string) => isImage(v));
			}
			if (!cover) {
				console.warn(data.title, 'no image found');
				return;
			}
			let newPack = {
				path: data.path,
				cover: '/' + cover,
				title: data.title,
				stared: 0 as 0
			};
			await mysqlOperator.insertPack(newPack, duplicate);
			const img = newPack.path + newPack.cover;
			let size = checkImageSize(img);
			let n = 1;
			if (size >= 1024 * 1024 * 6) {
				n = 0.15;
			} else if (size >= 1024 * 1024 * 4) {
				n = 0.2;
			} else if (size >= 1024 * 1024 * 2) {
				n = 0.4;
			} else if (size >= 1024 * 1024 * 1) {
				n = 0.8;
			}
			compress(img, n);
			this.switchMode(Mode.Init);
			this.refresh();
			return true;
		}
		let result = [] as string[];
		let successCount = 0;
		let success = [] as Promise<any>[];
		data.forEach((e, i) => {
			if (!e.path || !e.title) {
				return;
			}
			let cover =
				e.cover ||
				fs.readdirSync(e.path).find((v: string) => isImage(v));
			if (!cover) {
				console.warn(e.title, 'no image found');
				result.push(`${e.title}:::未找到图片`);
				return;
			}
			let newPack = {
				path: e.path,
				cover: '/' + cover,
				title: e.title,
				stared: 0 as 0
			};
			success.push(
				mysqlOperator.insertPack(newPack).then((res) => {
					if (!res) {
						result.push(`${e.title}:::重复`);
					} else {
						successCount++;
						if (successCount === 1) {
							result.push('添加成功');
						}
					}

					if (i === data.length - 1 && successCount) {
						this.switchMode(Mode.Init);
						this.refresh();
					}
				})
			);
		});
		return Promise.all(success).then(() => {
			return result;
		});
	}

	staredUpdate(newStar: BasicData) {
		this.starModel.update(newStar);
	}
	async showDir(page: number): Promise<[BasicData[], number]> {
		this.switchMode(Mode.ShowDir);
		let res = await mysqlOperator.select([], Mode.ShowDir);
		this.currentPacks = res;
		return [
			res.slice(
				(page - 1) * packCountOfSinglePage,
				page * packCountOfSinglePage
			),
			res.length
		];
	}
	async getPacks(page: number, url: string): Promise<[BasicData[], number]> {
		let query: {
			search?: string;
			directory?: string;
			stared?: string;
			bookmark?: string;
			show_dir?: string;
			page?: string;
		} = parseUrlQuery(url);
		if (
			!notMoreThanOne(
				query.stared,
				query.bookmark,
				query.directory,
				query.show_dir
			)
		) {
			// eslint-disable-next-line quotes
			throw new Error("can't more than one mode");
		}
		if (query.search) {
			return [
				await this.searchPacks(query.search, page),
				this.searchCache.total
			];
		} else if (query.directory) {
			return await this.getDirContent(parseInt(query.directory), page);
		} else if (query.stared) {
			return [this.getStared(page), this.starModel.data.length];
		} else if (query.bookmark) {
			return this.getBookmarks(page);
		} else if (query.show_dir) {
			return await this.showDir(page);
		}
		return [
			await this.getPacksNormally(page),
			this.total || (await this.getTotal())
		];
	}
	//修改窗口标题
	setTitle(title: string) {
		this.setTitleFn(title);
	}

	//刷新
	refresh() {
		this.switchMode(Mode.Init);
		this.refreshFn((v) => !v);
	}

	//保存前一页面
	savePrevPage(url: string) {
		this.prevPage = url;
	}

	loadPrevPage() {
		let url = this.prevPage;
		return url;
	}

	//获取当前要打开的页面
	current(packId: number, change: boolean = true) {
		this.switchMode(Mode.Detail);
		let res: BasicData = null as any;
		if (this.mode === Mode.Bookmark) {
			res = this.bookmarks.find((v) => v.id === packId)!;
		} else {
			res = this.currentPacks.find((v) => v.id === packId)!;
		}
		if (change) {
			this.setTitle(res.title);
		}
		return res;
	}

	bookmarksUpdate(newBookmark: Bookmark, marked: boolean = true) {
		this.bookmarkModel.update(newBookmark, marked);
	}

	//更新选区
	selectionUpdate(newSelection: number, selected: boolean) {
		this.selection.update(newSelection, selected);
	}

	addFileToDir(dirIndex: number) {
		if (this.selection.selected.size === 0) {
			return;
		}
		let cover = '';
		let count = 0;
		this.currentPacks.forEach((e, i) => {
			if (this.selection.selected.has(e.id)) {
				if (count === 0) {
					cover = e.path + e.cover;
				}
				++count;
				e.parent = dirIndex;
				mysqlOperator
					.updateDir(dirIndex, e.id, 1, count === 1 ? cover : '')
					.then(() => {
						if (count === this.selection.selected.size) {
							this.dirMap.get(dirIndex.toString())!.count +=
								this.selection.selected.size;
							this.selection.selected.clear();
							if (this.mode === Mode.Normal) {
								this.refresh();
							}
							this.switchMode(Mode.Init);
						}
					});
			}
		});
	}

	async addNewDir(dirName: string) {
		if (this.dirMap.valueSeq().find((v) => v.title === dirName)) {
			return -1;
		}
		let newDirectory = {
			dir_title: dirName,
			dir_cover: defaultCover
		};
		let res = await mysqlOperator.insertDir(newDirectory);
		if (res) {
			this.dirMap = Map(await mysqlOperator.mapDir());
			this.switchMode(Mode.Init);
			return res;
		}
		return -1;
	}
	removeFileFromDir(packId: number, dirId: number) {
		let e = this.currentPacks.find((e) => e.id !== packId);
		mysqlOperator
			.updateDir(dirId, packId, 0, e ? e.path + e.cover : defaultCover)
			.then((e) => {
				this.dirMap.get(dirId.toString())!.count--;
				this.currentPacks = this.currentPacks.filter(
					(v) => v.id !== packId
				);
				this.refresh();
			});
		this.switchMode(Mode.Init);
	}

	modeType(mode: Mode) {
		switch (mode) {
			case Mode.Init:
				return 'Gallery';
			case Mode.Detail:
				return 'Detail';
			case Mode.Bookmark:
				return 'Bookmark';
			case Mode.ShowDir:
				return 'Directories';
			case Mode.Stared:
				return 'Stared';
			case Mode.InDir:
				return (
					this.dirMap!.get(
						window.location.href.match(/directory=([0-9]+)/)![1]
					)?.title ?? 'Directories'
				);
			default:
				return 'Gallery';
		}
	}

	private renameTarget = { id: -1, oldTitle: '' };
	private async renamePack(title: string) {
		try {
			await mysqlOperator.renamePack(this.renameTarget.id, title);
			let target = this.currentPacks.find(
				(e) => e.id === this.renameTarget.id
			)!;
			target.title = title;
			if (target.stared) {
				this.starModel.update();
			}
			this.refresh();
			return true;
		} catch {
			return false;
		}
	}

	set packToBeRenamed(data: { id: number; oldTitle: string }) {
		if (data) {
			this.renameTarget = data;
		} else {
			this.renameTarget = { id: -1, oldTitle: '' };
		}
	}
	get oldTitle() {
		return this.renameTarget.oldTitle;
	}
	private async renameDir(title: string) {
		try {
			await mysqlOperator.renameDir(this.renameTarget.id, title);
			this.dirMap.get(this.renameTarget.id.toString())!.title = title;
			let target = this.currentPacks.find(
				(e) => e.id === this.renameTarget.id
			)!;
			target.title = title;
			this.refresh();
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	rename(newTitle: string) {
		if (this.mode === Mode.ShowDir) {
			return this.renameDir(newTitle);
		}
		return this.renamePack(newTitle);
	}
	async getTotal() {
		return mysqlOperator.getCount();
	}

	async changePackCover(packId: string, cover: string) {
		let e = this.currentPacks.find((e) => e.id === parseInt(packId))!;
		await mysqlOperator.changePackCover(e?.id, cover);
		e.cover = cover;
		if (e.stared) {
			this.starModel.update();
		}
		ImgWaterfallCache.getInstance().updateCover(e);
	}

	get modeOfSearch() {
		return this.searchCache.mode;
	}

	get inDir() {
		return this.mode === Mode.InDir;
	}

	searchParentName(parentID: number | undefined) {
		if (!parentID) {
			return 'Directories';
		}
		return this.dirMap?.get(parentID.toString())?.title ?? 'Directories';
	}

	set reg(v: boolean) {
		this.searchCache.reg = v;
	}
	getMode() {
		return this.mode;
	}
}

export const fileOperator = FileOperator.getInstance();
