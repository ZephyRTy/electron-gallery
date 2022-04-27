/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
declare module '*.module.scss' {
	const styles: any;
	export default styles;
}
declare module '*.svg' {
	const icon: any;
	export default icon;
}
//0 means not a directory and not in a directory
//1 means not a directory but in a directory
//2 means a directory and not in a directory
//3 means a directory and in a directory
type fileStatus = 0 | 1 | 2 | 3;
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
	index: number;
	cover: string;
	path: string;
	status: fileStatus;
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
	content: number[];
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
	writeBack(): void;
}
export interface HttpImagePack {
	[index: number]: { title: string; mgSrcList: string[] };
}
