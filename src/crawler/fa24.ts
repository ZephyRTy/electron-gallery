import _ from 'lodash';
import { downloadPath } from '../types/constant';
import { mysqlOperator } from '../utils/mysqlOperator';
import { Circuit } from './stream/Circuit';
import { Req } from './stream/req';
import { Stream } from './stream/stream';
import { getImg } from './utils/getImg';
const mysql = window.require('mysql');
const fs = window.require('fs');
const cheerio = window.require('cheerio');
const proxyIP = '127.0.0.1';
const proxyPort = '10809';
const proxy = 'http://' + proxyIP + ':' + proxyPort;

let headers = {
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.62'
};
let domain = 'https://www.112w.cc/';
let mode = 'new';
let missing: string[] =
	mode === 'new'
		? []
		: JSON.parse(
				fs.readFileSync(
					String.raw`D:\webDemo\desktop-reader\missingon`,
					'utf-8'
				)
		  );
export const getImgFrom24fa = async () => {
	let connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'GALLERY'
	});
	connection.connect();
	let catalog: {
		title: string;
		stared: boolean;
		id: number;
		path: string;
		cover: string;
		status: 0 | 1;
	}[] = await new Promise((resolve) => {
		connection.query(
			'select * from pack_list order by id desc limit 1000',
			(err: any, res: any) => {
				if (err) {
					console.log(err);
				} else {
					let result: {
						title: string;
						stared: boolean;
						id: number;
						path: string;
						cover: string;
						status: 0 | 1;
					}[] = res.map(
						(item: {
							title: string;
							stared: 0 | 1;
							id: number;
							path: string;
							cover: string;
							status: 0 | 1;
						}) => item
					);
					resolve(result);
				}
			}
		);
	});
	connection.end();
	let recentCatalog = catalog.map((e) => e.path.split('/').pop()!);
	let newPacks: {
		title: string;
		stared: 0 | 1;
		path: string;
		cover: string;
	}[] = [];

	let getNewPacks = new Circuit(
		(body: unknown) => {
			let $ = cheerio.load(body as any);
			let images = $('a[title^="??????"]');
			let result: string[] = [];
			images.each((i: any, ele: any) => {
				let url = $(ele).attr('href');
				if (!url) {
					return;
				}
				result.push(domain + url);
			});
			return result;
		},
		(body: unknown) => {
			let $ = cheerio.load(body as any);
			let links = $('#dlNews a');
			let titles = $('#dlNews a img');
			let result: { title: string; url: string; current: string }[] = [];
			links.each((i: any, ele: any) => {
				let title = $(titles[i]).attr('alt');
				if (!title) {
					return;
				}
				if (title.endsWith('.')) {
					title = title.substring(0, title.length - 1);
				}
				title = title.replace(/[\\/:*?"<>|]/g, '_');
				if (mode !== 'new') {
					if (!_.includes(missing, title)) {
						return;
					}
				} else {
					if (_.includes(recentCatalog, title)) {
						return;
					}
					newPacks.push({
						title,
						stared: 0,
						path: downloadPath + '/' + title,
						cover: '/1.jpg'
					});
					console.log(title);
				}

				try {
					fs.mkdirSync(downloadPath + '/' + title);
				} catch (e) {}
				let href = $(ele).attr('href');
				if (!href) {
					return;
				}
				result.push({
					url: domain + href,
					title: title as string,
					current: domain + href
				});
			});
			return result;
		},
		{ max: 1 }
	);
	Req.options = { proxy, headers };

	const pages = Stream.create(
		(body, data: { title: string; current: string }) => {
			let $ = cheerio.load(body as any);
			let res: {
				url: string;
				title: string;
				page: number;
			}[] = $('div.pager a')
				.slice(0, -1)
				.map((i: any, ele: any) => {
					let url = $(ele).attr('href');
					if (!url) {
						// eslint-disable-next-line array-callback-return
						return;
					}
					return {
						url: domain + url,
						title: data.title,
						page: i + 2
					};
				})
				.toArray();
			//console.log(data.title + ' has ' + res.length + ' pages');
			return [{ url: data.current, page: 1, title: data.title }, ...res];
		},
		{ interval: 1500 }
	);

	const imgs = Stream.create(
		(body, data: { title: string; page: number }) => {
			if (data.page === 1) {
				console.log(data.title + ' has got');
			}

			let id = (data.page - 1) * 4 + 1;
			let $ = cheerio.load(body as any);
			let images = $('#content img');
			let result: { src: string; id: number; title: string }[] = [];
			images.each((i: any, ele: any) => {
				let src = $(ele).attr('src');
				if (!src) {
					return;
				}
				src = domain + src;
				result.push({ src, id: id++, title: data.title });
			});
			return result;
		},
		{ interval: 800 }
	);
	getNewPacks.name = 'getNewPacks';
	pages.name = 'pages';
	imgs.name = 'img';
	return new Promise((resolve, reject) => {
		try {
			getNewPacks
				.collect('https://www.112w.cc/c49.aspx')
				.next(pages)
				.next(imgs)
				.output(
					(img) => {
						getImg(img);
					},
					{ interval: 200 }
				)
				.close(() => {
					console.log('end');
					if (mode === 'new') {
						newPacks.forEach((e, i) => {
							if (newPacks.length === 0) {
								resolve(true);
								return;
							}
							mysqlOperator.insertPack(e).then(() => {
								if (i === newPacks.length - 1) {
									resolve(true);
								}
							});
						});
					}
				});
		} catch (e) {
			reject(false);
		}
	});
};
