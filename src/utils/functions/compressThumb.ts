import { Buffer, path } from './functions';
const fs = window.require('fs');
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
