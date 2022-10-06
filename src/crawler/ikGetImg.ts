import { resolve } from 'path';
import { downloadPath } from '../types/constant';
import { FileOperator } from '../utils/fileOperator';
import { getImg } from './utils/getImg';
const fs = window.require('fs');
// let { imgList, title } = JSON.parse(
// 	fs.readFileSync('D:\\webDemo\\sporn\\imgs.json', 'utf8')
// ) as { imgList: string[]; title: string };

export async function getImgList(
	imgList: string[],
	title: string,
	target?: string
) {
	let dirTitle = target || title;
	let path = downloadPath + '\\' + dirTitle;
	let srcList = imgList;
	let index = 0;
	let i = 1;
	let interval = 0;
	let o: {
		title: string;
		stared: 0 | 1;
		path: string;
		cover: string;
	} = {
		title: dirTitle,
		stared: 0,
		path,
		cover: '\\1.jpg'
	};

	try {
		if (target) {
			i = fs.readdirSync(path + '\\' + target).length + 1;
		}
	} catch (e) {}
	let id = setInterval(() => {
		if (interval >= 15) {
			interval = 0;
		} else if (interval >= 10) {
			++interval;
			return;
		}
		++interval;
		getImg({
			src: srcList[index++],
			title: dirTitle, // + Math.ceil((index + 1) / count),
			id: i++
		});
		if (index >= srcList.length) {
			// fs.writeFileSync(
			// 	'D:\\webDemo\\desktop-reader\\json\\catalog.json',
			// 	JSON.stringify(catalog)
			// );
			clearInterval(id);
			try {
				FileOperator.getInstance().addNewPack(o, true);
			} catch (e) {
				if (!target) {
					console.log(e);
				}
			}
			console.log(title, '完成');
			resolve();
		}
	}, 500);
}
