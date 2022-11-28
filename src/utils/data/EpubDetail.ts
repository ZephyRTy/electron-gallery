import { Book, Rendition } from 'epubjs';
import { EpubMark, MetaBook } from '../../types/global';
import { formatDate } from '../functions/functions';
import { SqliteOperatorForBook } from '../request/sqliteOperator';
import { commentVisStore, percentageStore, tocStore } from '../store';
function viewportToPixels(value) {
	let parts = value.match(/([0-9\.]+)(vh|vw)/);
	let q = Number(parts[1]);
	let side =
		window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
	return side * (q / 100);
}
export class EpubDetail {
	private rendition: Rendition | null = null;
	private book: Book | null = null;
	private metaBook: MetaBook;
	private sqlOperator: SqliteOperatorForBook;
	private marks: EpubMark[] = [];
	private setItems = tocStore.createController();
	private showComment = commentVisStore.createController();
	private setPercentage = percentageStore.createController();
	constructor(
		book: Book,
		meta: MetaBook,
		sqlOperator: SqliteOperatorForBook
	) {
		this.metaBook = meta;
		this.book = book;
		this.sqlOperator = sqlOperator;
	}

	renderTo(elementId: string) {
		this.rendition = this.book!.renderTo(elementId, {
			width: 800,
			height: viewportToPixels('96vh'),
			manager: 'continuous',
			flow: 'paginated'
		});
		this.rendition.on('relocated', (loc) => {
			let percent =
				this.book?.locations.percentageFromCfi(loc.start.cfi!) || 0;
			percent = Math.round(percent * 1000);
			this.setPercentage(percent);
		});
		this.rendition.hooks.render.register((content) => {
			if (content.document?.body) {
				content.document.onwheel = async (e) => {
					if (e.deltaY > 0) {
						await this.rendition!.next();
					} else {
						await this.rendition!.prev();
					}
				};
			}
			content.window?.addEventListener('unload', () => {
				if (content.document) {
					content.document.onwheel = null;
				}
			});
		});
		this.rendition.on('selected', (cfiRange, contents) => {
			this.highlightMark(cfiRange, 'yellow');
			this.addMark(cfiRange);
			contents.window.getSelection().removeAllRanges();
		});
		return this.rendition;
	}

	destroy() {
		this.rendition?.destroy();
	}

	get navigation() {
		return this.book?.navigation;
	}

	get location() {
		return this.rendition?.currentLocation();
	}

	getMeta() {
		return this.metaBook;
	}
	addMark(cfi: string) {
		const timestamp = formatDate(new Date());
		this.sqlOperator.insertEpubMark(this.metaBook.id, cfi, timestamp);
		const { startContainer, startOffset, endOffset } =
			this.rendition!.getRange(cfi);
		this.marks.push({
			cfi,
			timestamp,
			data:
				startContainer.textContent!.slice(startOffset, endOffset) || '',
			comment: ''
		});
		this.setItems!([...this.marks]);
	}
	async removeMark(cfi: string) {
		this.marks = this.marks.filter((e) => e.cfi !== cfi);
		this.rendition!.annotations.remove(cfi, 'highlight');
		this.setItems!(this.marks);
		return await this.sqlOperator.removeEpubMark(this.metaBook.id, cfi);
	}
	async initMarks() {
		const arr = await this.sqlOperator.getEpubMarks(this.metaBook.id);
		const res = [] as EpubMark[];
		for (let e of arr) {
			const { startContainer, startOffset, endOffset } =
				await this.book!.getRange(e.cfi);
			res.push({
				...e,
				data:
					startContainer.textContent?.slice(startOffset, endOffset) ||
					''
			});
		}
		this.marks = res;
		return this.marks;
	}

	private highlightMark(cfi: string, fill: string) {
		this.rendition!.annotations.highlight(
			cfi,
			{
				name: fill
			},
			() => {
				this.removeMark(cfi);
				//this.showComment!(true);
			},
			'epubjs-hl',
			{
				fill: fill,
				'fill-opacity': '0.3',
				'mix-blend-mode': 'multiply'
			}
		);
	}
	highlightAllMarks() {
		for (let i of this.marks) {
			this.highlightMark(i.cfi, 'yellow');
		}
	}

	async jumpTo(cfi: string) {
		return await this.rendition?.display(cfi);
	}

	getPercentage() {
		return this.book!.locations.percentageFromCfi(
			this.rendition?.location.start.cfi!
		);
	}

	getBook() {
		return this.book;
	}
}
