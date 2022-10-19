/* eslint-disable camelcase */
import { Map } from 'immutable';
import { SPACE_CODE } from '../types/constant';
import { Book, BookDirectory, BookmarkOfBook, Mode } from '../types/global';
import { BookDetail } from './BookDetail';
import { FileOperator } from './fileOperator';
import { deleteUselessWords } from './functions';
import { mysqlOperator } from './mysqlOperator';
const fs = window.require('fs/promises');
const iconv = window.require('iconv-lite');
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

export class ReaderOperator extends FileOperator<
	Book,
	BookmarkOfBook,
	BookDirectory
> {
	private static instance: ReaderOperator;
	private currentBook: Book | null = null;
	private constructor() {
		super({ database: 'book', tableName: 'book_list' });
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
		let text = await fs.readFile(this.currentBook!.path, 'utf-8');
		if (this.isNotUtf8(text)) {
			text = this.gbkToUtf8(
				await fs.readFile(this.currentBook!.path, 'binary')
			);
		}
		return this.parseBook(text);
	}
	private parseBook(text: string) {
		const book = new BookDetail(this.currentBook!);
		const lines = text.split('\n');
		let lineNum = 0;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].replace(/^\s+/g, DOUBLE_SPACE);
			let len = line.length;
			if (len) {
				book.addContent(
					splitWords(line, this.lettersOfEachLine).map((item) => {
						return {
							index: lineNum++,
							content: `${item}`,
							tag: ['<p class="text-line">', '</p>']
						};
					})
				);
			}
			book.addContent({
				index: lineNum++,
				content: '',
				tag: ['<p class="text-br">', '</p>']
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
			await mysqlOperator.insertPack(newPack, duplicate);
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
				mysqlOperator.insertPack(newPack).then((res) => {
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
		let res = await mysqlOperator.insertDir(newDirectory);
		if (res) {
			this.dirMap = Map(await mysqlOperator.mapDir());
			this.switchMode(Mode.Init);
			return res;
		}
		return -1;
	}

	current() {
		return this.currentBook;
	}
	mountBook(book: Book) {
		this.titleWillUpdate(book.title);
		this.currentBook = book;
	}
}
