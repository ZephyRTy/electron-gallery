/* eslint-disable no-unused-vars */
import {
	BasicData,
	BookmarkOfBook,
	DirectoryInfo,
	ImageBookmark,
	Mode
} from '../../types/global';

export interface RequestOperator {
	select<A, B>(sqlParam: number[], mode: Mode): Promise<any[]>;
	getCount(): Promise<number>;
	end(): void;
	search<T extends BasicData>(
		sqlParam: string,
		mode: Mode,
		reg: boolean
	): Promise<T[]>;
	updateStar<T extends BasicData>(data: T): Promise<unknown>;
	updateDir(
		dirId: number,
		packId: number,
		status: 0 | 1,
		cover?: string
	): Promise<unknown>;
	mapDir(): Promise<Map<string, DirectoryInfo>>;
	insertDir(newDir: any): Promise<number | null>;
	insertPack(
		newPack: {
			title: string;
			stared: 0 | 1;
			path: string;
			cover?: string;
		},
		duplicate: boolean
	): Promise<unknown>;
	delete(packID: number): Promise<unknown>;
	checkExternalDriver(): Promise<boolean>;
	renamePack(packID: number, title: string): Promise<unknown>;
	renameDir(dirID: number, title: string): Promise<unknown>;
	switchDatabase(database: string, tableName: string): boolean;
	updateGalleryBookmark(
		bookmark: ImageBookmark,
		marked: boolean,
		mode: 'insert' | 'update'
	): Promise<unknown>;
	updateBookmarkOfBook(
		bookmark: BookmarkOfBook,
		marked: boolean,
		mode: 'insert' | 'update'
	): Promise<unknown>;
	updateReg(id: number, reg: string): Promise<unknown>;
	clearBookmark(): Promise<unknown>;
}
