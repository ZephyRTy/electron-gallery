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
	get start() {
		return this.contentSize.start;
	}

	get length() {
		return this.content.length;
	}

	get reg() {
		return this.book.reg;
	}
}
