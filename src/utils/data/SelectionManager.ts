/* eslint-disable no-unused-vars */
import { SetStateAction } from 'react';
import { lettersOfEachLine, lineHeight } from '../../types/constant';
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
	private width = 900;
	private book: TextDetail;
	constructor(book: TextDetail) {
		this.book = book;
	}

	static lineNumberToLocation(
		lineNumber: number,
		offset: number,
		book: TextDetail
	) {
		const line = book.getLine(lineNumber);
		if (line.paraIndex === -1) {
			let count = line.index;
			while (
				book.getLine(count).paraIndex === -1 &&
				count < book.length
			) {
				++count;
			}
			return `${book.getLine(count).paraIndex};0`;
		}
		let res = `${line.paraIndex};`;
		let paraOffset =
			(line.index - book.findParaStart(line.paraIndex)) *
				lettersOfEachLine() +
			offset;
		return res + paraOffset;
	}

	static locationToLineNumber(lineLocation: string, book: TextDetail) {
		const [para, offset] = lineLocation.split(';').map((e) => Number(e));
		const paraStart = book.findParaStart(para);
		const lineNum = paraStart + Math.floor(offset / lettersOfEachLine());
		const offsetInLine = offset % lettersOfEachLine();
		return { lineNum, offsetInLine };
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
		return this;
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
		await this.book.sql.insertMark(this.book.id, {
			startLocation: SelectionManager.lineNumberToLocation(
				anchorIndex,
				anchorOffset,
				this.book
			),
			endLocation: SelectionManager.lineNumberToLocation(
				focusIndex,
				focusOffset,
				this.book
			),
			comment: this.currentSelection.comment,
			timestamp: this.currentSelection.timestamp
		});
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
		return this.book.sql.updateComment(
			id,
			comment,
			SelectionManager.lineNumberToLocation(
				selection.anchorIndex,
				selection.anchorOffset,
				this.book
			)
		);
	}

	async removeMark(logicLine: LineSelection) {
		const arr = [] as GroupSelection[];
		for (const selection of this.selections) {
			if (
				selection.anchorIndex === logicLine.index &&
				selection.anchorOffset === logicLine.offset
			) {
				await this.book.sql
					.removeMark(
						this.book.id,
						SelectionManager.lineNumberToLocation(
							selection.anchorIndex,
							selection.anchorOffset,
							this.book
						)
					)
					.catch((e) => {
						console.log(this.selections);
						console.log(logicLine);
					});
			} else {
				arr.push(selection);
			}
		}
		this.selections = arr;
	}

	async initMarks() {
		const arr = await this.book.sql.getMarks(this.book.id);
		if (arr.length === 0) return [];
		this.selections = arr.map((e) => {
			const start = SelectionManager.locationToLineNumber(
				e.startLocation,
				this.book
			);
			const end = SelectionManager.locationToLineNumber(
				e.endLocation,
				this.book
			);

			return {
				anchorIndex: start.lineNum,
				anchorOffset: start.offsetInLine,
				focusIndex: end.lineNum,
				focusOffset: end.offsetInLine,
				comment: e.comment,
				timestamp: e.timestamp
			};
		});
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
			const { anchorIndex, anchorOffset, focusIndex, focusOffset } =
				selection;
			let content = '';
			if (anchorIndex === focusIndex) {
				content =
					this.book
						.getLine(anchorIndex)
						.content.slice(
							anchorOffset,
							Math.min(focusOffset, anchorOffset + maxLength)
						) +
					(focusOffset - anchorOffset > maxLength ? '...' : '');
			} else {
				let str = '';

				if (focusIndex === anchorIndex + 1) {
					str = this.book
						.getLine(focusIndex)
						.content.slice(0, Math.min(focusOffset, maxLength));
				} else {
					str = this.book
						.getLine(focusIndex)
						.content.slice(0, maxLength - anchorOffset);
				}
				content =
					this.book
						.getLine(selection.anchorIndex)
						.content.slice(
							selection.anchorOffset,
							selection.anchorOffset + maxLength
						) +
					str +
					'...';
			}
			const anchor = {
				anchorIndex: selection.anchorIndex,
				content,
				timestamp: selection.timestamp
			};
			arr.push(anchor);
		}
		return arr;
	}
}
