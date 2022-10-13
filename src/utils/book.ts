import { CATALOG_REG } from '../types/constant';
import { Chapter, TextLine } from '../types/global';

export class BookDetail {
	private title: string;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private catalog: Chapter[] = [];
	constructor(title: string) {
		this.title = title;
	}

	public addChapter(chapter: Chapter) {
		this.catalog.push(chapter);
	}
	public getContent(start: number, end: number): TextLine[] {
		this.contentSize = { start, end };
		console.log(this.content.slice(start, end));
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

	parseCatalog(line: TextLine) {
		let title = line.content.match(CATALOG_REG)?.[0];
		if (title) {
			this.addChapter({
				title,
				index: line.index
			});
		}
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
}
