/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const _map = require('lodash/map');
const _difference = require('lodash/difference');
const cacheFunction = () => {
	let pathInCache = '';
	let filesInCache = [];
	let fn = (path) => {
		if (pathInCache === path) {
			return filesInCache;
		}
		pathInCache = path;
		let files = fs.readdirSync(path);
		let content = [];
		files.forEach((v) => {
			let time = fs.statSync(path + `\\${v}`).mtime;
			content.push({ name: v, time: time });
		});
		content.sort((a, b) => (a.time < b.time ? -1 : 1));
		filesInCache = content.map((v) => {
			return { title: v.name, time: v.time };
		});
		return filesInCache;
	};
	let reset = () => {
		pathInCache = '';
		filesInCache = [];
	};
	return [fn, reset];
};

let [fn] = cacheFunction();
let dirs = fn('D:\\img\\show_img\\图片');
fs.writeFileSync(
	'./catalog.json',
	JSON.stringify(
		_map(dirs, (e, i) => {
			return { title: e.title, stared: false, index: parseInt(i) };
		})
	)
);
// let catalog = JSON.parse(fs.readFileSync('./catalog.json', 'utf-8'));
// let len = catalog.length;
// let files = fs.readdirSync('D:\\img\\show_img\\图片');
// // console.log(catalog.length);
// fs.writeFileSync(
// 	'./catalog.json',
// 	JSON.stringify(
// 		_map(catalog, (v, i) => {
// 			return { ...v, index: parseInt(i) };
// 		})
// 	)
// );
