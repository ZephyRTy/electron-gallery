/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
import { fromJS, Map } from 'immutable';
import React from 'react';
import { defaultCover } from '../types/constant';
import {
	DirectoryInfo,
	ImageBookmark,
	ImageDirectory,
	Mode,
	NormalImage
} from '../types/global';
import { FileOperator } from './fileOperator';
import { compress, endsWith } from './functions';
import { ImgWaterfallCache } from './ImgWaterFallCache';
import { mysqlOperator } from './mysqlOperator';
import { ReaderOperator } from './readerOperator';
const fs = window.require('fs');
const isImage = (v: string) =>
	endsWith(v.toLocaleLowerCase(), '.jpg', 'png', 'jpeg', 'webp');
// 对文件进行操作，可与数据进行交互
export class GalleryOperator extends FileOperator<
	NormalImage,
	ImageBookmark,
	ImageDirectory
> {
	protected override directories: NormalImage[] = [];
	protected fileCache = {
		startPage: 0,
		data: [] as NormalImage[]
	};
	protected prevPage = '';
	protected refreshFn: React.Dispatch<React.SetStateAction<boolean>> = (
		v: any
	) => {};
	protected setTitleFn: React.Dispatch<React.SetStateAction<string>> = (
		v: any
	) => {};
	protected static instance: GalleryOperator;
	static getInstance(): GalleryOperator {
		if (!GalleryOperator.instance) {
			GalleryOperator.instance = new GalleryOperator();
		}
		return GalleryOperator.instance;
	}

	protected mode: Mode = Mode.Init;
	protected total = 0;
	protected currentPacks = [] as NormalImage[];
	dirMap = fromJS({}) as Map<string, DirectoryInfo>;

	protected nextTitle = '';
	protected searchCache = {
		key: '',
		mode: Mode.Normal,
		res: [] as NormalImage[],
		total: 0,
		reg: false,
		valid: false
	};

	protected constructor() {
		super({ database: 'GALLERY', tableName: 'pack_list' });
	}

	async changePackCover(packId: string, cover: string, fullPath: string) {
		compress(fullPath);
		let e = this.currentPacks.find((e) => e.id === parseInt(packId))!;
		await mysqlOperator.changePackCover(e?.id, cover);
		e.cover = cover;
		if (e.stared) {
			this.starModel.update();
		}
		ImgWaterfallCache.getInstance().updateCover(e);
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
				cover: cover.startsWith('/') ? cover : '/' + cover,
				title: data.title,
				stared: 0 as 0
			};
			await mysqlOperator.insertPack(newPack, duplicate);
			const img = newPack.path + newPack.cover;
			await compress(img);
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
				cover: cover.startsWith('/') ? cover : '/' + cover,
				title: e.title,
				stared: 0 as 0
			};
			const img = newPack.path + newPack.cover;
			success.push(
				mysqlOperator.insertPack(newPack).then((res) => {
					if (!res) {
						result.push(`${e.title}:::重复`);
					} else {
						successCount++;
					}

					if (i === data.length - 1 && successCount) {
						this.switchMode(Mode.Init);
						compress(img).then(() => {
							this.refresh();
						});
					}
				})
			);
		});
		return Promise.all(success).then(() => {
			if (successCount) {
				result.unshift(`${successCount}个图包:::成功`);
			}

			return result;
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
	//获取当前要打开的页面
	current(packId: number, change: boolean = true) {
		this.switchMode(Mode.Detail);
		let res: NormalImage = null as any;
		if (this.mode === Mode.Bookmark) {
			res = this.bookmarks.find(
				(v) => v.id === packId
			)! as unknown as NormalImage;
		} else {
			res = this.currentPacks.find((v) => v.id === packId)!;
		}
		if (change) {
			this.titleWillUpdate(res.title);
		}
		return res;
	}
}

export const galleryOperator = GalleryOperator.getInstance();
export const readerOperator = ReaderOperator.getInstance();
