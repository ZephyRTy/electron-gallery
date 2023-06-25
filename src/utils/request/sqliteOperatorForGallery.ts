/* eslint-disable quotes */
/* eslint-disable camelcase */
import {
	BasicData,
	BookmarkOfBook,
	DirectoryInfo,
	ImageBookmark,
	ImageDirectory,
	Mode,
	NormalImage
} from '../../types/global';
import { formatDate } from '../functions/functions';
import { getAllDrive } from '../functions/process';
import { RequestOperator } from './requestOperator';
/* eslint-disable no-underscore-dangle */
const mysql = window.require('mysql');
const sq3 = window.require('sqlite3');
const path = window.require('path');
const fs = window.require('fs');
const os = window.require('os');
// 封装数据库操作
export class SqliteOperatorForGallery implements RequestOperator {
	private static _instance: SqliteOperatorForGallery;
	private db;
	private _pool: any;
	private _config: any;
	private _searchRes = { param: '', result: [] as string[] };
	private hasExternalDriver: boolean = false;
	private loaded = false;
	private init = false;
	private database: string = 'GALLERY';
	private mainTableName = 'pack_list';
	count: number = 0;
	private constructor() {
		this.checkExternalDriver();
		const dbPath = path.resolve(
			os.userInfo().homedir,
			'AppData',
			'Roaming',
			'y-Reader'
		);
		if (!fs.existsSync(dbPath)) {
			fs.mkdirSync(dbPath);
		}
		this.db = new sq3.Database(path.resolve(dbPath, 'gallery.db'), () => {
			this.readerInitialize();
		});
	}

	static getInstance(): SqliteOperatorForGallery {
		if (!SqliteOperatorForGallery._instance) {
			SqliteOperatorForGallery._instance = new SqliteOperatorForGallery();
		}
		return SqliteOperatorForGallery._instance;
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
			this.db.get(sql, [id], (err: any, result: any) => {
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
	switchDatabase() {
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
			this.db.all(sql, sqlParam, (err: any, result: any) => {
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
			this.db.all(sql, (err: any, result: any) => {
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
		let stmt = this.db.prepare(
			'insert into directory (dir_title, update_time) values (?,?)',
			[newDir.dir_title, formatDate(new Date())]
		);
		return new Promise((resolve, reject) => {
			stmt.run((err: any, res: any) => {
				if (err) {
					console.error(err);
					reject(null);
				}
				resolve(res.insertId as number);
			});
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
		const { title, stared, path, cover } = newPack;
		let stmt = this.db.prepare(
			`insert into ${this.mainTableName} (title, path, started, cover) values (?,?,?,?,)`,
			[title, path, stared, cover]
		);
		return new Promise((resolve) => {
			if (!newPack.cover) {
				delete newPack.cover;
			}
			stmt.run((err: any) => {
				if (err && !duplicate) {
					resolve(null);
					return;
				}
				resolve(stmt.lastID);
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
				? 'insert into bookmark (b_url, b_cover, b_timeStamp, b_id) values (?,?,?,?) '
				: 'update bookmark set b_url = ?, b_cover = ?, b_timeStamp = ? where b_id = ?'
			: 'delete from bookmark where b_id = ?';
		return new Promise((resolve, reject) => {
			this.db.run(
				sql,
				marked
					? mode === 'insert'
						? [
								bookmark.url,
								bookmark.cover,
								bookmark.timeStamp,
								bookmark.id
						  ]
						: [
								bookmark.url,
								bookmark.cover,
								bookmark.timeStamp,
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
	async updateBookmarkOfBook(
		_bookmark: BookmarkOfBook,
		_marked: boolean,
		_mode: 'insert' | 'update'
	) {}

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

	clearBookmark(): Promise<unknown> {
		const sql = 'truncate table bookmark';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, (err: any, res: any) => {
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		});
	}

	private readerInitialize() {
		const stmt1 = `CREATE TABLE if not exists directory (
			dir_id integer PRIMARY KEY AUTOINCREMENT ,
			dir_title varchar(255) NOT NULL,
			cover_id integer,
			update_time timestamp NULL DEFAULT CURRENT_TIMESTAMP
		  )`;
		const stmt2 = `CREATE TABLE if not exists pack_list (
			id integer  PRIMARY KEY AUTOINCREMENT ,
			title varchar(255) NOT NULL,
			path varchar(255) NOT NULL unique,
			stared tinyint(1) NOT NULL DEFAULT '0',
			parent int unsigned DEFAULT NULL,
			cover varchar(255),
			CONSTRAINT fk_pack_id FOREIGN KEY (parent) REFERENCES directory (dir_id) ON DELETE SET NULL ON UPDATE CASCADE
		  ) `;
		const stmt3 = `CREATE TABLE if not exists bookmark (
			b_id int NOT NULL,
			b_timeStamp timestamp NULL DEFAULT CURRENT_TIMESTAMP,
			b_url varchar(255) NOT NULL,
			b_cover varchar(255),
			PRIMARY KEY (b_id),
			CONSTRAINT bookmark_ibfk_1 FOREIGN KEY (b_id) REFERENCES pack_list (id) ON DELETE CASCADE ON UPDATE CASCADE
		  )`;
		this.db.run(stmt1, (arg) => {
			if (arg) console.log(arg);
		});
		this.db.run(stmt2, (arg) => {
			if (arg) console.log(arg);
		});
		this.db.run(stmt3, (arg) => {
			if (arg) console.log(arg);
		});
	}
}
export const sqliteOperatorForGallery = SqliteOperatorForGallery.getInstance();
