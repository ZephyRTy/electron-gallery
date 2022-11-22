/* eslint-disable no-unused-vars */
import { SetStateAction } from 'react';
import { lineHeight } from '../../types/constant';
import { GroupSelection, LineSelection } from '../../types/global';
import { selectionContains } from '../functions/functions';
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
	confirmAndFixSelection(book: TextDetail) {
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
			if (!book.getLine(i).className.includes('text-br')) {
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
				(book.getLine(this.currentSelection.anchorIndex).content
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
}
