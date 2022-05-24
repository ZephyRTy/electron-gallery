import fs from 'fs';
import { getImg } from './getImg.js';
//.matchAll(/https:\/\/pbs\.twimg\.com\/media\/\w+\?format=jpg&name=/g);
let text: string[] = JSON.parse(fs.readFileSync('./imgs.json', 'utf8'));
// text.forEach((v, i) => {
// 	getImg({ src: v, index: i, title: '推特换脸' });
// });
// let i = text.length;
// let id = setInterval(() => {
// 	getImg({ src: text[i - 1], index: i, title: '推特换脸1' });
// 	--i;
// 	if (i === 0) {
// 		clearInterval(id);
// 	}
// }, 200);
getImg({ src: text[0], id: 0, title: '推特换脸1' });
