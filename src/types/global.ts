/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { FileOperator } from '../utils/fileOperator';

export type fileStatus = 0 | 1 | 2 | 3;
export interface DataList {
	[index: string]: DataInfo;
}
export interface DataInfo {
	title: string;
	stared: boolean;
	cover: string;
	path: string;
	status: fileStatus;
}
export interface BasicData {
	title: string;
	stared: boolean;
	id: number;
	cover: string;
	path: string;
	status: fileStatus;
	parent?: number;
}

export interface DirData {
	title: string;
	stared: boolean;
	index: number;
	cover: string;
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
export interface ImageComponent<T extends BasicData> {
	(props: {
		src: string;
		data: T;
		util: FileOperator;
		inSelect?: boolean;
		setInSelect?: any;
		submit?: boolean;
	}): JSX.Element;
}

export interface Model<T> {
	dirty: boolean;
	data: T[];
	dataToUpdate: T[];
	update(newData: T, ...args: any[]): void;
}
export interface HttpImagePack {
	[index: number]: { title: string; mgSrcList: string[] };
}
export enum Mode {
	Init = 'INIT',
	Normal = 'Normal',
	Search = 'Search',
	Stared = 'Stared',
	Bookmark = 'Bookmark',
	InDir = 'InDir',
	ShowDir = 'ShowDir',
	Detail = 'Detail'
}
