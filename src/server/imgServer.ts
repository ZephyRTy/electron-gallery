import { getImg } from '../crawler/utils/getImg';
import { downloadPath, otherPath } from '../types/constant';
import {
	galleryOperator,
	GalleryOperator
} from '../utils/data/galleryOperator';
import { notification, parseUrlQuery } from '../utils/functions/functions';
const fs = window.require('fs');
const http = window.require('http');
const Buffer = window.require('buffer').Buffer;
const path = window.require('path');
const replaceInvalidDirName = (str: string) => {
	return str.replace(/[\\/:*?"<>|]/g, '_');
};
// 配合浏览器插件使用，从网页上下载图片
export class ImgServer {
	private readonly server;
	private static instance: ImgServer;
	private isActive = false;
	private titleMap = new Map<string, number>();
	private taskQueue: {
		imgList: string[];
		title: string;
		target?: string;
	}[] = [];
	private hasTask: boolean = false;
	private constructor() {
		this.server = http.createServer((req: any, res: any) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/json');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Headers', '*');
			res.setHeader(
				'Access-Control-Allow-Methods',
				'PUT,POST,GET,DELETE,OPTIONS'
			);
		});
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ImgServer();
		}
		return ImgServer.instance;
	}
	on() {
		if (this.isActive) {
			return;
		}
		this.titleMap = new Map();
		this.isActive = true;
		this.server.listen('8081', () => console.log('http://localhost:8081/'));
		const ins = this;
		this.server.on('request', (req: any, res: any) => {
			let data = [] as any[];
			if ((req.url as string).startsWith('/xhr')) {
				req.on('data', (chunk) => {
					//const str = JSON.parse(chunk.toString()).data;
					if (chunk) {
						data.push(chunk);
					}
					res.end();
				});
				req.on('end', function () {
					const buffer = JSON.parse(
						Buffer.concat(data).toString()
					) as {
						base64: string;
						title: string;
						index: number;
					};
					const title = buffer.title;
					if (buffer.base64.length === 0) {
						ins.titleMap.set(title, buffer.index);
						const NOTIFICATION_TITLE = '开始下载';
						const NOTIFICATION_BODY = `${title} 开始下载, 共${buffer.index}张图片`;
						notification(NOTIFICATION_TITLE, NOTIFICATION_BODY);
						return;
					}
					let src = Buffer.from(
						buffer.base64.replace(/^data:image\/\w+;base64,/, ''),
						'base64'
					);

					try {
						fs.mkdirSync(path.join(downloadPath, title));
					} catch {}
					if (ins.titleMap.has(title)) {
						const index = ins.titleMap.get(title);
						if (index && index === buffer.index) {
							const NOTIFICATION_TITLE = '下载完成';
							const NOTIFICATION_BODY = `${title} 下载完成`;
							notification(NOTIFICATION_TITLE, NOTIFICATION_BODY);
						}
					}
					fs.writeFile(
						path.join(
							downloadPath,
							buffer.title,
							`${buffer.index}.jpg`
						),
						src,
						(err) => {
							if (!err && buffer.index === 1) {
								galleryOperator.addNewPack(
									{
										path: path.join(
											downloadPath,
											buffer.title
										) as string,
										title: buffer.title,
										cover: '/1.jpg'
									},
									true
								);
							}
							if (err) {
								console.log(err);
							}
						}
					);
				});
				return;
			} else {
				let data = this.parseRoute(req.url);
				if (data) {
					res.end(JSON.stringify(data));
				} else {
					res.end('404');
				}
				req.on('data', (postData: { toString: () => string }) => {
					// 注意 postData 是一个Buffer类型的数据，也就是post请求的数据存到了缓冲区
					let { imgList, title, target } = JSON.parse(
						postData.toString()
					) as {
						imgList: string[];
						title: string;
						target?: string;
					};
					title = replaceInvalidDirName(title);
					if (this.titleMap.has(title)) {
						console.log(`${title} 已获取`);
						return;
					}
					this.titleMap.set(title, imgList.length);
					this.taskQueue.push({ imgList, title, target });
					if (this.taskQueue.length === 1 && !this.hasTask) {
						this.nextTask();
					} else {
						console.log(
							title,
							imgList.length,
							target ?? '',
							'加入队列'
						);
						const NOTIFICATION_TITLE = '加入队列';
						const NOTIFICATION_BODY = `${title} 已加入队列， 共${imgList.length}张图片`;
						notification(NOTIFICATION_TITLE, NOTIFICATION_BODY);
					}
					//getImgList(imgList, title, target);
				});
				res.end();
			}
		});
	}
	check(title) {
		if (!this.titleMap.has(title)) {
			notification('开始下载', `${title} 开始下载`);
			this.titleMap.set(title, 0);
		}
	}
	off() {
		if (!this.isActive) {
			return;
		}
		this.isActive = false;
		this.server.close();
	}

	private async getImgList(
		imgList: string[],
		title: string,
		target?: string
	) {
		const max = 10;

		this.hasTask = true;
		let dirTitle = target || title;
		let srcList = imgList;
		let n = 1;
		let path = downloadPath + '/' + dirTitle;
		let o: {
			title: string;
			stared: 0 | 1;
			path: string;
			cover: string;
		} = {
			title: dirTitle,
			stared: 0,
			path, //文件夹完整路径
			cover: '/1.jpg'
		};

		try {
			if (target) {
				n = (fs.readdirSync(otherPath + '/' + target)?.length ?? 0) + 1;
				o.path = otherPath + '/' + target;
			}
		} catch (e) {
			n = 1;
		}
		const queues = [] as {
			src: string;
			id: number;
			title: string;
			path?: string | undefined;
		}[][];
		for (let i = 0; i < max; i++) {
			queues.push([]);
		}
		for (let index = 0; index < srcList.length; index++) {
			queues[index % max].push({
				src: srcList[index],
				title: dirTitle, // 文件夹名
				id: n++,
				path: target ? otherPath : downloadPath
			});
		}
		const promises = queues.map((queue) => {
			return this.runPipe(queue);
		});
		await Promise.all(promises);
		try {
			GalleryOperator.getInstance().addNewPack(o, true);
		} catch (e) {
			if (!target) {
				console.log(e);
			}
		}
		console.log(title, '完成');
		const NOTIFICATION_TITLE = '下载完成';
		const NOTIFICATION_BODY = `${title} 下载完成`;
		notification(NOTIFICATION_TITLE, NOTIFICATION_BODY);
		this.hasTask = false;
		this.nextTask();
	}

	private async runPipe(
		imgList: {
			src: string;
			id: number;
			title: string;
			path?: string | undefined;
		}[]
	) {
		for (let i = 0; i < imgList.length; i++) {
			await getImg(imgList[i]);
		}
		return true;
	}

	private nextTask() {
		if (this.taskQueue.length === 0 || this.hasTask) {
			return;
		}
		let task = this.taskQueue.shift();
		if (!task) {
			return;
		}
		console.log(
			task.title,
			task.imgList.length,
			task.target ?? '',
			'开始下载'
		);
		notification(
			'开始下载',
			`${task.title} 开始下载, 共${task.imgList.length}张图片`
		);
		this.getImgList(task.imgList, task.title, task.target);
	}
	private parseRoute(url: string) {
		let [uri] = url.split('?');
		const query = parseUrlQuery(url);
		switch (uri) {
			case '/length':
				return { length: this.getLength(query.path) };
			default:
				return;
		}
	}

	private getLength(path) {
		return fs.readdirSync(path).filter((e) => isImgFile(e)).length;
	}
}

const isImgFile = (file: string) =>
	file.endsWith('.jpg') ||
	file.endsWith('.png') ||
	file.endsWith('.gif') ||
	file.endsWith('.jpeg');
