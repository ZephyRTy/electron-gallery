/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { GalleryOperator } from '../utils/galleryOperator';

export type fileStatus = 0 | 1 | 2 | 3;
export interface BasicData {
	title: string;
	stared: boolean;
	id: number;
	path: string;
	parent?: number;
}
export interface NormalImage extends BasicData {
	cover: string;
}
export interface ImageDirectory {
	id: number;
	title: string;
	cover: string;
	timeStamp: string;
}

export interface Bookmark extends NormalImage {
	timeStamp: string;
	url: string;
}

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
}
export interface HttpImagePack {
	[index: number]: { title: string; mgSrcList: string[] };
}
export enum Mode {
	Init = 'INIT',
	Normal = 'Normal',
	Stared = 'Stared',
	Bookmark = 'Bookmark',
	InDir = 'InDir', //文件夹内部
	ShowDir = 'ShowDir',
	Detail = 'Detail'
}

export interface TextLine {
	index: number;
	content: string;
}
export type ImageData = NormalImage | ImageDirectory | Bookmark;
export interface Chapter {
	title: string;
	index: number;
}
export interface Book extends BasicData {}
