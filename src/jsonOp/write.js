/* eslint-disable no-underscore-dangle */
const fs = require('fs');
let root = String.raw`D:\webDemo\desktop-reader\catalog.json`;
//let newPacks = JSON.parse(fs.readFileSync('./new.json', 'utf8'));
let catalog = JSON.parse(fs.readFileSync(root, 'utf8'));
let newCatalog = catalog.map((item) => {
	return {
		...item,
		cover: '\\1.jpg',
		path: 'D:\\img\\show_img\\图片\\' + item.title
	};
});
fs.writeFileSync(root, JSON.stringify(newCatalog));
