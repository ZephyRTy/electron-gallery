const fs = require('fs');

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
		content.sort((a, b) => (a.time > b.time ? -1 : 1));
		filesInCache = content.map((v) => v.name);
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
fs.writeFileSync('./catalog.txt', dirs.join('\n'));
