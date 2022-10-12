/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { FileOperator } from '../utils/fileOperator';

export type fileStatus = 0 | 1 | 2 | 3;
export interface BasicData {
	title: string;
	stared: boolean;
	id: number;
	cover: string;
	path: string;
	parent?: number;
}

export interface DirData {
	id: number;
	title: string;
	cover: string;
	timeStamp: string;
}
export interface Bookmark extends BasicData {
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
export interface ImageComponent<T extends BasicData | DirData> {
	(props: {
		src: string;
		data: T;
		util: FileOperator;
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
export type ImageData = BasicData | DirData | Bookmark;
