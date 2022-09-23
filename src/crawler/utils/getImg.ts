import { downloadPath } from '../../types/constant';

const fs = window.require('fs');
const request = window.require('request');
export function getImg(
	img: { src: string; id: number; title: string; path?: string },
	proxy?: string,
	deep = 0
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
	try {
		request({
			url: img.src,
			proxy: proxy,
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 Edg/100.0.1185.36'
			},
			timeout: 10 * 1000
		})
			.on('error', (err: any) => {
				if (deep >= 2) {
					console.error(err);
					console.log(img.title);
				} else {
					getImg(img, proxy, deep + 1);
				}
			})
			.pipe(
				fs
					.createWriteStream(
						filePath + `\\${img.title}\\${img.id}.jpg`,
						{
							autoClose: true
						}
					)
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
	} catch (error) {
		console.error(error);
		console.log(img + ' download Error');
	}
}
