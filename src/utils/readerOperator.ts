import { TextLine } from '../types/global';
const fs = window.require('fs/promises');
const splitWords = (str: string, len: number) => {
	let strLen = str.length;
	let result: string[] = [];
	for (let i = 0; i < strLen; i += len) {
		result.push(str.slice(i, i + len));
	}
	return result;
};
const SPACE_CODE = decodeURIComponent('%E3%80%80');
const DOUBLE_SPACE = SPACE_CODE + SPACE_CODE;
export class ReaderOperator {
	private static instance: ReaderOperator;
	private contentSize = { start: 0, end: 0 };
	private content: TextLine[] = [];
	private constructor() {}
	public static getInstance(): ReaderOperator {
		if (!ReaderOperator.instance) {
			ReaderOperator.instance = new ReaderOperator();
		}
		return ReaderOperator.instance;
	}
	private lettersOfEachLine = 55;
	formatContent(content: string): string {
		let result = content.replace(/\n/g, '<br/>');
		return result;
	}

	async loadText(textPath: string) {
		const text = await fs.readFile(textPath, 'utf-8');
		this.parseText(text);
	}
	private parseText(text: string) {
		const lines = text.split('\n');
		let lineNum = 0;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].replace(/^\s+/g, SPACE_CODE + SPACE_CODE);
			let len = line.length;
			if (len) {
				this.content.push(
					...splitWords(line, this.lettersOfEachLine).map((item) => {
						return {
							index: lineNum++,
							content: `<p class="text-line">${item}</p>`
						};
					})
				);
			}
			this.content.push({
				index: len,
				content: '<p class="text-br"></p>'
			});
		}
	}

	public getContent(start: number, end: number): TextLine[] {
		this.contentSize = { start, end };
		return this.content.slice(start, end);
	}

	get start() {
		return this.contentSize.start;
	}

	get length() {
		return this.content.length;
	}
}
