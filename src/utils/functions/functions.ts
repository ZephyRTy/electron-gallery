import { Book } from 'epubjs';
import { lineHeight, SPACE_CODE } from '../../types/constant';
import {
	LineSelection,
	LineSelectionPosition,
	SelectionInfo
} from '../../types/global';
import { TextDetail } from '../data/TextDetail';

const fs = window.require('fs');
const crypto = window.require('crypto');
export const path = window.require('path');
export const Buffer = window.require('buffer').Buffer;
export function formatDate(
	time: string | number | Date,
	format = 'YY-MM-DD hh:mm:ss'
) {
	let date = new Date(time);

	let year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
		return '0' + index;
	});

	let newTime = format
		.replace(/YY/g, year.toString())
		.replace(/MM/g, preArr[month] || month.toString())
		.replace(/DD/g, preArr[day] || day.toString())
		.replace(/hh/g, preArr[hour] || hour.toString())
		.replace(/mm/g, preArr[min] || min.toString())
		.replace(/ss/g, preArr[sec] || sec.toString());

	return newTime;
}
export const notMoreThanOne = (...arr: any[]) => {
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]) {
			count++;
		}
	}
	return count <= 1;
};

export const parseUrlQuery = (url: string) => {
	const query = decodeURIComponent(url.split('?')[1]);
	if (query) {
		const queryObj: any = {};
		const queryArr = query.split('&');
		queryArr.forEach((item) => {
			const [key, value] = item.split('=');
			if (typeof value === 'string') {
				queryObj[key] = value;
			}
		});
		return queryObj;
	}
	return {};
};
export const convertJsRegToMysqlReg = (reg: string) => {
	let newReg = '';
	newReg = String.raw`${reg}`
		.replace('\\d', '[0-9]')
		.replace('\\w', '[a-zA-Z]')
		.replace(/\[.*(\[0-9\]).*\]/, (match, p1) => {
			return match.replace(p1, '0-9');
		})
		.replace(/\[.*(\[a-zA-Z\]).*\]/, (match, p1) => {
			return match.replace(p1, 'a-zA-Z');
		});
	return String.raw`${newReg}`;
};
export const endsWith = (str: string, ...args: string[]) => {
	for (let i = 0; i < args.length; i++) {
		if (str.endsWith(args[i])) {
			return true;
		}
	}
	return false;
};

export const setSearchParams = (head: string, params: any) => {
	let search = '';
	for (let key in params) {
		if (params[key]) {
			search += `${key}=${params[key]}&`;
		}
	}
	return `${head}?${search}`;
};

export const deleteUselessWords = (str: string, ...useless: string[]) => {
	useless.forEach((v) => {
		str = str.replace(v, '');
	});
	return str;
};

export const gotoHash = (hash: string) => {
	window.location.hash = hash;
};
export const rmDir = async (dirPath: string) => {
	let files = [];
	try {
		files = fs.readdirSync(dirPath);
	} catch (e) {
		return false;
	}
	if (files.length > 0)
		for (let i = 0; i < files.length; i++) {
			let filePath = dirPath + '/' + files[i];
			if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
			else rmDir(filePath);
		}
	await fs.rmdir(dirPath, (err) => {
		if (err) {
			console.error(err);
		}
	});
	return true;
};
const textMetrics = window.require('text-metrics');
export const measureTextPosition = (
	textInfo: LineSelection[],
	book: TextDetail,
	ele: HTMLElement
): LineSelectionPosition[] => {
	const arr = [] as LineSelectionPosition[];
	for (let i = 0; i < textInfo.length; i++) {
		let value = textInfo[i];
		let width = 0,
			offset = 0;
		if (value.isBlank) {
			arr.push({ top: 0, offset: 0, width: 0, logic: value });
			continue;
		}

		let line = book.getLine(value.index);
		const metrics = textMetrics.init(ele);
		offset =
			value.offset === 0
				? 0
				: metrics.width(
						line.content
							.slice(0, value.offset)
							.replaceAll(SPACE_CODE, '一')
				  );
		width = metrics.width(
			line.content
				.slice(value.offset, value.length + value.offset)
				.replaceAll(SPACE_CODE, '一')
		);
		arr.push({
			top: value.index * lineHeight - 3,
			offset: 70 + offset,
			width,
			logic: value
		});
	}
	return arr;
};

export const stylesJoin = (...args: string[]) => {
	return args.join(' ');
};

export const selectionContains = (
	selection: SelectionInfo[],
	line: SelectionInfo
) => {
	if (selection.length === 0) return false;
	let i = 0;
	while (i < selection.length) {
		const { anchorIndex, focusIndex, anchorOffset, focusOffset } =
			selection[i];
		if (focusIndex < line.anchorIndex || anchorIndex > line.focusIndex) {
			i++;
			continue;
		}
		if (line.focusIndex > focusIndex && line.anchorIndex < anchorIndex) {
			return true;
		} else if (line.anchorIndex < anchorIndex) {
			if (line.focusIndex === focusIndex) {
				if (line.focusIndex > anchorIndex) {
					return true;
				} else if (line.focusIndex === anchorIndex) {
					if (line.focusOffset >= anchorOffset) {
						return true;
					}
				}
			} else {
				return true;
			}
		} else if (line.anchorIndex === anchorIndex) {
			if (line.focusIndex !== focusIndex) {
				return true;
			} else if (
				line.focusIndex === focusIndex &&
				!(
					line.anchorOffset >= focusOffset &&
					line.focusOffset <= anchorOffset
				)
			) {
				return true;
			}
		} else if (
			line.anchorIndex > anchorIndex &&
			line.anchorIndex < focusIndex
		) {
			return true;
		} else if (
			line.anchorIndex === focusIndex &&
			line.anchorOffset < focusOffset
		) {
			return true;
		}

		++i;
	}
	return false;
};

export const LineSelectionEqual = (a: LineSelection, b: LineSelection) => {
	return (
		a.index === b.index && a.offset === b.offset && a.length === b.length
	);
};

export const generateFileMd5 = (filePath: string): string => {
	const md5 = crypto.createHash('md5');
	const content = fs.readFileSync(filePath);
	return md5.update(content).digest('hex');
};

export const generateTextMd5 = (text: string): string => {
	const md5 = crypto.createHash('md5');
	return md5.update(text).digest('hex');
};

export const getEpubTitle = async (filePath: string): Promise<string> => {
	const book = new Book();
	await book.open(filePath);
	return book.packaging.metadata.title;
};

export function debounce(fn: Function, delay: number) {
	let timer: any = null;
	// eslint-disable-next-line no-unused-vars
	return function (this: any, ...args: any[]) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			fn.apply(this, arguments);
		}, delay);
	};
}
