import { getImg } from '../crawler/utils/getImg';
import { downloadPath, otherPath } from '../types/constant';
import { GalleryOperator } from '../utils/data/galleryOperator';
import { parseUrlQuery } from '../utils/functions/functions';
const fs = window.require('fs');
const http = window.require('http');
const replaceInvalidDirName = (str: string) => {
	return str.replace(/[\\/:*?"<>|]/g, '_');
};
// 配合浏览器插件使用，从网页上下载图片
export class ImgServer {
	private readonly server;
	private static instance: ImgServer;
	private isActive = false;
	private titleSet = new Set();
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
		this.titleSet = new Set();
		this.isActive = true;
		this.server.listen('8081', () => console.log('http://localhost:8081/'));
		this.server.on('request', (req: any, res: any) => {
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
				if (this.titleSet.has(title)) {
					console.log(`${title} 已获取`);
					return;
				}
				this.titleSet.add(title);
				this.taskQueue.push({ imgList, title, target });
				console.log(title, imgList.length, target ?? '', '加入队列');
				if (this.taskQueue.length === 1 && !this.hasTask) {
					this.nextTask();
				}
				//getImgList(imgList, title, target);
			});
			res.end();
		});
	}

	off() {
		if (!this.isActive) {
			return;
		}
		this.isActive = false;
		console.log('close');
		this.server.close();
	}

	private async getImgList(
		imgList: string[],
		title: string,
		target?: string
	) {
		const max = 10;
		console.log(title, imgList.length, target ?? '', '开始下载');
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
