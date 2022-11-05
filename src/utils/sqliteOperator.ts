/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable camelcase */
import { generalConfig } from '../config';
import {
	BasicData,
	BookmarkOfBook,
	DirectoryInfo,
	ImageBookmark,
	ImageDirectory,
	Mode,
	NormalImage
} from '../types/global';
import { formatDate, getAllDrive } from './functions';
import { RequestOperator } from './requestOperator';
/* eslint-disable no-underscore-dangle */
const sq3 = window.require('sqlite3');
const path = window.require('path');
const fs = window.require('fs');
// const transformToSQL = (obj: Object) => {
// 	let result = '';
// 	Object.keys(obj).forEach((key) => {
// 		result + `${key}=?,`;
// 	});
// 	return result.slice(0, -1);
// };
// const transformToSQLParams = (obj: Object) => {
// 	let result = [] as any[];
// 	Object.keys(obj).forEach((key) => {
// 		if (typeof obj[key] === 'string') {
// 			result.push(`'${obj[key]}'`);
// 		} else {
// 			result.push(obj[key]);
// 		}
// 	});
// 	return result;
// };
// 封装数据库操作
export class SqliteOperator implements RequestOperator {
	private static _instance: SqliteOperator;
	private db;
	private _pool: any;
	private hasExternalDriver: boolean = false;
	private loaded = false;
	private database: string = 'book';
	private mainTableName = 'book_list';
	count: number = 0;
	private constructor() {
		const dbPath = path.resolve(generalConfig.root, 'storage');
		if (!fs.existsSync(dbPath)) {
			fs.mkdirSync(dbPath);
		}
		this.db = new sq3.Database(path.resolve(dbPath, 'books.db'), () => {
			this.readerInitialize();
		});
		this.checkExternalDriver();
	}
	private readerInitialize() {
		const stmt1 = `CREATE TABLE if not exists directory (
			dir_id integer PRIMARY KEY AUTOINCREMENT ,
			dir_title varchar(100) NOT NULL,
			update_time timestamp NULL DEFAULT CURRENT_TIMESTAMP
		  )`;
		const stmt2 = `CREATE TABLE if not exists book_list (
			id integer  PRIMARY KEY AUTOINCREMENT ,
			title varchar(100) NOT NULL,
			path varchar(200) NOT NULL unique,
			stared tinyint(1) NOT NULL DEFAULT '0',
			parent int unsigned DEFAULT NULL,
			reg varchar(400) NOT NULL DEFAULT '[第卷][0123456789一二三四五六七八九十百千万亿零壹贰叁肆伍陆柒捌玖拾佰仟]+[章节回卷集部篇幕][^<]*',
			CONSTRAINT fk_book_id FOREIGN KEY (parent) REFERENCES directory (dir_id) ON DELETE SET NULL ON UPDATE CASCADE
		  ) `;
		const stmt3 = `CREATE TABLE if not exists bookmark (
			b_id int NOT NULL,
			b_timeStamp timestamp NULL DEFAULT CURRENT_TIMESTAMP,
			b_url varchar(100) NOT NULL,
			PRIMARY KEY (b_id),
			CONSTRAINT bookmark_ibfk_1 FOREIGN KEY (b_id) REFERENCES book_list (id) ON DELETE CASCADE ON UPDATE CASCADE
		  )`;
		const stmt4 = `CREATE TABLE if not exists mark (
			m_id int NOT NULL,
			m_timeStamp timestamp NULL DEFAULT NULL,
			line_num integer NOT NULL,
			CONSTRAINT fk_mark_id FOREIGN KEY (m_id) REFERENCES book_list (id) ON DELETE CASCADE ON UPDATE CASCADE
		  )`;
		this.db.run(stmt1, (arg: any) => {
			if (arg) console.log(arg);
		});
		this.db.run(stmt2, (arg: any) => {
			if (arg) console.log(arg);
		});
		this.db.run(stmt3, (arg: any) => {
			if (arg) console.log(arg);
		});
		this.db.run(stmt4, (arg: any) => {
			if (arg) console.log(arg);
		});
	}
	static getInstance(): SqliteOperator {
		if (!SqliteOperator._instance) {
			SqliteOperator._instance = new SqliteOperator();
		}
		return SqliteOperator._instance;
	}

	async checkExternalDriver() {
		if (this.loaded) {
			return this.hasExternalDriver;
		}
		const res = await getAllDrive();
		this.hasExternalDriver = !!res.find(
			(e) => e.name === 'BigHouse' && e.drive === 'E'
		);
		this.loaded = true;
		return this.hasExternalDriver;
	}

	getPackById(id: number) {
		const sql = `select * from ${this.mainTableName} where id = ?`;
		return new Promise((resolve, reject) => {
			if (this.count !== 0) {
				resolve(this.count);
			}
			this.db.get(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.length !== 1) {
						reject('查询结果不为1');
					}
					const v = result[0];
					resolve({
						id: v.id ?? v.dir_id,
						title: v.title ?? v.dir_title,
						path: v.path ?? '',
						cover: v.cover ?? v.dir_cover,
						stared: Boolean(v.stared ?? v.dir_stared),
						parent: v.parent,
						reg: v.reg
					});
				}
			});
		});
	}
	// eslint-disable-next-line no-unused-vars
	switchDatabase(database: string, tableName: string) {
		return true;
	}

	async select<Pack = NormalImage, Folder = ImageDirectory>(
		sqlParam: number[],
		mode: Mode
	): Promise<Pack[] | Folder[]> {
		if (mode === Mode.Normal && sqlParam.length !== 2) {
			throw new Error('sqlParam is not correct');
		}
		let sql = `select * from ${this.mainTableName} where ${
			this.hasExternalDriver ? '' : "path not like 'E%' and"
		} parent is null order by id desc limit ? ,?`;
		let dirId = '';
		switch (mode) {
			case Mode.Normal:
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} parent is null order by id desc limit ? ,?`;
				break;
			case Mode.Stared:
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} stared = 1 order by id desc`;
				break;
			case Mode.DirContent:
				dirId = window.location.href.match(/directory=([0-9]+)/)![1];
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} parent = ${dirId} order by id desc`;
				break;
			case Mode.ShowDirs:
				sql = `select * from directory order by update_time desc`;
				if (this.mainTableName === 'pack_list') {
					sql = `select * from directory,pack_list where cover_id = id order by update_time desc`;
				}
				break;
			case Mode.Bookmark:
				sql = `select id, title,path, b_cover as cover, b_url as url,
				 b_timeStamp as timeStamp, stared from bookmark, ${this.mainTableName} 
				 where ${
						this.hasExternalDriver ? '' : "path not like 'E%' and"
					} bookmark.b_id = ${
					this.mainTableName
				}.id order by b_timeStamp desc`;
				if (this.database === 'book') {
					sql = `select id, title,path, b_url as url, reg,
				 b_timeStamp as timeStamp, stared from bookmark, ${this.mainTableName} 
				 where ${
						this.hasExternalDriver ? '' : "path not like 'E%' and"
					} bookmark.b_id = ${
						this.mainTableName
					}.id order by b_timeStamp desc`;
				}
				break;
			default:
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} parent is not null order by id desc limit ? ,?`;
		}
		return new Promise((resolve, reject) => {
			this.db.all(sql, sqlParam, (err: any, result: any[]) => {
				if (err) {
					reject(err);
				} else {
					if (mode === Mode.Bookmark) {
						resolve(
							result.map((v: any) => {
								return {
									id: v.id,
									title: v.title,
									path: v.path,
									cover: v.cover,
									url: v.url,
									timeStamp: formatDate(
										new Date(v.timeStamp).toString()
									),
									stared: Boolean(v.stared),
									reg: v.reg
								} as unknown as Pack;
							})
						);
						return;
					} else if (mode === Mode.ShowDirs) {
						resolve(
							result.map((v: any) => {
								return {
									id: v.dir_id,
									title: v.dir_title,
									cover: v.path + v.cover,
									timeStamp:
										formatDate(
											new Date(v.update_time).toString()
										) ?? ''
								} as unknown as Folder;
							})
						);
						return;
					}
					resolve(
						result.map((v: any) => {
							return {
								id: v.id ?? v.dir_id,
								title: v.title ?? v.dir_title,
								path: v.path ?? '',
								cover: v.cover ?? v.dir_cover,
								stared: Boolean(v.stared ?? v.dir_stared),
								parent: v.parent,
								reg: v.reg
							} as unknown as Pack;
						})
					);
				}
			});
		});
	}
	getCount(): Promise<number> {
		let sql = `select count(*) as count from ${this.mainTableName} where ${
			this.hasExternalDriver ? '' : "path not like 'E%' and"
		} parent is null`;
		return new Promise((resolve, reject) => {
			if (this.count !== 0) {
				resolve(this.count);
			}
			this.db.get(sql, (err: any, result: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.count || 0);
				}
			});
		});
	}

	end() {
		this._pool.end();
		this.db.close();
	}

	async search<T extends BasicData>(
		sqlParam: string,
		mode: Mode,
		reg: boolean
	): Promise<T[]> {
		let sql = '';
		let dirId = '';
		let key = reg ? `regexp '${sqlParam}' ` : `like '%${sqlParam}%'`;
		switch (mode) {
			case Mode.Normal:
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} title ${key} order by id desc`;
				break;
			case Mode.Stared:
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} stared = 1 and title ${key} order by id desc`;
				break;
			case Mode.DirContent:
				dirId = window.location.href.match(/directory=([0-9]+)/)![1];
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} parent = ${dirId} and title ${key} order by id desc`;
				break;
			case Mode.ShowDirs:
				if (this.mainTableName === 'pack_list') {
					sql = `select * from directory, pack_list where ${
						this.hasExternalDriver ? '' : "path not like 'E%' and"
					} dir_title ${key} and directory.cover_id = pack_list.id order by update_time desc`;
				} else {
					sql = `select * from directory where ${
						this.hasExternalDriver ? '' : "path not like 'E%' and"
					} dir_title ${key} order by update_time desc`;
				}
				break;
			case Mode.Bookmark:
				sql = `select * from bookmark, ${
					this.mainTableName
				} where b_id = id and ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} title ${key} order by b_timeStamp desc`;
				break;
			default:
				sql = `select * from ${this.mainTableName} where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} title ${key} order by id desc`;
		}
		return new Promise((resolve, reject) => {
			this.db.all(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(
						result.map((v: any) => {
							return {
								id: v.dir_id ?? v.id,
								title: v.dir_title ?? v.title,
								path: mode === Mode.ShowDirs ? '' : v.path,
								cover:
									mode === Mode.ShowDirs
										? v.path + v.cover
										: v.cover,
								stared: Boolean(v.stared ?? v.dir_stared),
								parent: v.parent,
								reg: v.reg,
								timeStamp: v.update_time
							} as unknown as T;
						})
					);
				}
			});
		});
	}
	async updateStar<T extends BasicData>(data: T) {
		let sql = `update ${this.mainTableName} set stared = ? where id = ?`;
		let sqlParam = [data.stared ? 1 : 0, data.id];
		return new Promise((resolve, reject) => {
			this.db.run(sql, sqlParam, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}
	//TODO 文件夹封面的外键约束
	async updateDir(
		dirId: number,
		packId: number,
		status: 0 | 1,
		cover?: string
	) {
		let sql = `update ${this.mainTableName} set  parent = ? where id = ?`;
		let sqlParam = [status ? dirId : null, packId] as [
			number | null,
			number
		];
		if (cover) {
			if (status) {
				this.db.run(
					'update directory set cover_id = ? where  dir_id = ?',
					[packId, dirId],
					(err: any) => {
						if (err) {
							console.error(err);
						}
					}
				);
			} else {
				this.db.run(
					`update directory, (select id, title, parent from pack_list where id in 
						(select max(id) from pack_list where parent > 0 group by parent having id != ?)) as t
						set cover_id = t.id where  dir_id = ? and t.parent = dir_id`,
					[packId, dirId],
					(err: any) => {
						if (err) {
							console.error(err);
						}
					}
				);
			}
		}
		return new Promise((resolve, reject) => {
			this.db.run(sql, sqlParam, (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	mapDir(): Promise<Map<string, DirectoryInfo>> {
		let sql = `select dir_id as id, dir_title as title , count(parent) as count from directory left outer join ${this.mainTableName} on(dir_id = parent )
			  group by dir_id ;`;
		return new Promise((resolve, reject) => {
			this.db.all(sql, (err: any, result: any) => {
				if (err) {
					reject(err);
				}
				let map = new Map<string, DirectoryInfo>();
				result.forEach((v: any) => {
					map.set(v.id.toString(), {
						count: v.count,
						title: v.title
					});
				});
				resolve(map);
			});
		});
	}

	insertDir(newDir: { dir_title: string }): Promise<number | null> {
		let sql = 'insert into directory (dir_title, update_time) values (?,?)';
		return new Promise((resolve, reject) => {
			this.db.get(
				sql,
				[newDir.dir_title, formatDate(new Date())],
				(err: any, res: any) => {
					if (err) {
						console.error(err);
						reject(null);
					}
					resolve(res.lastID as number);
				}
			);
		});
	}

	insertPack(
		newPack: {
			title: string;
			stared: 0 | 1;
			path: string;
			cover?: string;
		},
		duplicate: boolean = false
	) {
		let sql = `insert into ${this.mainTableName} (title, stared, path) values ('${newPack.title}' , ${newPack.stared} , '${newPack.path}')`;
		return new Promise((resolve) => {
			this.db.run(sql, (res) => {
				if (res && !duplicate) {
					resolve(null);
					return;
				}
				resolve('ok');
			});
		});
	}

	updateGalleryBookmark(
		bookmark: ImageBookmark,
		marked: boolean,
		mode: 'insert' | 'update'
	) {
		let sql = marked
			? mode === 'insert'
				? 'insert into bookmark set ? '
				: 'update bookmark set ? where b_id = ?'
			: 'delete from bookmark where b_id = ?';
		return new Promise((resolve, reject) => {
			this.db.run(
				sql,
				marked
					? mode === 'insert'
						? {
								b_url: bookmark.url,
								b_cover: bookmark.cover,
								b_timeStamp: bookmark.timeStamp,
								b_id: bookmark.id
						  }
						: [
								{
									b_url: bookmark.url,
									b_cover: bookmark.cover,
									b_timeStamp: bookmark.timeStamp
								},
								bookmark.id
						  ]
					: [bookmark.id],
				(err: any, res: any) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	}
	updateBookmarkOfBook(
		bookmark: BookmarkOfBook,
		marked: boolean,
		mode: 'insert' | 'update'
	) {
		let sql = marked
			? mode === 'insert'
				? `insert into bookmark (b_id, b_url, b_timeStamp) values (?,?,?) `
				: `update bookmark set b_url=?, b_timeStamp=? where b_id = ?`
			: 'delete from bookmark where b_id = ?';
		return new Promise((resolve, reject) => {
			this.db.run(
				sql,
				marked
					? mode === 'insert'
						? [bookmark.id, bookmark.url, bookmark.timeStamp]
						: [bookmark.url, bookmark.timeStamp, bookmark.id]
					: [bookmark.id],
				(err: any, res: any) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				}
			);
		});
	}
	updateReg(id: number, reg: string) {
		// assert(
		// 	this.mainTableName === 'book_list',
		// 	'only book_list can update reg'
		// );
		let sql = `update ${this.mainTableName} set reg = ? where id = ?`;
		return new Promise((resolve, reject) => {
			this.db.run(sql, [reg, id], (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}
	renamePack(packID: number, title: string) {
		let sql = `update ${this.mainTableName} set title = ? where id = ?`;
		return new Promise((resolve, reject) => {
			this.db.run(sql, [title, packID], (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	renameDir(dirID: number, title: string) {
		let sql = 'update directory set dir_title = ? where dir_id = ?';
		return new Promise((resolve, reject) => {
			this.db.run(sql, [title, dirID], (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	changePackCover(packID: number, cover: string) {
		// assert(
		// 	this.mainTableName === 'pack_list',
		// 	'only pack_list can update cover'
		// );
		let sql = `update ${this.mainTableName} set cover = ? where id = ?`;
		return new Promise((resolve, reject) => {
			this.db.run(sql, [cover, packID], (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	delete(packID: number) {
		let sql = `delete from ${this.mainTableName} where id = ?`;
		return new Promise((resolve, reject) => {
			this.db.run(sql, [packID], (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}
}
export const sqliteOperator = SqliteOperator.getInstance();
