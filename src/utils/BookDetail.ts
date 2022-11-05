/* eslint-disable no-unused-vars */
import { SetStateAction } from 'react';
import { lineHeight } from '../types/constant';
import { Book, Chapter, TextLine } from '../types/global';
import { RequestOperator } from './requestOperator';
const ensurePositive = (num: number) => (num < 0 ? 0 : num);
export class BookDetail {
	private book: Book;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private catalog: Chapter[] = [];
	private currentChapter = 0;
	private sqlOperator: RequestOperator;
	// eslint-disable-next-line no-unused-vars
	private floatMenuControl = (...args: any[]) => {};
	private selection: {
		anchorIndex: number;
		anchorOffset: number;
		focusIndex: number;
		focusOffset: number;
	} = {
		anchorIndex: -1,
		focusIndex: -1,
		anchorOffset: -1,
		focusOffset: -1
	};
	private mousePosition = {
		x: -1,
		y: -1
	};
	regExp: RegExp;
	constructor(book: Book, sqlOperator: RequestOperator) {
		this.book = book;
		this.regExp = new RegExp(String.raw`${book.reg}`, 'g');
		this.sqlOperator = sqlOperator;
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
		this.sqlOperator.updateReg(this.book.id, reg);
	}
	getCatalog() {
		return this.catalog;
	}

	find(key: string) {
		let result = [] as {
			index: number;
			offset: number;
			length: number;
			offsetInKey: number;
		}[][];
		let offsetInKey = 0;
		let tempRes = [] as {
			index: number;
			offset: number;
			length: number;
			offsetInKey: number;
		}[];
		for (let i = 0; i < this.content.length; i++) {
			let content = this.content[i].content;
			const res = { index: i, offset: -1, length: 0, offsetInKey };
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
					res.length = 0;
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

	getLine(lineNum: number) {
		return this.content[lineNum];
	}

	getChapter(index: number) {
		return this.catalog[index];
	}

	// 保存选中内容的起始行号、偏移和结束行号、偏移
	setSelection(key: keyof typeof this.selection, value: number) {
		this.selection[key] = value;
	}
	// 保存鼠标位置
	setMousePosition(x: number, y: number) {
		this.mousePosition = {
			x: ensurePositive(x),
			y: ensurePositive(Math.floor(y / lineHeight) * lineHeight)
		};
	}
	clearSelection() {
		this.selection = {
			anchorIndex: -1,
			focusIndex: -1,
			anchorOffset: -1,
			focusOffset: -1
		};
	}
	clearMousePosition() {
		this.mousePosition = { x: -1, y: -1 };
		this.showFloatMenu();
	}

	mark() {
		for (let key in this.selection) {
			if (this.selection[key] === -1) {
				return;
			}
		}
	}
	registerFloatMenu(setState: {
		(value: SetStateAction<{ x: number; y: number }>): void;
		(...args: any[]): void;
	}) {
		this.floatMenuControl = setState;
	}
	showFloatMenu() {
		if (this.mousePosition.x === -1 && this.mousePosition.y === -1) {
			this.floatMenuControl({ ...this.mousePosition });
			return;
		}
		let y = this.mousePosition.y - 60,
			x = this.mousePosition.x - 20;
		if (y < 0 && y !== -1) {
			y = 40;
		}
		if (x !== -1 && x < 50) {
			x = 51;
		}
		this.floatMenuControl({
			x,
			y
		});
	}
}
