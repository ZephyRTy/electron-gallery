import galleryConfig, {
	domainOf24fa,
	downloadPath,
	proxyEnabled
} from '../types/constant';
import { GalleryOperator } from '../utils/data/galleryOperator';
import { notification } from '../utils/functions/functions';
import { Circuit } from './stream/Circuit';
import { Req } from './stream/req';
import { Stream } from './stream/stream';
import { getImg } from './utils/getImg';
const mysql = window.require('mysql');
const fs = window.require('fs');
const cheerio = window.require('cheerio');

let headers = {
	'User-Agent':
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 Edg/98.0.1108.62'
};
let domain = domainOf24fa;
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
let getNewPacks: Circuit<
	unknown,
	unknown,
	{ title: string; url: string; current: string }
>;
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
		id: number;
		path: string;
		cover: string;
		status: 0 | 1;
	}[] = await new Promise((resolve) => {
		connection.query(
			'select * from pack_list order by id desc limit 10000',
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
	let recentCatalog = catalog.map((e) => e.title!);
	let newPacks: {
		title: string;
		stared: 0 | 1;
		path: string;
		cover: string;
	}[] = [];

	getNewPacks = new Circuit(
		(body: unknown) => {
			let $ = cheerio.load(body as any);
			let images = $('a[title^="后页"]');
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
					if (!missing.includes(title)) {
						return;
					}
				} else {
					if (recentCatalog.includes(title)) {
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
	Req.options = {
		proxy: proxyEnabled ? galleryConfig.proxy : undefined,
		headers
	};

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
				.collect(domain + 'c49.aspx')
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
					notification('采集完成', '采集完成');
					if (mode === 'new') {
						GalleryOperator.getInstance()
							.addNewPack(newPacks)
							.then(() => {
								resolve(true);
							});
					}
				});
		} catch (e) {
			reject(false);
		}
	});
};
