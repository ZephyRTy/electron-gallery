const mysql = require('mysql');
const fs = require('fs');
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'GALLERY'
});

connection.connect();

let sql = 'SELECT * FROM pack_list';
let addSql = 'INSERT INTO pack_list(pack_title) VALUES ?';
let content = [];
let path = 'D:\\img\\show_img\\图片';
let files = fs.readdirSync(path);
files.forEach((v) => {
	let time = fs.statSync(path + `\\${v}`).mtime;
	content.push({ name: v, time: time });
});
content.sort((a, b) => (a.time < b.time ? -1 : 1));
let addSqlParams = content.map((v) => [v.name]);
connection.query(addSql, [addSqlParams], function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log(result);
	}
	connection.end();
});
// connection.query(sql, function (err, result) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(result);
// 	}

// });
