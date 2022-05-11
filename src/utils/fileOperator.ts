/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
import { fromJS, Map } from 'immutable';
import React from 'react';
import { defaultCover } from '../types/constant';
import { BasicData, Bookmark, DirectoryInfo, Mode } from '../types/global';
import { notMoreThanOne, parseUrlQuery } from './functions';
import { bookmarkModel, selectionAdmin, starAdmin } from './models';
import { mysqlOperator } from './mysqlOperator';
const fs = window.require('fs');

// const positive = (n: number) => {
// 	return n >= 0 ? n : 0;
// };

//DONE 增加、搜索、星标、书签
//TODO 删除、去重、用数据库系统读取文件
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
	private readonly starModel = starAdmin;
	private readonly bookmarkModel = bookmarkModel;
	private selection = selectionAdmin;
	private countOfSinglePage = 20;

	private searchParams = {
		key: '',
		mode: Mode.Normal,
		res: [] as BasicData[],
		total: 0
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
			page < this.fileCache.startPage ||
			page >= this.fileCache.startPage + 10 ||
			this.fileCache.startPage === 0 ||
			this.switchMode(Mode.Normal)
		) {
			res = await mysqlOperator.select(
				[
					(page - 1) * this.countOfSinglePage,
					10 * this.countOfSinglePage
				],
				Mode.Normal
			);
			this.fileCache.data = res;
			this.fileCache.startPage = page;
		}
		this.currentPacks = this.fileCache.data;
		return this.currentPacks.slice(
			(page - this.fileCache.startPage) * this.countOfSinglePage,
			(page - this.fileCache.startPage) * this.countOfSinglePage + 20
		);
	}

	//搜索图包
	private async searchPacks(key: string, page: number, mode: Mode) {
		if (
			this.searchParams.key === key &&
			this.searchParams.mode === mode &&
			mode !== Mode.Search
		) {
			this.switchMode(Mode.Search);
			return this.searchParams.res.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			);
		}
		this.searchParams.key = key;
		this.searchParams.res = [];
		this.searchParams.mode = mode;
		this.switchMode(Mode.Search);
		let result = [] as BasicData[];
		if (mode === Mode.InDir) {
			result = this.currentPacks.filter((v) => v.title.includes(key));
		} else {
			result = await mysqlOperator.search(key, mode);
		}

		this.searchParams.res = result;
		this.searchParams.total = result.length;
		this.currentPacks = result;
		return this.currentPacks.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
	}

	//获取星标图包
	private getStared(page: number) {
		this.switchMode(Mode.Stared);
		this.currentPacks = this.starModel.data;
		return this.currentPacks.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
	}

	private getBookmarks(page: number): [BasicData[], number] {
		this.switchMode(Mode.Bookmark);
		this.currentPacks = this.bookmarkModel.data;
		return [
			this.currentPacks.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			),
			this.bookmarks.length
		];
	}
	//模式切换
	private switchMode(mode: Mode) {
		this.setTitle(this.modeType(mode));
		if (mode === this.mode) {
			return false;
		}
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
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			),
			this.currentPacks.length
		];
	}

	private get bookmarks() {
		return this.bookmarkModel.data;
	}

	//NOTE public methods
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

	async addNewPack(data: { path: string; cover: string; title: string }) {
		if (!data.path || !data.cover || !data.title) {
			return;
		}
		let newPack = {
			path: data.path,
			cover: '\\' + data.cover,
			title: data.title,
			stared: false,
			status: 0
		};
		await mysqlOperator.insertPack(newPack);
		this.switchMode(Mode.Init);
		this.refresh();
	}

	staredUpdate(newStar: BasicData) {
		this.starModel.update(newStar);
	}
	async showDirs(page: number): Promise<[BasicData[], number]> {
		this.switchMode(Mode.ShowDir);
		let res = await mysqlOperator.select([], Mode.ShowDir);
		return [
			res.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			),
			res.length
		];
		// return [
		// 	this.currentPacks.slice(
		// 		(page - 1) * this.countOfSinglePage,
		// 		page * this.countOfSinglePage
		// 	),
		// 	this.currentPacks.length
		// ];
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
				await this.searchPacks(query.search, page, this.mode),
				this.searchParams.total
			];
		} else if (query.directory) {
			return await this.getDirContent(parseInt(query.directory), page);
		} else if (query.stared) {
			return [this.getStared(page), this.starModel.data.length];
		} else if (query.bookmark) {
			return this.getBookmarks(page);
		} else if (query.show_dir) {
			return await this.showDirs(page);
		}
		return [
			await this.getPacksNormally(page),
			this.total || (await this.getTotal())
		];
	}

	setTitle(title: string) {
		this.setTitleFn(title);
	}
	//刷新
	refresh() {
		this.refreshFn((v) => !v);
	}

	savePrevPage(url: string) {
		this.prevPage = url;
	}

	loadPrevPage() {
		let url = this.prevPage;
		return url;
	}

	current(pack: string) {
		this.switchMode(Mode.Detail);
		this.setTitle(pack);
		if (this.mode === Mode.Bookmark) {
			return this.bookmarks.find((v) => v.title === pack);
		}
		return this.currentPacks.find((v) => v.title === pack);
	}

	bookmarksUpdate(newBookmark: Bookmark, marked: boolean = true) {
		this.bookmarkModel.update(newBookmark, marked);
	}

	selectionUpdate(newSelection: number, selected: boolean) {
		this.selection.update(newSelection, selected);
	}

	addFileToDir(dirIndex: number) {
		if (this.selection.selected.size === 0) {
			return;
		}
		let selection = Array.from(this.selection.selected);
		let cover = '';
		for (let i = 0; i < selection.length; i++) {
			const e = selection[i];
			if (i === 0) {
				let o = this.currentPacks.find((v) => v.id === e)!;
				cover = o.path + o.cover;
			}
			mysqlOperator
				.updateDir(dirIndex, e, 1, !i ? cover : '')
				.then(() => {
					if (i === selection.length - 1) {
						this.dirMap.get(dirIndex.toString())!.count +=
							selection.length;
						this.selection.selected.clear();
						this.switchMode(Mode.Init);
						this.refresh();
					}
				});
		}
	}

	addNewDir(dirName: string) {
		let newDirectory = {
			dir_title: dirName,
			dir_stared: 0,
			dir_id: this.directories.length,
			dir_cover: defaultCover
		};
		mysqlOperator.insertDir(newDirectory);
		this.dirMap = this.dirMap.set(newDirectory.dir_id.toString(), {
			title: dirName,
			count: 0
		});
		this.switchMode(Mode.Init);
		return newDirectory.dir_id;
	}
	removeFileFromDir(packId: number, dirId: number) {
		mysqlOperator
			.updateDir(
				dirId,
				packId,
				0,
				this.currentPacks.find((e) => e.id !== packId)?.cover ??
					defaultCover
			)
			.then((e) => {
				this.dirMap.get(dirId.toString())!.count--;
				this.currentPacks = this.currentPacks.filter(
					(v) => v.id !== packId
				);
				this.refresh();
			});
		this.switchMode(Mode.Init);
	}
	// removeDir(dirIndex: number) {
	// 	let directoryInfo = this.directories!.get(dirIndex.toString());
	// 	if (!directoryInfo) {
	// 		return;
	// 	}
	// 	directoryInfo.content.forEach((v) => {
	// 		this.data[v].status = 0;
	// 	});
	// 	this.directories = this.directories?.delete(dirIndex.toString());
	// 	this.filesNotInDir = this.data.filter((v) => v.status === 0);
	// 	this.switchMode(Mode.Init);
	// }

	modeType(mode: Mode) {
		switch (mode) {
			case Mode.Init:
				return 'Porn Gallery';
			case Mode.Detail:
				return 'Detail';
			case Mode.Search:
				return 'Search = ' + this.searchParams.key;
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
				return 'Porn Gallery';
		}
	}

	async getTotal() {
		return mysqlOperator.getCount();
	}
}
