const fs = require('fs');
interface BasicData {
	title: string;
	stared: boolean;
	index: number;
	cover: string;
	path: string;
	status: number;
}
interface obj {
	[key: string]: {
		title: string;
		stared: boolean;
		cover: string;
		path: string;
		status: number;
	};
}
let txt: BasicData[] = JSON.parse(
	fs.readFileSync('D:\\webDemo\\desktop-reader\\json\\catalog.json', 'utf-8')
);

let arr: number[] = [];
for (let i = 0; i < 1000000; i++) {
	let index = Math.floor(Math.random() * txt.length);
	arr.push(index);
}
let _: any;
let start = new Date().getTime();
for (let i = 0; i < 1000000; i++) {
	_ = txt[arr[i]];
}
console.log('array:', new Date().getTime() - start);
let o: obj = JSON.parse(
	fs.readFileSync(
		'D:\\webDemo\\desktop-reader\\json\\testCatalog.json',
		'utf-8'
	)
);
start = new Date().getTime();
for (let i = 0; i < 1000000; i++) {
	_ = o[arr[i]];
}
console.log('object:', new Date().getTime() - start);
//0: not a directory and not in a directory
//1: not a directory and in a directory
//2: a directory and not in a directory
//3: a directory and in a directory
