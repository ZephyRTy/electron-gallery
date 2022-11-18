/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable camelcase */
import {
	BasicData,
	BookmarkOfBook,
	DirectoryInfo,
	EpubMark,
	ImageBookmark,
	ImageDirectory,
	Mode,
	NormalImage,
	SelectionInfo
} from '../../types/global';
import { formatDate, generateFileMd5 } from '../functions/functions';
import { getAllDrive } from '../functions/process';
import { RequestOperator } from './requestOperator';
/* eslint-disable no-underscore-dangle */
const sq3 = window.require('sqlite3');
const path = window.require('path');
const fs = window.require('fs');
const os = window.require('os');
const transformToSQL = <T extends object>(table: string, obj: T) => {
	let columns = '(';
	let values = '';
	Object.keys(obj).forEach((key) => {
		columns += `${key},`;
		if (typeof obj[key] === 'string') {
			values += `'${obj[key]}',`;
		} else {
			values += `${obj[key]},`;
		}
	});
	columns = columns.slice(0, -1) + ')';
	values = values.slice(0, -1);
	return `insert into ${table} ` + columns + ' VALUES (' + values + ')';
};
// 封装数据库操作
//TODO 重构，将图片数据库和文本数据库操作分开
export class SqliteOperatorForBook implements RequestOperator {
	private static _instance: SqliteOperatorForBook;
	private db;
	private _pool: any;
	private hasExternalDriver: boolean = false;
	private loaded = false;
	private database: string = 'book';
	private mainTableName = 'book_list';
	count: number = 0;
	private constructor() {
		const dbPath = path.resolve(
			os.userInfo().homedir,
			'AppData',
			'Roaming',
			'YReader'
		);
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
			anchor_index integer NOT NULL,
			anchor_offset integer NOT NULL,
			focus_index integer NOT NULL,
			focus_offset integer NOT NULL,
			comment varchar(600) default NULL,
			PRIMARY KEY (m_id, anchor_index, anchor_offset),
			CONSTRAINT fk_mark_id FOREIGN KEY (m_id) REFERENCES book_list (id) ON DELETE CASCADE ON UPDATE CASCADE
		  )`;
		const stmt5 = `CREATE TABLE if not exists epub_mark (
			m_id int NOT NULL,
			m_timeStamp timestamp NULL DEFAULT NULL,
			cfi varchar(100) NOT NULL,
			comment varchar(600) default NULL,
			PRIMARY KEY (m_id, cfi),
			CONSTRAINT fk_epub_mark_id FOREIGN KEY (m_id) REFERENCES book_list (id) ON DELETE CASCADE ON UPDATE CASCADE
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
		this.db.run(stmt5, (arg: any) => {
			if (arg) console.log(arg);
		});
	}
	static getInstance(): SqliteOperatorForBook {
		if (!SqliteOperatorForBook._instance) {
			SqliteOperatorForBook._instance = new SqliteOperatorForBook();
		}
		return SqliteOperatorForBook._instance;
	}

	async getMarks(bookId: number): Promise<SelectionInfo[]> {
		return new Promise((resolve, reject) => {
			this.db.all(
				`select * from mark where m_id = ${bookId} order by anchor_index, anchor_offset`,
				(err: any, res: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(
							res.map((e) => {
								return {
									anchorIndex: e.anchor_index,
									anchorOffset: e.anchor_offset,
									focusIndex: e.focus_index,
									focusOffset: e.focus_offset,
									comment: e.comment,
									timestamp: e.m_timeStamp
								} as SelectionInfo;
							})
						);
					}
				}
			);
		});
	}

	async getEpubMarks(bookId: number): Promise<EpubMark[]> {
		return new Promise((resolve, reject) => {
			this.db.all(
				`select * from epub_mark where m_id = ${bookId}`,
				(err: any, res: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(
							res.map((e) => {
								return {
									cfi: e.cfi,
									comment: e.comment,
									timestamp: e.m_timeStamp,
									data: ''
								} as EpubMark;
							})
						);
					}
				}
			);
		});
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

	/**
	 *
	 * @param id
	 * @param md5
	 * @returns 与数据库中的md5值相同则返回true
	 */
	async verifyBook(id: number, md5: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.db.get(
				`select md5 from book_list where id = ${id}`,
				(err: any, res: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(res.md5 === md5);
					}
				}
			);
		});
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
				result?.forEach((v: any) => {
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
		let stmt = this.db.prepare(
			'insert into directory (dir_title, update_time) values (?,?)',
			[newDir.dir_title, formatDate(new Date())]
		);
		return new Promise((resolve, reject) => {
			stmt.run((err: any) => {
				if (err) {
					console.error(err);
					reject(null);
				}
				resolve(stmt.lastID);
			});
		});
	}

	async insertPack(
		newPack: {
			title: string;
			stared: 0 | 1;
			path: string;
			cover?: string;
		},
		duplicate: boolean = false
	) {
		const md5 = generateFileMd5(newPack.path);
		let sql = `insert into ${this.mainTableName} (title, stared, path, md5) values ('${newPack.title}' , ${newPack.stared} , '${newPack.path}', '${md5}')`;
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

	clearMarkInfo(bookId: number) {
		let sql = `delete from mark where m_id = ?`;
		return new Promise((resolve, reject) => {
			this.db.run(sql, [bookId], (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
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
	async updateMd5(id: number, md5: string) {
		let sql = `update ${this.mainTableName} set md5 = ? where id = ?`;
		let sqlParam = [md5, id];
		return new Promise((resolve, reject) => {
			this.db.run(sql, sqlParam, (err, res) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		});
	}

	//TODO 插入注释

	insertMark(id: number, selection: SelectionInfo) {
		let sql = transformToSQL('mark', {
			m_id: id,
			m_timeStamp: formatDate(new Date()),
			anchor_index: selection.anchorIndex,
			focus_index: selection.focusIndex,
			anchor_offset: selection.anchorOffset,
			focus_offset: selection.focusOffset
		});

		return new Promise((resolve, reject) => {
			this.db.run(sql, (err: any, res: any) => {
				if (err) {
					console.log(err);

					reject(err);
				}
				resolve(res);
			});
		});
	}
	insertEpubMark(id: number, cfi: string, timestamp: string) {
		let sql = transformToSQL('epub_mark', {
			m_id: id,
			m_timeStamp: timestamp,
			cfi
		});

		return new Promise((resolve, reject) => {
			this.db.run(sql, (err: any, res: any) => {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(res);
			});
		});
	}
	async removeMark(id: number, selection: SelectionInfo | null) {
		if (!selection) {
			throw new Error('selection is null');
		}
		let sql = `delete from mark where m_id = ${id} and anchor_index = ${selection.anchorIndex} and anchor_offset = ${selection.anchorOffset}`;
		return new Promise((resolve, reject) => {
			this.db.run(sql, (err: any, res: any) => {
				if (err) {
					console.log(err);
					reject(err);
				}
				resolve(res);
			});
		});
	}

	async removeEpubMark(id: number, cfi: string) {
		if (!cfi) {
			throw new Error('epubMark is null');
		}
		let sql = `delete from epub_mark where m_id = ? and cfi = ?`;
		return new Promise((resolve, reject) => {
			this.db.run(sql, [id, cfi], (err: any, res: any) => {
				if (err) {
					console.log(err);
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
export const sqliteOperator = SqliteOperatorForBook.getInstance();
