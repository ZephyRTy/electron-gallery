/* eslint-disable camelcase */
const fs = require('fs');
const mysql = require('mysql');
let txt: Bookmark[] = JSON.parse(
	fs.readFileSync(
		'D:\\webDemo\\desktop-reader\\json\\bookmarks.json',
		'utf-8'
	)
);

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'GALLERY',
	port: 3306,
	connectionLimit: 10
});
connection.connect();
let value = txt.map((v: Bookmark) => {
	return [v.index, v.cover, decodeURIComponent(v.url), v.timeStamp];
});

(async () => {
	await connection.query(
		'insert into bookmark (b_id, b_cover, b_url, b_timeStamp) values ? ',
		[value],
		(err: any, result: any) => {
			if (err) {
				console.log('INSERT ERROR - ', err.message);
				return;
			}
			console.log(result);
			connection.end();
		}
	);
})();
// connection.query('select * from directory limit ?', (err: any, res: any) => {
// 	if (err) {
// 		console.log('INSERT ERROR - ', err.message);
// 		return;
// 	}
// 	console.log(res);
// 	connection.end();
// });
interface BasicData {
	title: string;
	stared: boolean;
	index: number;
	cover: string;
	path: string;
	status: number;
	parent?: number;
}
export interface Bookmark extends BasicData {
	timeStamp: string;
	url: string;
}
//0: not a directory and not in a directory
//1: not a directory and in a directory
//2: a directory and not in a directory
//3: a directory and in a directory
