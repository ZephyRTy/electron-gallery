/* eslint-disable quotes */
/* eslint-disable camelcase */
import { BasicData, Bookmark, DirectoryInfo, Mode } from '../types/global';
import { formatDate, hasExternalDriver } from './functions';

/* eslint-disable no-underscore-dangle */
const mysql = window.require('mysql');
// 封装数据库操作
export class MysqlOperator {
	private static _instance: MysqlOperator;
	private id = null as any;
	private _pool: any;
	private _config: any;
	private _searchRes = { param: '', result: [] as string[] };
	private hasExternalDriver: boolean = hasExternalDriver;
	private init = false;
	count: number = 0;
	private constructor() {
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

	async select(
		sqlParam: number[],
		mode: Mode
	): Promise<BasicData[] | Bookmark[]> {
		if (mode === Mode.Normal && sqlParam.length !== 2) {
			throw new Error('sqlParam is not correct');
		}
		let sql = `select * from pack_list where ${
			this.hasExternalDriver ? '' : "path not like 'E%' and"
		} parent is null order by id desc limit ? ,?`;
		let dirId = '';
		switch (mode) {
			case Mode.Normal:
				sql = `select * from pack_list where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} parent is null order by id desc limit ? ,?`;
				break;
			case Mode.Stared:
				sql = `select * from pack_list where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} stared = 1 order by id desc`;
				break;
			case Mode.InDir:
				dirId = window.location.href.match(/directory=([0-9]+)/)![1];
				sql = `select * from pack_list where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} parent = ${dirId} order by id desc`;
				break;
			case Mode.ShowDir:
				sql = `select * from directory order by update_time desc`;
				break;
			case Mode.Bookmark:
				sql = `select id, title,path, b_cover as cover, b_url as url,
				 b_timeStamp as timeStamp, stared from bookmark, pack_list 
				 where ${
						this.hasExternalDriver ? '' : "path not like 'E%' and"
					} bookmark.b_id = pack_list.id order by b_timeStamp desc`;
				break;
			default:
				sql = `select * from pack_list where ${
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
										id: v.id ?? v.dir_id,
										title: v.title ?? v.dir_title,
										path: v.path ?? '',
										cover: v.cover ?? v.dir_cover,
										url: v.url,
										timeStamp:
											formatDate(
												new Date(v.timeStamp).toString()
											) ?? 0,
										stared: Boolean(
											v.stared ?? v.dir_stared
										)
									} as BasicData;
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
									parent: v.parent
								} as BasicData;
							})
						);
					}
				});
			});
		});
	}
	getCount(): Promise<number> {
		let sql = `select count(*) as count from pack_list where ${
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

	async search(
		sqlParam: string,
		mode: Mode,
		reg: boolean
	): Promise<BasicData[]> {
		let sql = '';
		let dirId = '';
		let key = reg ? `regexp '${sqlParam}' ` : `like '%${sqlParam}%'`;
		switch (mode) {
			case Mode.Normal:
				sql = `select * from pack_list where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} title ${key} order by id desc`;
				break;
			case Mode.Stared:
				sql = `select * from pack_list where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} stared = 1 and title ${key} order by id desc`;
				break;
			case Mode.InDir:
				dirId = window.location.href.match(/directory=([0-9]+)/)![1];
				sql = `select * from pack_list where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} parent = ${dirId} and title ${key} order by id desc`;
				break;
			case Mode.ShowDir:
				sql = `select * from directory where ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} dir_title ${key} order by update_time desc`;
				break;
			case Mode.Bookmark:
				sql = `select * from bookmark, pack_list where b_id = id and ${
					this.hasExternalDriver ? '' : "path not like 'E%' and"
				} title ${key} order by b_timeStamp desc`;
				break;
			default:
				sql = `select * from pack_list where ${
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
									id: v.id ?? v.dir_id,
									title: v.title ?? v.dir_title,
									path: v.path ?? '',
									cover: v.cover ?? v.dir_cover,
									stared: Boolean(v.stared ?? v.dir_stared),
									parent: v.parent
								} as BasicData;
							})
						);
					}
				});
			});
		});
	}
	async updateStar(data: BasicData) {
		let sql = 'update pack_list set stared = ? where id = ?';
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
		let sql = 'update pack_list set  parent = ? where id = ?';
		let sqlParam = [status ? dirId : null, packId] as [
			number | null,
			number
		];
		return new Promise((resolve, reject) => {
			if (cover) {
				this._pool.getConnection((err: any, connection: any) => {
					connection.query(
						'update directory set dir_cover = ? where  dir_id = ?',
						[cover, dirId],
						(err: any) => {
							connection.release();
							if (err) {
								console.error(err);
							}
						}
					);
				});
			}
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
		let sql = `select dir_id as id, dir_title as title , count(parent) as count from directory left outer join pack_list on(dir_id = parent )
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

	insertDir(newDir: any): Promise<number | null> {
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
			cover: string;
		},
		duplicate: boolean = false
	) {
		let sql = 'insert into pack_list set ?';
		return new Promise((resolve) => {
			this._pool.getConnection((err: any, connection: any) => {
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

	updateBookmark(
		bookmark: Bookmark,
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

	renamePack(packID: number, title: string) {
		let sql = 'update pack_list set title = ? where id = ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, [title, packID], (err: any, res: any) => {
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
					if (err) {
						reject(err);
					}
					resolve(res);
				});
			});
		});
	}

	changePackCover(packID: number, cover: string) {
		let sql = 'update pack_list set cover = ? where id = ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, [cover, packID], (err: any, res: any) => {
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
