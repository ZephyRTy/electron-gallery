/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
import { Map } from 'immutable';
import _filter from 'lodash/filter';
import React from 'react';
import {
	bookmarksPath,
	catalogPath,
	defaultCover,
	directoryPath
} from '../types/constant';
import {
	BasicData,
	Bookmark,
	DirectoryInfo,
	DirectoryList,
	fileStatus
} from '../types/global';
import { bookmarkModel, selectionAdmin, starAdmin } from './models';
const fs = window.require('fs');

enum Mode {
	Normal,
	Search,
	Stared,
	Bookmark,
	Directory,
	Detail
}
const positive = (n: number) => {
	return n >= 0 ? n : 0;
};
const parseUrlQuery = (url: string) => {
	const query = decodeURIComponent(url.split('?')[1]);
	if (query) {
		const queryObj: any = {};
		const queryArr = query.split('&');
		queryArr.forEach((item) => {
			const [key, value] = item.split('=');
			queryObj[key] = value;
		});
		return queryObj;
	}
	return {};
};
//DONE 增加、搜索、星标、书签
//TODO 删除、去重、用数据库系统读取文件、图片文件夹功能
export class FileOperator {
	private data: BasicData[] = [];
	private filesNotInDir = [] as BasicData[];

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
	private dataDirty = false;
	private dirDirty = false;
	private directories: Map<string, DirectoryInfo>;

	private mode: Mode = Mode.Normal;

	private currentPacks = [] as BasicData[];

	private readonly starModel = starAdmin;
	private readonly bookmarkModel = bookmarkModel;
	private selection = selectionAdmin;
	private countOfSinglePage = 20;

	private searchParams = {
		key: '',
		res: [] as BasicData[],
		total: 0
	};

	private constructor() {
		this.data = JSON.parse(
			fs.readFileSync(catalogPath, 'utf-8')
		) as BasicData[];
		this.filesNotInDir = this.data.filter((v) => v.status % 2 === 0);
		this.directories = Map(
			JSON.parse(fs.readFileSync(directoryPath, 'utf-8')) as DirectoryList
		);
		this.bookmarkModel.data = JSON.parse(
			fs.readFileSync(bookmarksPath, 'utf8')
		) as Bookmark[];
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
	writeBack(...args: string[]) {
		if (this.data.length === 0) {
			return;
		}
		if (
			args.includes('data') ||
			args.includes('dir') ||
			this.starModel.dirty
		) {
			fs.writeFile(
				catalogPath,
				JSON.stringify(this.data),
				'utf-8',
				(err: any) => {
					if (err) {
						console.log(err);
					}
				}
			);
		}
		if (this.bookmarkModel.dirty) {
			fs.writeFile(
				bookmarksPath,
				JSON.stringify(this.bookmarks),
				'utf-8',
				(err: any) => {
					if (err) {
						console.error(err);
					}
				}
			);
			this.bookmarkModel.dirty = false;
		}
		if (args.includes('dir')) {
			fs.writeFile(
				directoryPath,
				JSON.stringify(this.directories.toJS()),
				'utf-8',
				(err: any) => {
					if (err) {
						console.error(err);
					}
				}
			);
		}
		this.starModel.dirty = false;
	}
	//获取图包
	private getPacksNormally(page: number) {
		this.switchMode(Mode.Normal);
		let files: BasicData[] = this.data;
		if (files.length === 0) {
			files = JSON.parse(
				fs.readFileSync(catalogPath, 'utf-8')
			) as BasicData[];
			this.data = files;
			this.filesNotInDir = this.data.filter((v) => v.status % 2 === 0);
		}
		if (this.starModel.data.length === 0) {
			this.starModel.data = _filter(
				files,
				(item) => item.stared
			).reverse();
		}
		if (!this.directories) {
			this.directories = Map(
				JSON.parse(
					fs.readFileSync(directoryPath, 'utf-8')
				) as DirectoryList
			);
		}
		this.currentPacks = this.filesNotInDir
			.slice(
				positive(
					this.filesNotInDir.length - page * this.countOfSinglePage
				),
				positive(
					this.filesNotInDir.length -
						(page - 1) * this.countOfSinglePage
				)
			)
			.reverse();
		return this.currentPacks;
	}

	//搜索图包
	private searchPacks(key: string, page: number) {
		this.switchMode(Mode.Search);
		if (this.searchParams.key === key) {
			this.currentPacks = this.searchParams.res.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			);
			return this.currentPacks;
		}
		this.searchParams.key = key;
		this.searchParams.res = [];
		let files: BasicData[] = this.data;
		let result = _filter(files, (item) =>
			item.title.toLocaleLowerCase().includes(key.toLocaleLowerCase())
		).reverse();
		this.searchParams.res = result;
		this.searchParams.total = result.length;
		this.currentPacks = result.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
		return this.currentPacks;
	}
	addNewPack(data: { path: string; cover: string; title: string }) {
		if (!data.path || !data.cover || !data.title) {
			return;
		}
		this.dataDirty = true;
		let index = this.data.length;
		let newPack: BasicData = {
			path: data.path,
			cover: '\\' + data.cover,
			title: data.title,
			stared: false,
			index,
			status: 0
		};
		this.data = [...this.data, newPack];
		this.filesNotInDir = [...this.filesNotInDir, newPack];
		this.writeBack('data');
	}

	staredUpdate(newStar: BasicData) {
		this.starModel.update(newStar);
		this.starModel.dirty = true;
	}

	//获取星标图包
	private getStared(page: number) {
		this.switchMode(Mode.Stared);
		this.currentPacks = this.starModel.data.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
		return this.currentPacks;
	}

	getPacks(page: number, url: string): [BasicData[], number] {
		let query: {
			search?: string;
			directory?: string;
			stared?: string;
			bookmark?: string;
			page?: string;
		} = parseUrlQuery(url);
		if (query.search) {
			return [
				this.searchPacks(query.search, page),
				this.searchParams.total
			];
		} else if (query.directory) {
			return this.getDirectory(parseInt(query.directory), page);
		} else if (query.stared) {
			return [this.getStared(page), this.starModel.data.length];
		} else if (query.bookmark) {
			return [this.getBookmarks(page), this.bookmarks.length];
		}
		return [this.getPacksNormally(page), this.filesNotInDir.length];
	}
	//模式切换
	private switchMode(mode: Mode) {
		this.setTitle('');
		this.starModel.writeBack();
		if (mode === this.mode) {
			return;
		}
		this.mode = mode;
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
		this.setTitle(pack);
		if (this.mode === Mode.Bookmark) {
			return this.bookmarks.find((v) => v.title === pack);
		}
		return (
			this.currentPacks.find((v) => v.title === pack) ??
			this.data.find((v) => v.title === pack)
		);
	}

	bookmarksUpdate(newBookmark: Bookmark, marked: boolean = true) {
		this.bookmarkModel.update(newBookmark, marked);
		this.writeBack();
	}

	private getBookmarks(page: number) {
		this.switchMode(Mode.Bookmark);
		if (this.bookmarkModel.data.length === 0) {
			this.bookmarkModel.data = JSON.parse(
				fs.readFileSync(bookmarksPath, 'utf8')
			) as Bookmark[];
		}
		return this.bookmarks.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
	}

	selectionUpdate(newSelection: number, selected: boolean) {
		this.selection.update(newSelection, selected);
	}
	submitSelection(dirIndex: number) {
		if (this.selection.selected.size === 0) {
			return;
		}
		const directoryInfo: number[] = this.directories!.get(
			dirIndex.toString()
		)!.content;
		directoryInfo.push(...this.selection.selected);
		directoryInfo.forEach((v) => {
			this.data[v].status = 1;
		});
		let firstPack = this.data[directoryInfo[directoryInfo.length - 1]];
		this.data[dirIndex].cover = firstPack.path + firstPack.cover;
		this.filesNotInDir = this.data.filter((v) => v.status % 2 === 0);
		this.selection.selected.clear();
		this.writeBack('dir');
	}
	addNewDir(dirName: string) {
		let newDirectory = {
			title: dirName,
			stared: false,
			index: this.data.length,
			cover: defaultCover,
			path: '',
			status: 2 as fileStatus
		};
		this.data.push(newDirectory);
		this.directories = this.directories.set(newDirectory.index.toString(), {
			title: dirName,
			content: []
		})!;
		this.dirDirty = true;
		this.dataDirty = true;
		return newDirectory.index;
	}
	removeFileFromDir(fileIndex: number, dirIndex: number) {
		let directoryInfo = this.directories!.get(dirIndex.toString())!;
		let index = directoryInfo.content.indexOf(fileIndex);
		if (index === -1) {
			return;
		}
		directoryInfo.content.splice(index, 1);
		this.data[fileIndex].status = 0;
		let i = directoryInfo.content[directoryInfo.content.length - 1];
		this.data[dirIndex].cover = this.data[i].path + this.data[i].cover;
		this.filesNotInDir = this.data.filter((v) => v.status % 2 === 0);
		this.writeBack('dir');
	}
	removeDir(dirIndex: number) {
		let directoryInfo = this.directories!.get(dirIndex.toString());
		if (!directoryInfo) {
			return;
		}
		directoryInfo.content.forEach((v) => {
			this.data[v].status = 0;
		});
		this.directories = this.directories?.delete(dirIndex.toString());
		this.filesNotInDir = this.data.filter((v) => v.status % 2 === 0);
		this.writeBack('dir');
	}
	private getDirectory(index: number, page: number): [BasicData[], number] {
		const directoryInfo: number[] = this.directories!.get(
			index.toString()
		)!.content;
		const content = _filter(this.data, (v) =>
			directoryInfo.includes(v.index)
		);
		this.currentPacks = content.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
		return [this.currentPacks, directoryInfo.length];
	}

	private get bookmarks() {
		return this.bookmarkModel.data;
	}
}
