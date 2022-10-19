import { Book, Chapter, TextLine } from '../types/global';
import { mysqlOperator } from './mysqlOperator';

export class BookDetail {
	private book: Book;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private catalog: Chapter[] = [];
	regExp: RegExp;
	constructor(book: Book) {
		this.book = book;
		this.regExp = new RegExp(String.raw`${book.reg}`, 'g');
	}

	public addChapter(chapter: Chapter) {
		this.catalog.push(chapter);
	}
	public getContent(start: number, end: number): TextLine[] {
		this.contentSize = { start, end };
		return this.content.slice(start, end);
	}

	public addContent(content: TextLine[] | TextLine) {
		if (Array.isArray(content)) {
			for (let i = 0; i < content.length; i++) {
				this.parseCatalog(content[i]);
				this.content.push(content[i]);
			}
		} else {
			this.parseCatalog(content);
			this.content.push(content);
		}
	}

	private parseCatalog(line: TextLine) {
		let title = line.content.match(this.regExp)?.[0];
		if (title) {
			this.addChapter({
				title,
				index: line.index
			});
		}
	}

	reParseCatalog(reg: string) {
		this.book.reg = reg;
		this.regExp = new RegExp(String.raw`${reg}`, 'g');
		this.catalog = [];
		for (let i = 0; i < this.content.length; i++) {
			this.parseCatalog(this.content[i]);
		}
		mysqlOperator.updateReg(this.book.id, reg);
	}
	getCatalog() {
		return this.catalog;
	}

	find(key: string) {
		let result = [] as {
			index: number;
			offset: number;
			length: number;
		}[][];
		let offsetInKey = 0;
		let tempRes = [] as { index: number; offset: number; length: number }[];
		for (let i = 0; i < this.content.length; i++) {
			let content = this.content[i].content;
			const res = { index: i, offset: -1, length: 0 };
			for (let j = 0; j < content.length; ++j) {
				if (content[j] === key[offsetInKey]) {
					++offsetInKey;
					res.length++;
					if (res.offset === -1) {
						res.offset = j;
					}
					if (
						j === content.length - 1 ||
						offsetInKey === key.length
					) {
						tempRes.push({ ...res });
						res.length = 0;
						res.offset = -1;
						if (offsetInKey === key.length) {
							offsetInKey = 0;
							result.push(tempRes);
							tempRes = [];
						}
					}
				} else {
					offsetInKey = 0;
					res.offset = -1;
				}
			}
		}
		return result;
	}
	get start() {
		return this.contentSize.start;
	}

	get length() {
		return this.content.length;
	}

	get reg() {
		return this.book.reg;
	}

	get path() {
		return this.book.path;
	}
	contain(lineIndex: number) {
		return (
			lineIndex >= this.contentSize.start &&
			lineIndex < this.contentSize.end
		);
	}
}
