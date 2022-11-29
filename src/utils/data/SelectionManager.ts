/* eslint-disable no-unused-vars */
import { SetStateAction } from 'react';
import { lineHeight } from '../../types/constant';
import { GroupSelection, LineSelection, MarkAnchor } from '../../types/global';
import { formatDate, selectionContains } from '../functions/functions';
import { TextDetail } from './TextDetail';
const ensurePositive = (num: number | string) => {
	if (typeof num === 'string') {
		return num;
	}
	return num < 0 ? 0 : num;
};
export class SelectionManager {
	private lineNumberToLineLocation(lineNumber: number, offset: number) {
		const line = this.book.getLine(lineNumber);
		let res = `${line.paraIndex};`;
	}
	private currentSelection: GroupSelection = {
		anchorIndex: -1,
		focusIndex: -1,
		anchorOffset: -1,
		focusOffset: -1,
		timestamp: '',
		comment: ''
	};
	private floatMenuControl = (...args: any[]) => {};
	private selections: Readonly<GroupSelection>[] = [];
	private mousePosition: { x: number | string; y: number | string } = {
		x: -1,
		y: -1
	};
	private book: TextDetail;
	constructor(book: TextDetail) {
		this.book = book;
	}
	registerFloatMenu(setState: {
		(
			value: SetStateAction<{ x: number | string; y: number | string }>
		): void;
		(...args: any[]): void;
	}) {
		this.floatMenuControl = setState;
	}
	removeAllRange() {
		window.getSelection()?.removeAllRanges();
		this.showFloatMenu(false);
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
			return !res;
		}
		this.mousePosition.y =
			lineHeight * this.currentSelection.anchorIndex - 10;

		for (let i = anchorIndex; i <= focusIndex; i++) {
			if (!this.book.getLine(i).className.includes('text-br')) {
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
				(this.book.getLine(this.currentSelection.anchorIndex).content
					.length -
					this.currentSelection.anchorOffset) *
				0.1
			}em)`;
		}
		return !res;
	}
	// 保存鼠标位置
	setMousePosition(x: number | string, y: number | string) {
		this.mousePosition = {
			x: ensurePositive(x),
			y: ensurePositive(y)
		};
	}
	convertToGroupedSelections(lineSelection: LineSelection) {
		this.currentSelection = {
			...this.selections.find((selection) => {
				return selection.anchorIndex === lineSelection.index;
			})!
		};
		console.log(this.currentSelection);
	}

	getCurrentSelection() {
		return this.currentSelection;
	}
	getComment() {
		return this.currentSelection.comment;
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
			const isBlank = this.book.getLine(i).className.includes('text-br');
			if (i === anchorIndex) {
				arr.push({
					index: i,
					offset: anchorOffset,
					length: this.book.getLine(i).content.length - anchorOffset,
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
					length: this.book.getLine(i).content.length,
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
		this.currentSelection = { ...this.currentSelection };
		this.currentSelection.timestamp = formatDate(new Date());
		this.selections.push({ ...this.currentSelection });
		await this.book.sql.insertMark(this.book.id, this.currentSelection);
		this.clearSelection();
		return this.dividedSelection(this.selections.length - 1);
	}
	async addComment(
		id: number,
		comment: string,
		selection: { anchorIndex: number; anchorOffset: number }
	) {
		const e = this.selections.find((ele) => {
			return (
				ele.anchorIndex === selection.anchorIndex &&
				ele.anchorOffset === selection.anchorOffset
			);
		}) as GroupSelection;
		e.comment = comment;
		return this.book.sql.updateComment(id, comment, selection);
	}
	async removeMark(logicLine: LineSelection) {
		const arr = [] as GroupSelection[];
		for (const selection of this.selections) {
			if (
				selection.anchorIndex === logicLine.index &&
				selection.anchorOffset === logicLine.offset
			) {
				await this.book.sql
					.removeMark(this.book.id, selection)
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
		this.selections = await this.book.sql.getMarks(this.book.id);
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
					this.book
						.getLine(selection.anchorIndex)
						.content.slice(
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
					this.book
						.getLine(selection.anchorIndex)
						.content.slice(
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
}
