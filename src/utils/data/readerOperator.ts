/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { Book } from 'epubjs';
import { Map } from 'immutable';
import { lettersOfEachLine, SPACE_CODE } from '../../types/constant';
import {
	BookDirectory,
	BookmarkOfBook,
	MetaBook,
	Mode,
	TextLine
} from '../../types/global';
import { deleteUselessWords, getEpubTitle } from '../functions/functions';
import { sqliteOperator } from '../request/sqliteOperator';
import { DataOperator } from './DataOperator';
import { EpubDetail } from './EpubDetail';
import { catalogCache } from './indexDB';
import { TextDetail } from './TextDetail';
const fsp = window.require('fs/promises');
const fs = window.require('fs');
const path = window.require('path');
const iconv = window.require('iconv-lite');
iconv.skipDecodeWarning = true;
export const splitWords = (str: string, len: number) => {
	let strLen = str.length;
	let result: string[] = [];
	for (let i = 0; i < strLen; i += len) {
		result.push(str.slice(i, i + len));
	}
	return result;
};
export const isText = (file: string) =>
	file.toLocaleLowerCase().endsWith('.txt') ||
	file.toLocaleLowerCase().endsWith('.epub');
// eslint-disable-next-line no-unused-vars
const DOUBLE_SPACE = SPACE_CODE + SPACE_CODE;

export class ReaderOperator extends DataOperator<
	MetaBook,
	BookmarkOfBook,
	BookDirectory
> {
	private static instance: ReaderOperator;
	protected override sql = sqliteOperator;
	private currentBook: MetaBook | null = null;
	private constructor() {
		super({ database: 'book', tableName: 'book_list' }, sqliteOperator);
	}
	public static getInstance(): ReaderOperator {
		if (!ReaderOperator.instance) {
			ReaderOperator.instance = new ReaderOperator();
		}
		return ReaderOperator.instance;
	}
	formatContent(content: string): string {
		let result = content.replace(/\n/g, '<br/>');
		return result;
	}

	async loadText(fontSize: number) {
		if (!this.currentBook) {
			this.currentBook = JSON.parse(
				window.sessionStorage.getItem('currentBook')!
			);
		}

		return new Promise((resolve) => {
			const readStream = fs.createReadStream(this.currentBook!.path, {
				encoding: 'utf8',
				autoClose: true,
				start: 0,
				end: 100
			});
			readStream.on('data', (data) => {
				resolve(data);
			});
		})
			.then((res) => {
				return this.isNotUtf8(res as string);
			})
			.then(async (isNotUtf8) => {
				let text: string;
				const res =
					((await catalogCache.getCachedCatalog(
						this.currentBook!.id
					)) as string) || '';
				const catalog = (JSON.parse(res) as any as string[]) || [];
				if (isNotUtf8) {
					text = await fsp.readFile(this.currentBook!.path, 'binary');
					if (!catalog.length) {
						text = iconv.decode(text, 'gbk');
					}
				} else {
					text = await fsp.readFile(this.currentBook!.path, 'utf8');
				}

				const book = this.parseBook(
					text,
					isNotUtf8 ? 'gbk' : 'utf8',
					catalog,
					fontSize
				);
				const changed = false;
				return { book, changed };
			});
	}

	async loadEpub() {
		if (!this.currentBook) {
			this.currentBook = JSON.parse(
				window.sessionStorage.getItem('currentBook')!
			);
		}
		if (!this.currentBook?.path.toLocaleLowerCase().endsWith('.epub')) {
			throw new Error('not epub');
		}
		const epubBook = new Book(this.currentBook.path);
		const book = new EpubDetail(epubBook, this.currentBook, this.sql);
		return book;
	}
	private parseBook(
		text: string,
		encoding: 'gbk' | 'utf8',
		catalogLoc: string[],
		fontSize: number
	) {
		const book = new TextDetail(
			this.currentBook!,
			this.sql,
			encoding,
			!!catalogLoc.length,
			fontSize
		);
		const lines = text.split('\n');
		let lineNum = 0;
		let continuousBlankLine = 0;
		const paraDict: number[] = [];
		const isDecoded = encoding === 'utf8' || catalogLoc.length < 1;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			let len = line.length;
			if (len) {
				if (line === '\r') {
					continue;
				}
				paraDict.push(lineNum);
				continuousBlankLine = 0;
				const words = [] as TextLine[];
				const arr = splitWords(
					line,
					lettersOfEachLine() * (isDecoded ? 1 : 2)
				);
				for (let i = 0; i < arr.length; i++) {
					const item = arr[i];
					words.push({
						index: lineNum++,
						content: `${item}`,
						className: ['text-line'],
						isDecoded,
						paraIndex: paraDict.length - 1
					});
				}
				book.addContent(words);
			}
			++continuousBlankLine;
			if (continuousBlankLine === 2) {
				continue;
			}
			book.addContent({
				index: lineNum++,
				content: '',
				className: ['text-br'],
				isDecoded: encoding === 'utf8',
				paraIndex: -1
			});
		}
		paraDict.push(lineNum);
		book.setParaDict(paraDict);
		book.parseCachedCatalog(catalogLoc || []);
		if (!catalogLoc.length && encoding === 'utf8') {
			book.cacheCatalog();
		}
		return book;
	}

	private isNotUtf8(str: string) {
		if (str.includes('�')) {
			return true;
		}
		return false;
	}

	async addNewPack(
		data:
			| { path: string; cover?: string | undefined; title: string }
			| { path: string; cover?: string | undefined; title: string }[],
		duplicate: boolean
	) {
		if (!Array.isArray(data)) {
			if (!data.path || !data.title || !isText(data.path)) {
				return;
			}
			let newPack = {
				path: data.path,
				title: data.title,
				stared: 0 as 0
			};
			await this.sql.insertPack(newPack, duplicate);
			window.sessionStorage.setItem(data.path, 'true');
			this.switchMode(Mode.Init);
			this.refresh();
			return true;
		}
		let result = [] as string[];
		let successCount = 0;
		let success = [] as Promise<any>[];
		const __dirname = path.resolve();
		const removePattern = JSON.parse(
			fs.readFileSync(
				path.resolve(__dirname, './appConfig/uselessWord.json')
			)
		) as string[];
		for (const [i, e] of data.entries()) {
			if (!e.path || !e.title || !isText(e.path)) {
				return;
			}
			//NOTE 正式发布时删除
			let title = e.title;
			if (e.path.endsWith('.epub')) {
				title = await getEpubTitle(e.path);
			}
			let newPack = {
				path: e.path,
				title: deleteUselessWords(title, ...removePattern),
				stared: 0 as 0
			};
			success.push(
				this.sql.insertPack(newPack, false).then((res) => {
					if (!res) {
						result.push(`${e.title}:::重复`);
					} else {
						window.sessionStorage.setItem(e.path, 'true');
						successCount++;
					}

					if (i === data.length - 1 && successCount) {
						this.switchMode(Mode.Init);
					}
				})
			);
		}
		return Promise.all(success).then(() => {
			if (successCount) {
				result.unshift(`${successCount}个文件:::成功`);
			}
			this.refresh();
			return result;
		});
	}

	async addNewDir(dirName: string) {
		if (this.dirMap.valueSeq().find((v) => v.title === dirName)) {
			return -1;
		}
		let newDirectory = {
			dir_title: dirName
		};
		let res = await this.sql.insertDir(newDirectory);
		if (res) {
			this.dirMap = Map(await this.sql.mapDir());
			this.switchMode(Mode.Init);
			return res;
		}
		return -1;
	}
	removePack(pack: MetaBook) {
		if (pack.parent) {
			this.removeFileFromDir(pack.id, pack.parent);
		}
		this.deletePack(pack.id);
		this.currentPacks = this.currentPacks.filter((e) => e.id !== pack.id);
		this.starModel.remove(pack.id);
		this.bookmarkModel.remove(pack.id);
		this.fileCache.data = this.fileCache.data.filter(
			(e) => e.id !== pack.id
		);
		this.searchCache.res = this.searchCache.res.filter(
			(e) => e.id !== pack.id
		);
		this.refresh();
	}
	override removeFileFromDir(packId: number, dirId: number) {
		this.sql.updateDir(dirId, packId, 0).then(() => {
			this.dirMap.get(dirId.toString())!.count--;
			this.currentPacks = this.currentPacks.filter(
				(v) => v.id !== packId
			);
			this.refresh();
		});
		this.switchMode(Mode.Init);
	}
	packWillOpen() {
		return this.currentBook;
	}
	mountBook(book: MetaBook) {
		window.sessionStorage.setItem('currentBook', JSON.stringify(book));
		this.titleWillUpdate(book.title);
		this.currentBook = book;
	}
}
