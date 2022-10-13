import { SPACE_CODE } from '../types/constant';
import { TextLine } from '../types/global';
import { BookDetail } from './book';
import { mysqlOperator } from './mysqlOperator';
const fs = window.require('fs/promises');
const splitWords = (str: string, len: number) => {
	let strLen = str.length;
	let result: string[] = [];
	for (let i = 0; i < strLen; i += len) {
		result.push(str.slice(i, i + len));
	}
	return result;
};

// eslint-disable-next-line no-unused-vars
const DOUBLE_SPACE = SPACE_CODE + SPACE_CODE;
export class ReaderOperator {
	private static instance: ReaderOperator;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private constructor() {}
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

	async loadText(textPath: string) {
		const text = await fs.readFile(textPath, 'utf-8');
		let title = textPath.replaceAll('\\', '/').split('/').pop()!;
		return this.parseBook(text, title);
	}
	private parseBook(text: string, title: string) {
		const book = new BookDetail(title);
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
							content: `<p class="text-line">${item}</p>`
						};
					})
				);
			}
			book.addContent({
				index: lineNum++,
				content: '<p class="text-br"></p>'
			});
		}
		return book;
	}
	public load() {
		mysqlOperator.checkConnection('book');
	}
}

export const readerOperator = ReaderOperator.getInstance();
