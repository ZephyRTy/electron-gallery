import { BasicData, Bookmark, DirData } from '../types/global';
const fs = window.require('fs');
const path = window.require('path');
const Buffer = window.require('buffer').Buffer;
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

export const isBookmark = (data: Bookmark | BasicData): data is Bookmark => {
	return Boolean((data as Bookmark).url);
};
export const isDirData = (data: any): data is DirData => {
	return !data.path && !data.url;
};
export const parseUrlQuery = (url: string) => {
	const query = decodeURIComponent(url.split('?')[1]);
	if (query) {
		const queryObj: any = {};
		const queryArr = query.split('&');
		queryArr.forEach((item) => {
			const [key, value] = item.split('=');
			queryObj[key] = value;
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

const process = window.require('child_process');
// cmd命令
const cmdOrder = {
	getAllDrive: () => 'wmic logicaldisk where drivetype=3 get deviceid',
	getOneDriveName: (drive: string) =>
		`wmic logicaldisk where name="${drive}:" get volumename`
};

/**
 * 获取电脑中所有盘符及其名称
 * @returns 电脑中所有盘符及其名称
 */
export async function getAllDrive(): Promise<
	{
		drive: string;
		name: string;
	}[]
> {
	let result: {
		drive: string;
		name: string;
	}[] = [];
	let promise = new Promise((resolve) => {
		// 获取电脑中所有盘符
		process.exec(cmdOrder.getAllDrive(), (error: any, stdout: any) => {
			if (error !== null) {
				console.error(error);
				return;
			}
			//@ts-ignore
			let stdoutArr = [...stdout];
			let res: string[] = [];
			stdoutArr.forEach((v: string, i: number) => {
				if (v === ':') {
					res.push(stdoutArr[i - 1]);
				}
			});
			let resList: {
				drive: string;
				name: string;
			}[] = [];
			let promiseArr: Promise<any>[] = [];
			// 获取所有盘符的所有名称
			res.forEach((v: string) => {
				promiseArr.push(
					new Promise((resolve) => {
						process.exec(
							cmdOrder.getOneDriveName(v),
							(error: any, stdout: any) => {
								if (error !== null) {
									console.error(error);
									return;
								}
								let stdoutArr = [...stdout];
								let res: string[] = [];
								stdoutArr.forEach((v: string) => {
									if (v !== ' ' && v !== '\n' && v !== '\r') {
										res.push(v);
									}
								});
								res.splice(0, 10);
								resList.push({
									drive: v,
									name: res.join('')
								});
								resolve(true);
							}
						);
					})
				);
			});
			Promise.all(promiseArr).then(() => {
				resolve(resList);
			});
		});
	});
	await promise.then((res: any) => {
		result = res;
	});
	// console.log(result);

	return result;
}

export const hasExternalDriver = Boolean(
	(await getAllDrive()).find((e) => e.name === 'BigHouse' && e.drive === 'E')
);

export const setSearchParams = (head: string, params: any) => {
	let search = '';
	for (let key in params) {
		if (params[key]) {
			search += `${key}=${params[key]}&`;
		}
	}
	return `${head}?${search}`;
};
let canvas: HTMLCanvasElement = document.createElement('canvas');
async function imageToCanvas(
	src: string,
	fn: typeof canvasToDataURL,
	quality: number,
	thumbName: string
): Promise<boolean> {
	return new Promise((resolve) => {
		let ctx = canvas.getContext('2d');
		let img = new Image();
		let dest = src.replaceAll('\\', '/').split('/').slice(0, -1).join('/');
		let imgSrc = src
			.replaceAll('\\', '/')
			.replaceAll(/\s/g, encodeURIComponent(' '))
			.replaceAll(/#/g, encodeURIComponent('#'));

		img.src = imgSrc;

		img.onload = function () {
			img.onload = null;
			canvas.width = img.width;
			canvas.height = img.height;
			ctx!.drawImage(img, 0, 0);
			fn(canvas, dest, quality, thumbName).then((res) => resolve(res));
		};
		img.onerror = function () {
			img.onerror = null;
			console.log(decodeURI(img.src));
		};
	});
}

async function canvasToDataURL(
	canvas: HTMLCanvasElement,
	dest: string,
	quality: any,
	thumbName: any
) {
	let data = canvas
		.toDataURL('image/jpeg', quality || 0.5)
		.replace(/^data:image\/\w+;base64,/, '');
	let dataBuffer = Buffer.from(data, 'base64');
	if (thumbName.includes('bookmark-thumb')) {
		const files = fs.readdirSync(dest);
		files.forEach((file) => {
			if (file.includes('bookmark-thumb')) {
				fs.unlinkSync(`${dest}/${file}`);
			}
		});
	}
	await fs.writeFile(path.join(dest, thumbName), dataBuffer, (err: Error) => {
		if (err) {
			console.log('写入图片错误', err);
		}
	});
	return true;
}

const checkImageSize = (path: string) => {
	const size = fs.statSync(path).size;
	return size;
};
export const compress = async (src: string, thumbName = 'thumb.jpg') => {
	let size = 0;
	let imgSrc = decodeURIComponent(src);
	try {
		size = checkImageSize(imgSrc);
	} catch (e: any) {
		if (!fs.existsSync(imgSrc)) {
			console.log('文件不存在', imgSrc);
			throw new Error('文件不存在');
		}
	}
	let n = 1;
	if (size >= 1024 * 1024 * 6) {
		n = 0.15;
	} else if (size >= 1024 * 1024 * 4) {
		n = 0.2;
	} else if (size >= 1024 * 1024 * 2) {
		n = 0.4;
	} else if (size >= 1024 * 1024 * 1) {
		n = 0.5;
	} else if (size >= 1024 * 1024 * 0.5) {
		n = 0.7;
	}
	return await imageToCanvas(imgSrc, canvasToDataURL, n, thumbName);
};

export const openInExplorer = (path: string) => {
	window.require('child_process').exec(`start "" "${path}"`);
};
