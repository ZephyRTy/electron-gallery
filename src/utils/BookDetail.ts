import { Book, Chapter, TextLine } from '../types/global';
import { mysqlOperator } from './mysqlOperator';

export class BookDetail {
	private book: Book;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private catalog: Chapter[] = [];
	private currentChapter = 0;
	regExp: RegExp;
	constructor(book: Book) {
		this.book = book;
		this.regExp = new RegExp(String.raw`${book.reg}`, 'g');
	}

	public addChapter(chapter: Chapter) {
		this.catalog.push(chapter);
	}
	public getContent(start: number, end: number): string[] {
		this.contentSize = { start, end };
		return this.content.slice(start, end).map((line) => {
			return `<p ${
				line.className.length > 0
					? 'class=' + '"' + line.className.join(' ') + '"'
					: ''
			}>${line.content} </p>`;
		});
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
			if (!line.className.includes('chapter-title')) {
				line.className.push('chapter-title');
			}
			this.addChapter({
				title,
				index: line.index
			});
		} else {
			line.className = line.className.filter(
				(className) => className !== 'chapter-title'
			);
		}
	}

	updateCurrentChapter(
		lineIndex: number,
		method: 'scroll' | 'drag' = 'scroll',
		direction: 'up' | 'down' = 'down'
	) {
		let chapter = this.currentChapter;
		if (this.currentChapter >= this.catalog.length) {
			return -1;
		}
		if (method === 'drag') {
			let num =
				this.getChapter(chapter).index < lineIndex
					? this.currentChapter
					: 0;
			for (let i = num; i < this.catalog.length; i++) {
				if (this.catalog[i].index > lineIndex) {
					break;
				}
				chapter = i;
			}
		} else if (direction === 'down') {
			if (this.currentChapter < this.catalog.length - 1) {
				if (
					this.getChapter(this.currentChapter + 1).index <= lineIndex
				) {
					chapter = this.currentChapter + 1;
				}
			}
		} else if (direction === 'up') {
			if (this.currentChapter > 0) {
				if (this.getChapter(this.currentChapter).index > lineIndex) {
					chapter = this.currentChapter - 1;
				}
			}
		}
		return chapter;
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
					tempRes = [];
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

	getChapter(index: number) {
		return this.catalog[index];
	}
}
