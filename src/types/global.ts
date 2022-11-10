/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { BookDetail } from '../utils/BookDetail';
import { GalleryOperator } from '../utils/galleryOperator';
import { RequestOperator } from '../utils/requestOperator';

export type fileStatus = 0 | 1 | 2 | 3;
export interface BasicData {
	title: string;
	stared: boolean;
	id: number;
	path: string;
	parent?: number;
}

export interface BasicBookmark extends BasicData {
	timeStamp: string;
	url: string;
}

export interface BasicFolder {
	id: number;
	title: string;
	timeStamp: string;
}
export interface NormalImage extends BasicData {
	cover: string;
}
export interface ImageDirectory extends BasicFolder {
	cover: string;
}

export interface ImageBookmark extends NormalImage, BasicBookmark {}

export interface DirectoryList {
	[index: string]: DirectoryInfo;
}
export interface DirectoryInfo {
	title: string;
	count: number;
}
export interface ImageComponent<T extends NormalImage | ImageDirectory> {
	(props: {
		src: string;
		data: T;
		util: GalleryOperator;
		inSelect?: number;
		setInSelect?: any;
		submit?: boolean;
	}): JSX.Element;
}

export interface Model<T> {
	dirty: boolean;
	data: T[];
	dataToUpdate: T[];
	update(newData?: T, ...args: any[]): void;
	remove(id: number): void;
	sqlOperator: RequestOperator;
}
export interface HttpImagePack {
	[index: number]: { title: string; mgSrcList: string[] };
}
export enum Mode {
	Init = 'INIT',
	Normal = 'Normal',
	Stared = 'Stared',
	Bookmark = 'Bookmark',
	DirContent = 'InDir', //文件夹内部
	ShowDirs = 'ShowDirs',
	Detail = 'Detail'
}

export interface TextLine {
	index: number; //行号
	content: string;
	className: string[];
	paragraphIndex: number;
	readonly parent: BookDetail;
}
export type ImageData = NormalImage | ImageDirectory | ImageBookmark;
export interface Chapter {
	title: string;
	index: number;
}
export interface Book extends BasicData {
	reg: string;
}

export interface BookDirectory extends BasicFolder {}
export interface BookmarkOfBook extends Book, BasicBookmark {}
/**
 * 每一行选区的逻辑形式
 */
export interface LineSelection {
	index: number;
	offset: number;
	length: number;
	isBlank: boolean;
}
/**
 * 行选区在页面上的实际形式
 */
export interface LineSelectionPosition {
	top: number;
	offset: number;
	width: number;
	readonly logic: LineSelection;
}

/**
 * 每一组选区的逻辑形式，包含多个行选区，可被分割为行选区
 */
export interface SelectionInfo {
	anchorIndex: number;
	anchorOffset: number;
	focusIndex: number;
	focusOffset: number;
	timestamp: string;
	comment: string;
}

export interface MarkAnchor {
	anchorIndex: number;
	content: string;
	timestamp: string;
}
