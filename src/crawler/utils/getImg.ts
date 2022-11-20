import galleryConfig, {
	downloadPath,
	proxyEnabled
} from '../../types/constant';
const { promisify } = window.require('util');
const stream = window.require('stream');
const pipeline = promisify(stream.pipeline);
const fs = window.require('fs');
const request = window.require('request');
export async function getImg(
	img: {
		src: string;
		id: number;
		title: string;
		path?: string;
	},
	depth = 0
) {
	let filePath = '';
	if (img.path) {
		filePath = img.path;
	} else {
		filePath = downloadPath;
	}
	if (!fs.existsSync(filePath + `\\${img.title}`)) {
		fs.mkdirSync(filePath + `\\${img.title}`);
	}
	const proxy = proxyEnabled ? galleryConfig.proxy : undefined;
	try {
		await pipeline(
			request(img.src, {
				proxy,
				timeout: {
					request: 10000
				}
			}),
			fs
				.createWriteStream(filePath + `\\${img.title}\\${img.id}.jpg`, {
					autoClose: true
				})
				.on('error', (err: any) => {
					console.error(err);
					console.log(img.src);
				})
				.on('close', (err: any) => {
					if (err) {
						console.log('写入失败', err);
					}
				})
		);
		return true;
	} catch (e) {
		if (depth < galleryConfig.maxRetryCount) {
			return getImg(img, depth + 1);
		} else {
			console.log('下载失败', img.src);
			return false;
		}
	}
}
