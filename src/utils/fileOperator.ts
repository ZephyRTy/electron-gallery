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
import { notMoreThanOne, parseUrlQuery } from './functions';
import { bookmarkModel, selectionAdmin, starAdmin } from './models';
const fs = window.require('fs');

enum Mode {
	Init = 'INIT',
	Normal = 'Normal',
	Search = 'Search',
	Stared = 'Stared',
	Bookmark = 'Bookmark',
	InDir = 'InDir',
	ShowDir = 'ShowDir',
	Detail = 'Detail'
}
const positive = (n: number) => {
	return n >= 0 ? n : 0;
};

//DONE 增加、搜索、星标、书签
//TODO 删除、去重、用数据库系统读取文件
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

	private directories: Map<string, DirectoryInfo>;
	mode: Mode = Mode.Init;

	private currentPacks = [] as BasicData[];

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
		this.data = JSON.parse(
			fs.readFileSync(catalogPath, 'utf-8')
		) as BasicData[];
		this.filesNotInDir = this.data.filter((v) => v.status === 0);
		this.directories = Map(
			JSON.parse(fs.readFileSync(directoryPath, 'utf-8')) as DirectoryList
		);
		this.bookmarkModel.data = JSON.parse(
			fs.readFileSync(bookmarksPath, 'utf8')
		) as Bookmark[];
		this.starModel.data = _filter(
			this.data,
			(item) => item.stared
		).reverse();
	} //获取图包
	private getPacksNormally(page: number) {
		if (this.switchMode(Mode.Normal)) {
			this.currentPacks = this.filesNotInDir;
		}
		return this.currentPacks
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
	}

	//搜索图包
	private searchPacks(key: string, page: number, mode: Mode) {
		if (
			this.searchParams.key === key &&
			this.searchParams.mode === mode &&
			mode !== Mode.Search
		) {
			this.switchMode(Mode.Search);
			this.currentPacks = this.searchParams.res;
			return this.currentPacks.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			);
		}
		this.searchParams.key = key;
		this.searchParams.res = [];
		this.searchParams.mode =
			mode === Mode.Search ? Mode.Search : Mode.Normal;
		this.switchMode(Mode.Search);
		let result = _filter(
			mode === Mode.Normal || Mode.Search ? this.data : this.currentPacks,
			(item) =>
				item.title.toLocaleLowerCase().includes(key.toLocaleLowerCase())
		).reverse();
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
		if (this.switchMode(Mode.Stared)) {
			this.currentPacks = this.starModel.data;
		}
		return this.currentPacks.slice(
			(page - 1) * this.countOfSinglePage,
			page * this.countOfSinglePage
		);
	}

	//模式切换
	private switchMode(mode: Mode) {
		this.starModel.writeBack();
		this.setTitle(this.modeType(mode));
		if (mode === this.mode) {
			return false;
		}
		this.mode = mode;
		return true;
	}

	private getBookmarks(page: number): [BasicData[], number] {
		if (this.switchMode(Mode.Bookmark)) {
			this.currentPacks = this.bookmarks;
		}
		return [
			this.currentPacks.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			),
			this.bookmarks.length
		];
	}

	private getDirectory(index: number, page: number): [BasicData[], number] {
		if (this.switchMode(Mode.InDir)) {
			const directoryInfo: number[] = this.directories!.get(
				index.toString()
			)!.content;
			this.currentPacks = _filter(this.data, (v) =>
				directoryInfo.includes(v.index)
			);
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

	addNewPack(data: { path: string; cover: string; title: string }) {
		if (!data.path || !data.cover || !data.title) {
			return;
		}
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
		this.switchMode(Mode.Init);
		this.writeBack('data');
		this.refresh();
	}

	staredUpdate(newStar: BasicData) {
		this.starModel.update(newStar);
		this.starModel.dirty = true;
	}
	showDirs(page: number): [BasicData[], number] {
		if (this.switchMode(Mode.ShowDir)) {
			this.currentPacks = this.directories
				.keySeq()
				.toArray()
				.map((e) => this.data[parseInt(e)]);
		}
		return [
			this.currentPacks.slice(
				(page - 1) * this.countOfSinglePage,
				page * this.countOfSinglePage
			),
			this.currentPacks.length
		];
	}
	getPacks(page: number, url: string): [BasicData[], number] {
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
				this.searchPacks(query.search, page, this.mode),
				this.searchParams.total
			];
		} else if (query.directory) {
			return this.getDirectory(parseInt(query.directory), page);
		} else if (query.stared) {
			return [this.getStared(page), this.starModel.data.length];
		} else if (query.bookmark) {
			return this.getBookmarks(page);
		} else if (query.show_dir) {
			return this.showDirs(page);
		}
		return [this.getPacksNormally(page), this.filesNotInDir.length];
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
		return (
			this.currentPacks.find((v) => v.title === pack) ??
			this.data.find((v) => v.title === pack)
		);
	}

	bookmarksUpdate(newBookmark: Bookmark, marked: boolean = true) {
		this.bookmarkModel.update(newBookmark, marked);
		this.writeBack();
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
		this.filesNotInDir = this.data.filter((v) => v.status === 0);
		this.selection.selected.clear();
		this.writeBack('dir');
		this.switchMode(Mode.Init);
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
		this.data = [...this.data, newDirectory];
		this.directories = this.directories.set(newDirectory.index.toString(), {
			title: dirName,
			content: []
		})!;
		this.switchMode(Mode.Init);
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
		this.data[dirIndex].cover =
			i >= 0
				? this.data[i].path + this.data[i].cover
				: 'D:\\webDemo\\desktop-reader\\public\\blank.jpg';
		this.filesNotInDir = this.data.filter((v) => v.status === 0);
		this.writeBack('dir');
		this.switchMode(Mode.Init);
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
		this.filesNotInDir = this.data.filter((v) => v.status === 0);
		this.writeBack('dir');
		this.switchMode(Mode.Init);
	}

	get directoryList() {
		return this.directories;
	}
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
					this.directories!.get(
						window.location.href.match(/directory=([0-9]+)/)![1]
					)?.title ?? 'Directories'
				);
			default:
				return 'Porn Gallery';
		}
	}
}
