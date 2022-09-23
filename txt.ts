import fs from 'fs';
let path = String.raw`C:\Users\Yang\Desktop\新建 文本文档.txt`;
let txt = fs.readFileSync(path, 'utf-8');
const includes = (str: string, ...args: string[]) => {
	for (let i of args) {
		if (str.includes(i)) {
			return true;
		}
	}
	return false;
};
function replaceInConversation(
	txt: string,
	old: string,
	newV: string,
	split = '“'
) {
	let opp = '”';
	switch (split) {
		case '[':
			opp = ']';
			break;
		case '【':
			opp = '】';
			break;
		case '「':
			opp = '」';
			break;
		default:
			opp = '”';
	}
	let conv1 = txt.split(split);
	let res: string[] = [];
	conv1.forEach((e) => {
		if (e.includes(opp)) {
			let conv2 = e.split(opp);
			conv2[0] = conv2[0].replace(new RegExp(`${old}`, 'g'), newV);
			res.push(conv2.join(opp));
		} else {
			res.push(e);
		}
	});
	return res.join(split);
}
function replaceOutConversation(
	txt: string,
	old: string,
	newV: string,
	person: string,
	split = '“'
) {
	let opp = '”';
	let conv1 = txt
		.replace(/\[|【|「|『/g, '“')
		.replace(/\]|】|」|』/g, '”')
		.split(split);
	let res: string[] = [];
	conv1.forEach((e) => {
		let conv2 = e.split(opp);
		let index = conv2.length === 1 ? 0 : 1;
		conv2[index] = conv2[index]
			.split(/(!+)|(。)|(？)|(…)/)
			.map((e) => {
				if (e) {
					return e
						.replace(new RegExp(`${old}`), newV)
						.replace(new RegExp(`${old}`, 'g'), person);
				}
				return e;
			})
			.join('');
		res.push(conv2.join(opp));
	});
	return res.join(split);
}

fs.writeFileSync(
	String.raw`C:\Users\Yang\Desktop\新建 文本文档.txt`,
	replaceInConversation(txt, '方若雨', '小雨')
);
