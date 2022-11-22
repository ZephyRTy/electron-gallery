/* eslint-disable no-unused-vars */
import {
	Chapter,
	GroupSelection,
	MetaBook,
	TextLine
} from '../../types/global';
import { SqliteOperatorForBook } from '../request/sqliteOperator';
import { catalogCache } from './indexDB';
import { SelectionManager } from './SelectionManager';
const iconv = window.require('iconv-lite');
const ensurePositive = (num: number | string) => {
	if (typeof num === 'string') {
		return num;
	}
	return num < 0 ? 0 : num;
};

export class TextDetail {
	private metaBook: MetaBook;
	private lettersOfEachLine = 55;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private catalog: Chapter[] = [];
	private currentChapter = 0;
	private encoding: 'gbk' | 'utf8';
	private sqlOperator: SqliteOperatorForBook;
	// eslint-disable-next-line no-unused-vars
	private floatMenuControl = (...args: any[]) => {};
	private catalogIsCached = false;
	readonly selectionManager = new SelectionManager(this);
	private currentSelection: GroupSelection = {
		anchorIndex: -1,
		focusIndex: -1,
		anchorOffset: -1,
		focusOffset: -1,
		timestamp: '',
		comment: ''
	};
	private selections: Readonly<GroupSelection>[] = [];
	private mousePosition: { x: number | string; y: number | string } = {
		x: -1,
		y: -1
	};
	private paraDict: number[] = [];
	regExp: RegExp;

	constructor(
		book: MetaBook,
		sqlOperator: SqliteOperatorForBook,
		encoding: 'gbk' | 'utf8',
		hasCatalogCached: boolean
	) {
		this.metaBook = book;
		this.regExp = new RegExp(String.raw`${book.reg}`, 'g');
		this.sqlOperator = sqlOperator;
		this.encoding = encoding;
		this.catalogIsCached = hasCatalogCached;
	}

	public cacheCatalog() {
		catalogCache.setCachedCatalog(
			this.id,
			JSON.stringify(this.catalog.map((item) => item.index))
		);
	}
	public addChapter(chapter: Chapter) {
		this.catalog.push(chapter);
	}
	public getContent(start: number, end: number): TextLine[] {
		this.contentSize = { start, end };
		const res = this.content.slice(start, end);
		for (let i = 0; i < res.length; i++) {
			const line = res[i];
			if (
				line.className.includes('chapter-title') ||
				line.className.includes('text-br')
			) {
				continue;
			}
			if (!line.isDecoded) {
				// line.content = this.binaryToGBK(line.content).replaceAll(
				// 	'\x00',
				// 	''
				// );
				// line.isDecoded = true;
				this.decodeParagraph(line.index);
			}
		}
		return res;
	}

	public addContent(content: TextLine[] | TextLine) {
		if (Array.isArray(content)) {
			for (let i = 0; i < content.length; i++) {
				if (this.encoding === 'utf8' && !this.catalogIsCached) {
					this.parseCatalog(content[i]);
				}
				this.content.push(content[i]);
			}
		} else {
			if (this.encoding === 'utf8' && !this.catalogIsCached) {
				this.parseCatalog(content);
			}
			this.content.push(content);
		}
	}

	parseCachedCatalog(catalog: number[]) {
		for (let i of catalog) {
			const item = this.decodeLine(i);
			this.parseCatalog(item);
		}
	}
	private parseCatalog(line: TextLine) {
		let title = this.decodeLine(line).content.match(this.regExp)?.[0];
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
	/**
	 *
	 * @param text
	 * @returns 与数据库中的md5值相同则返回true，否则返回false
	 */
	// async verify(text: string) {
	// 	if (window.sessionStorage.getItem(this.id.toString())) {
	// 		return true;
	// 	}
	// 	const md5 = generateTextMd5(text);
	// 	window.sessionStorage.setItem(this.metaBook.id.toString(), 'true');
	// 	if (await this.sqlOperator.verifyBook(this.id, md5)) {
	// 		return true;
	// 	} else {
	// 		await this.sqlOperator.updateMd5(this.id, md5);
	// 		return false;
	// 	}
	// }
	private binaryToGBK(str: string) {
		return iconv.decode(str, 'gbk');
	}
	async clearMarkInfo() {
		await this.sqlOperator.clearMarkInfo(this.id);
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

	private decodeLine(index: number);
	private decodeLine(index: TextLine);
	private decodeLine(index: TextLine | number): TextLine {
		let line: TextLine;
		if (typeof index === 'number') {
			{
				line = this.content[index];
			}
		} else {
			line = index;
		}
		if (line.isDecoded) {
			return line;
		}
		if (line.className.includes('text-br')) {
			return line;
		}
		line.content = this.binaryToGBK(line.content).replaceAll('\x00', '');
		line.isDecoded = true;
		return line;
	}

	private decodeParagraph(lineIndex: number) {
		let paraLineIndex = 0;
		let nextParaIndex = 0;
		for (let i = 0; i < this.paraDict.length - 1; i++) {
			if (
				this.paraDict[i + 1] > lineIndex &&
				this.paraDict[i] <= lineIndex
			) {
				paraLineIndex = this.paraDict[i];
				nextParaIndex = this.paraDict[i + 1];
				break;
			}
		}
		let text = '';

		for (let i = paraLineIndex; i < nextParaIndex; i++) {
			if (this.content[i].className.includes('chapter-title')) {
				console.log(this.content[i]);
			}
			text += this.content[i].content;
		}
		const decodedContent = this.binaryToGBK(text);
		let len = 0;
		for (let i = paraLineIndex; i < nextParaIndex; i++) {
			this.content[i].isDecoded = true;
			if (len >= decodedContent.length) {
				this.content[i].content = '';
				this.content[i].className.push('text-br');
			} else {
				this.content[i].content = decodedContent.slice(
					len,
					len + this.lettersOfEachLine
				);
				len += this.lettersOfEachLine;
			}
		}
	}
	reParseCatalog(reg: string) {
		this.metaBook.reg = reg;
		this.regExp = new RegExp(String.raw`${reg}`, 'g');
		this.catalog = [];
		for (let i = 0; i < this.content.length; i++) {
			this.parseCatalog(this.content[i]);
		}
		this.cacheCatalog();
		this.sqlOperator.updateReg(this.metaBook.id, reg);
	}

	initGBKCatalog() {
		if (this.encoding === 'utf8' || this.catalogIsCached) {
			return;
		}
		for (let i = 0; i < this.content.length; i++) {
			this.decodeLine(i);
			this.parseCatalog(this.content[i]);
		}
		this.cacheCatalog();
	}
	getCatalog() {
		catalogCache.setCachedCatalog(
			this.id,
			JSON.stringify(this.catalog.map((e) => e.index))
		);
		return this.catalog;
	}

	find(key: string) {
		let result = [] as {
			index: number;
			offset: number;
			length: number;
			isBlank: boolean;
		}[][];
		let offsetInKey = 0;
		let tempRes = [] as {
			index: number;
			offset: number;
			length: number;
			isBlank: boolean;
		}[];
		for (let i = 0; i < this.content.length; i++) {
			let content = this.content[i].content;
			const res = {
				index: i,
				offset: -1,
				length: 0,
				offsetInKey,
				isBlank: false
			};
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
		return this.metaBook.reg;
	}

	get path() {
		return this.metaBook.path;
	}

	get id() {
		return this.metaBook.id;
	}

	get meta() {
		return this.metaBook;
	}

	get sql() {
		return this.sqlOperator;
	}
	getParaDict() {
		return this.paraDict;
	}
	setParaDict(paraDict: number[]) {
		this.paraDict = paraDict;
	}
	getLine(lineNum: number) {
		return this.content[lineNum];
	}

	getChapter(index: number) {
		return this.catalog[index];
	}
}
