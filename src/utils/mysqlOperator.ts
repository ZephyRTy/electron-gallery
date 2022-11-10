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
} from '../types/global';
import { formatDate } from './functions/functions';
import { getAllDrive } from './functions/process';
import { RequestOperator } from './requestOperator';
/* eslint-disable no-underscore-dangle */
const mysql = window.require('mysql');
// 封装数据库操作
export class MysqlOperator implements RequestOperator {
	private static _instance: MysqlOperator;
	private id = null as any;
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
		this._config = {
			host: 'localhost',
			user: 'root',
			password: '123456',
			database: 'GALLERY',
			port: 3306,
			connectionLimit: 10
		};
		this._pool = mysql.createPool(this._config);
	}

	static getInstance(): MysqlOperator {
		if (!MysqlOperator._instance) {
			MysqlOperator._instance = new MysqlOperator();
		}
		return MysqlOperator._instance;
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
			this._pool.getConnection((err: any, connection: any) => {
				connection?.query(sql, [id], (err: any, result: any) => {
					connection.release();
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
		});
	}
	switchDatabase(database: string, tableName: string) {
		if (database === this.database) {
			return false;
		}
		this.database = database;
		this.mainTableName = tableName;
		if (this._pool) {
			this._pool.end();
		}
		this._config = {
			host: 'localhost',
			user: 'root',
			password: '123456',
			database: this.database,
			port: 3306,
			connectionLimit: 10
		};
		this._pool = mysql.createPool(this._config);
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
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, result: any) => {
					connection.release();
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
												new Date(
													v.update_time
												).toString()
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
			this._pool.getConnection((err: any, connection: any) => {
				connection?.query(sql, (err: any, result: any) => {
					connection.release();
					if (err) {
						reject(err);
					} else {
						resolve(result[0].count);
					}
				});
			});
		});
	}

	end() {
		this._pool.end();
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
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, result: any) => {
					connection.release();
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
		});
	}
	async updateStar<T extends BasicData>(data: T) {
		let sql = `update ${this.mainTableName} set stared = ? where id = ?`;
		let sqlParam = [data.stared ? 1 : 0, data.id];
		return new Promise((resolve, reject) => {
			this._pool.getConnection(async (err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, res: any) => {
					connection.release();
					if (err) {
						reject(err);
					}
					resolve(res);
				});
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
				this._pool.getConnection((err: any, connection: any) => {
					connection.query(
						'update directory set cover_id = ? where  dir_id = ?',
						[packId, dirId],
						(err: any) => {
							connection.release();
							if (err) {
								console.error(err);
							}
						}
					);
				});
			} else {
				this._pool.getConnection((err: any, connection: any) => {
					connection.query(
						`update directory, (select id, title, parent from pack_list where id in 
							(select max(id) from pack_list where parent > 0 group by parent having id != ?)) as t
							set cover_id = t.id where  dir_id = ? and t.parent = dir_id`,
						[packId, dirId],
						(err: any) => {
							connection.release();
							if (err) {
								console.error(err);
							}
						}
					);
				});
			}
		}
		return new Promise((resolve, reject) => {
			this._pool.getConnection(async (err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, res: any) => {
					connection.release();
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		});
	}

	mapDir(): Promise<Map<string, DirectoryInfo>> {
		let sql = `select dir_id as id, dir_title as title , count(parent) as count from directory left outer join ${this.mainTableName} on(dir_id = parent )
			  group by dir_id ;`;
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, (err: any, result: any) => {
					connection.release();
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
		});
	}

	insertDir(newDir: { dir_title: string }): Promise<number | null> {
		let sql = 'insert into directory set ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, newDir, (err: any, res: any) => {
					connection.release();
					if (err) {
						console.error(err);
						reject(null);
					}
					resolve(res.insertId as number);
				});
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
		let sql = `insert into ${this.mainTableName} set ?`;
		return new Promise((resolve) => {
			this._pool.getConnection((err: any, connection: any) => {
				if (!newPack.cover) {
					delete newPack.cover;
				}
				connection.query(sql, newPack, (err: any, res: any) => {
					connection.release();
					if (err && !duplicate) {
						resolve(null);
						return;
					}
					resolve(res);
				});
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
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(
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
						connection.release();
						if (err) {
							reject(err);
						}
						resolve(res);
					}
				);
			});
		});
	}
	updateBookmarkOfBook(
		bookmark: BookmarkOfBook,
		marked: boolean,
		mode: 'insert' | 'update'
	) {
		let sql = marked
			? mode === 'insert'
				? 'insert into bookmark set ? '
				: 'update bookmark set ? where b_id = ?'
			: 'delete from bookmark where b_id = ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(
					sql,
					marked
						? mode === 'insert'
							? {
									b_url: bookmark.url,
									b_timeStamp: bookmark.timeStamp,
									b_id: bookmark.id
							  }
							: [
									{
										b_url: bookmark.url,
										b_timeStamp: bookmark.timeStamp
									},
									bookmark.id
							  ]
						: [bookmark.id],
					(err: any, res: any) => {
						connection.release();
						if (err) {
							reject(err);
						}
						resolve(res);
					}
				);
			});
		});
	}
	updateReg(id: number, reg: string) {
		// assert(
		// 	this.mainTableName === 'book_list',
		// 	'only book_list can update reg'
		// );
		let sql = `update ${this.mainTableName} set reg = ? where id = ?`;
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, [reg, id], (err: any, res: any) => {
					connection.release();
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		});
	}
	renamePack(packID: number, title: string) {
		let sql = `update ${this.mainTableName} set title = ? where id = ?`;
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, [title, packID], (err: any, res: any) => {
					connection.release();
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		});
	}

	renameDir(dirID: number, title: string) {
		let sql = 'update directory set dir_title = ? where dir_id = ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, [title, dirID], (err: any, res: any) => {
					connection.release();
					if (err) {
						reject(err);
					}
					resolve(res);
				});
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
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, [cover, packID], (err: any, res: any) => {
					connection.release();
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		});
	}

	delete(packID: number) {
		let sql = `delete from ${this.mainTableName} where id = ?`;
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, [packID], (err: any, res: any) => {
					connection.release();
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		});
	}
}
export const mysqlOperator = MysqlOperator.getInstance();
