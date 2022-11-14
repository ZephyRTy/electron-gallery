/* eslint-disable camelcase */
import { Map } from 'immutable';
import { SPACE_CODE } from '../../types/constant';
import {
	Book,
	BookDirectory,
	BookmarkOfBook,
	Mode,
	TextLine
} from '../../types/global';
import { deleteUselessWords } from '../functions/functions';
import { sqliteOperator } from '../request/sqliteOperator';
import { DataOperator } from './DataOperator';
import { TextDetail } from './TextDetail';
const fs = window.require('fs/promises');
const iconv = window.require('iconv-lite');
const path = window.require('path');
iconv.skipDecodeWarning = true;
const splitWords = (str: string, len: number) => {
	let strLen = str.length;
	let result: string[] = [];
	for (let i = 0; i < strLen; i += len) {
		result.push(str.slice(i, i + len));
	}
	return result;
};
export const isText = (file: string) => file.endsWith('.txt');
// eslint-disable-next-line no-unused-vars
const DOUBLE_SPACE = SPACE_CODE + SPACE_CODE;

export class ReaderOperator extends DataOperator<
	Book,
	BookmarkOfBook,
	BookDirectory
> {
	private static instance: ReaderOperator;
	protected override sql = sqliteOperator;
	private currentBook: Book | null = null;
	private constructor() {
		super({ database: 'book', tableName: 'book_list' }, sqliteOperator);
	}
	public static getInstance(): ReaderOperator {
		if (!ReaderOperator.instance) {
			ReaderOperator.instance = new ReaderOperator();
		}
		return ReaderOperator.instance;
	}
	private lettersOfEachLine = 55;
	formatContent(content: string): string {
		let result = content.replace(/\n/g, '<br/>');
		return result;
	}

	async loadText() {
		if (!this.currentBook) {
			this.currentBook = JSON.parse(
				window.sessionStorage.getItem('currentBook')!
			);
		}
		let text = await fs.readFile(this.currentBook!.path, 'utf-8');
		if (this.isNotUtf8(text)) {
			text = this.gbkToUtf8(
				await fs.readFile(this.currentBook!.path, 'binary')
			);
		}
		const book = this.parseBook(text);
		const changed = !(await book.verify(text));
		return { book, changed };
	}
	private parseBook(text: string) {
		const book = new TextDetail(this.currentBook!, this.sql);
		const lines = text.split('\n');
		let lineNum = 0;
		let paragraphIndex = 0;
		let continuousBlankLine = 0;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].replace(/^\s+/g, DOUBLE_SPACE);
			let len = line.length;
			if (len && line !== DOUBLE_SPACE) {
				continuousBlankLine = 0;
				const words = [] as TextLine[];
				const arr = splitWords(line, this.lettersOfEachLine);
				for (let i = 0; i < arr.length; i++) {
					const item = arr[i];
					words.push({
						index: lineNum++,
						content: `${item}`,
						className: ['text-line'],
						paragraphIndex:
							item.length < this.lettersOfEachLine
								? paragraphIndex
								: paragraphIndex++,
						parent: book
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
				paragraphIndex: -1,
				parent: book
			});
		}
		return book;
	}

	private isNotUtf8(str: string) {
		if (str.includes('�')) {
			return true;
		}
		return false;
	}

	private gbkToUtf8(str: string) {
		return iconv.decode(str, 'gbk');
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
			this.switchMode(Mode.Init);
			this.refresh();
			return true;
		}
		let result = [] as string[];
		let successCount = 0;
		let success = [] as Promise<any>[];
		data.forEach((e, i) => {
			if (!e.path || !e.title || !isText(e.path)) {
				return;
			}
			//NOTE 正式发布时删除
			const novelPath = path.resolve('D:/小说', path.basename(e.path));
			if (path.dirname(e.path).replaceAll('\\', '/') !== 'D:/小说') {
				fs.renameSync(e.path, novelPath);
				e.path = novelPath;
			}
			let newPack = {
				path: e.path,
				title: deleteUselessWords(
					e.title,
					'soushu2022.com@',
					'[搜书吧]',
					'-soushu2022.com-[搜书吧网址]',
					'-soushu555.org-[搜书吧网址]',
					'.txt'
				),
				stared: 0 as 0
			};
			success.push(
				this.sql.insertPack(newPack, false).then((res) => {
					if (!res) {
						result.push(`${e.title}:::重复`);
					} else {
						successCount++;
					}

					if (i === data.length - 1 && successCount) {
						this.switchMode(Mode.Init);
					}
				})
			);
		});
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

	packWillOpen() {
		return this.currentBook;
	}
	mountBook(book: Book) {
		window.sessionStorage.setItem('currentBook', JSON.stringify(book));
		this.titleWillUpdate(book.title);
		this.currentBook = book;
	}

	getProgress(id: number) {
		return this.bookmarkModel.data.find((v) => v.id === id)?.url;
	}
}
