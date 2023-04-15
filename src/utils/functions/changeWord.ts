/* eslint-disable no-unused-vars */
const fs = window.require('fs');
const iconv = window.require('iconv-lite');

const includes = (str, ...args) => {
	for (let i of args) {
		if (str.includes(i)) {
			return true;
		}
	}
	return false;
};
function replaceInConversation(txt, old, newV, split = '“') {
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
function replaceOutConversation(txt, old, newV, person, split = '“') {
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
export const changeWord = (
	path: string,
	oldWord: string,
	newWord: string,
	personalPronouns?: string
) => {
	let encode = 'utf-8';
	let txt =
		encode === 'gbk'
			? iconv.decode(fs.readFileSync(path, 'binary'), 'gbk')
			: fs.readFileSync(path, 'utf-8');
	const oldV = oldWord.trim();
	const newV = newWord.trim();
	if (personalPronouns?.length) {
		fs.writeFileSync(
			path,
			replaceOutConversation(
				txt,
				oldWord,
				newWord,
				personalPronouns.trim()
			)
		);
	} else {
		fs.writeFileSync(path, replaceInConversation(txt, oldWord, newWord));
	}
};
