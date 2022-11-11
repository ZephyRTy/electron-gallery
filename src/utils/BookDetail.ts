/* eslint-disable no-unused-vars */
import { SetStateAction } from 'react';
import { lineHeight } from '../types/constant';
import {
	Book,
	Chapter,
	LineSelection,
	MarkAnchor,
	SelectionInfo,
	TextLine
} from '../types/global';
import { formatDate, selectionContains } from './functions/functions';
import { SqliteOperator } from './sqliteOperator';
const ensurePositive = (num: number | string) => {
	if (typeof num === 'string') {
		return num;
	}
	return num < 0 ? 0 : num;
};
const round = (n, decimals = 0) =>
	Number(`${Math.round(Number(`${n}e${decimals}`))}e-${decimals}`);
export class BookDetail {
	private book: Book;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private catalog: Chapter[] = [];
	private currentChapter = 0;
	private sqlOperator: SqliteOperator;
	// eslint-disable-next-line no-unused-vars
	private floatMenuControl = (...args: any[]) => {};
	private currentSelection: SelectionInfo = {
		anchorIndex: -1,
		focusIndex: -1,
		anchorOffset: -1,
		focusOffset: -1,
		timestamp: '',
		comment: ''
	};
	private selections: SelectionInfo[] = [];
	private mousePosition: { x: number | string; y: number | string } = {
		x: -1,
		y: -1
	};
	regExp: RegExp;

	constructor(book: Book, sqlOperator: SqliteOperator) {
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
		return this.book.reg;
	}

	get path() {
		return this.book.path;
	}

	get id() {
		return this.book.id;
	}

	getLine(lineNum: number) {
		return this.content[lineNum];
	}

	getChapter(index: number) {
		return this.catalog[index];
	}

	// 保存选中内容的起始行号、偏移和结束行号、偏移
	setSelection(key: keyof typeof this.currentSelection, value: number) {
		if (key !== 'timestamp' && key !== 'comment') {
			this.currentSelection[key] = value;
		}
	}
	/**
	 * 确认选区结果
	 * 修正选中内容的起始行号、偏移和结束行号、偏移，以及鼠标位置
	 */
	confirmAndFixSelection() {
		const { anchorIndex, anchorOffset, focusIndex, focusOffset } =
			this.currentSelection;
		// 确保起始行号小于结束行号
		if (anchorIndex >= focusIndex) {
			if (anchorIndex === focusIndex) {
				this.currentSelection.anchorOffset = Math.min(
					anchorOffset,
					focusOffset
				);
				this.currentSelection.focusOffset = Math.max(
					anchorOffset,
					focusOffset
				);
			} else {
				this.currentSelection.anchorIndex = focusIndex;
				this.currentSelection.anchorOffset = focusOffset;
				this.currentSelection.focusIndex = anchorIndex;
				this.currentSelection.focusOffset = anchorOffset;
			}
		}

		const res = selectionContains(this.selections, this.currentSelection);

		if (res) {
			this.removeAllRange();
			return;
		}
		this.mousePosition.y =
			lineHeight * this.currentSelection.anchorIndex - 10;

		for (let i = anchorIndex; i <= focusIndex; i++) {
			if (!this.getLine(i).className.includes('text-br')) {
				if (i !== anchorIndex) {
					this.currentSelection.anchorIndex = i;
					this.currentSelection.anchorOffset = 0;
					this.mousePosition.y = i * lineHeight;
				}
				break;
			}
		}
		if (typeof this.mousePosition.y === 'number') {
			this.mousePosition.y -= 30;
		}

		if (
			this.currentSelection.anchorIndex ===
			this.currentSelection.focusIndex
		) {
			this.mousePosition.x = `calc(${this.mousePosition.x}px + ${
				(this.currentSelection.focusOffset -
					this.currentSelection.anchorOffset) *
				0.3
			}em)`;
		} else {
			this.mousePosition.x = `calc(${this.mousePosition.x}px + ${
				(this.getLine(this.currentSelection.anchorIndex).content
					.length -
					this.currentSelection.anchorOffset) *
				0.1
			}em)`;
		}
	}
	// 保存鼠标位置
	setMousePosition(x: number | string, y: number | string) {
		this.mousePosition = {
			x: ensurePositive(x),
			y: ensurePositive(y)
		};
	}
	clearSelection() {
		this.currentSelection = {
			anchorIndex: -1,
			focusIndex: -1,
			anchorOffset: -1,
			focusOffset: -1,
			comment: '',
			timestamp: ''
		};
	}
	clearMousePosition() {
		this.mousePosition = { x: -1, y: -1 };
	}

	mark() {
		for (let key in this.currentSelection) {
			if (this.currentSelection[key] === -1) {
				return;
			}
		}
	}
	registerFloatMenu(setState: {
		(
			value: SetStateAction<{ x: number | string; y: number | string }>
		): void;
		(...args: any[]): void;
	}) {
		this.floatMenuControl = setState;
	}

	/**
	 * 基于储存的鼠标位置，显示浮动菜单
	 * @param show 是否显示
	 */
	showFloatMenu(show: boolean) {
		if (!show) {
			this.floatMenuControl({ x: -1, y: -1 });
			return;
		}
		let y = this.mousePosition.y,
			x = this.mousePosition.x;

		if (x !== -1 && x < 50 && typeof x === 'number') {
			x = 71;
		}
		this.floatMenuControl({
			x,
			y
		});
	}

	// 将选区按行分割
	private dividedSelection(index: number): LineSelection[] {
		const arr = [] as LineSelection[];
		const { anchorIndex, anchorOffset, focusIndex, focusOffset } =
			index > 0 ? this.selections[index] : this.selections.at(index)!;
		if (anchorIndex === focusIndex) {
			return [
				{
					index: anchorIndex,
					offset: anchorOffset,
					length: focusOffset - anchorOffset,
					isBlank: false
				}
			];
		}
		for (let i = anchorIndex; i <= focusIndex; ++i) {
			const isBlank = this.getLine(i).className.includes('text-br');
			if (i === anchorIndex) {
				arr.push({
					index: i,
					offset: anchorOffset,
					length: this.getLine(i).content.length - anchorOffset,
					isBlank
				});
			} else if (i === focusIndex) {
				arr.push({
					index: i,
					offset: 0,
					length: focusOffset,
					isBlank
				});
			} else {
				arr.push({
					index: i,
					offset: 0,
					length: this.getLine(i).content.length,
					isBlank
				});
			}
		}
		return arr;
	}

	divideAllSelections(): LineSelection[][] {
		return this.selections.map((selection, index) =>
			this.dividedSelection(index)
		);
	}

	async addMark() {
		const { anchorIndex, focusIndex, anchorOffset, focusOffset } =
			this.currentSelection;
		if (
			this.currentSelection.anchorIndex === -1 ||
			(anchorIndex === focusIndex && anchorOffset === focusOffset)
		) {
			throw new Error('未选中任何内容');
		}
		this.currentSelection.timestamp = formatDate(new Date());
		this.selections.push(this.currentSelection);
		await this.sqlOperator.insertMark(this.id, this.currentSelection);
		this.clearSelection();
		return this.dividedSelection(this.selections.length - 1);
	}

	async removeMark(logicLine: LineSelection) {
		const arr = [] as SelectionInfo[];
		for (const selection of this.selections) {
			if (
				selection.anchorIndex === logicLine.index &&
				selection.anchorOffset === logicLine.offset
			) {
				await this.sqlOperator
					.removeMark(this.id, selection)
					.catch((e) => {
						console.log(this.selections);
						console.log(logicLine);
					})
					.then(() => {
						console.log('删除成功');
					});
			} else {
				arr.push(selection);
			}
		}
		this.selections = arr;
	}

	async initMarks() {
		this.selections = await this.sqlOperator.getMarks(this.id);
		return this.selections;
	}

	getMarks() {
		return this.selections;
	}

	generateMarkAnchor() {
		const maxLength = 19;
		const arr = [] as MarkAnchor[];
		for (let i = 0; i < this.selections.length; ++i) {
			const selection = this.selections[i];
			let content = '';
			if (selection.anchorIndex === selection.focusIndex) {
				content =
					this.getLine(selection.anchorIndex).content.slice(
						selection.anchorOffset,
						Math.min(
							selection.focusOffset,
							selection.anchorOffset + maxLength
						)
					) +
					(selection.focusOffset - selection.anchorOffset > maxLength
						? '...'
						: '');
			} else {
				content =
					this.getLine(selection.anchorIndex).content.slice(
						selection.anchorOffset,
						selection.anchorOffset + maxLength
					) + '...';
			}
			const anchor = {
				anchorIndex: selection.anchorIndex,
				content,
				timestamp: selection.timestamp
			};
			if (content === '...') {
				console.log(selection);
			}
			arr.push(anchor);
		}
		return arr;
	}

	removeAllRange() {
		window.getSelection()?.removeAllRanges();
		this.showFloatMenu(false);
	}
}
