/* eslint-disable camelcase */
import { BasicData, Bookmark, DirectoryInfo, Mode } from '../types/global';
import { formatDate } from './functions';

/* eslint-disable no-underscore-dangle */
const mysql = window.require('mysql');

export class MysqlOperator {
	private static _instance: MysqlOperator;
	private _pool: any;
	private _config: any;
	private _searchRes = { param: '', result: [] as string[] };
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
		let sql =
			'select * from pack_list where status = 0 order by id desc limit ? ,?';
		let dirId = '';
		switch (mode) {
			case Mode.Normal:
				sql =
					'select * from pack_list where status = 0 order by id desc limit ? ,?';
				break;
			case Mode.Stared:
				sql =
					'select * from pack_list where stared = 1 order by id desc';
				break;
			case Mode.InDir:
				dirId = window.location.href.match(/directory=([0-9]+)/)![1];
				sql = `select * from pack_list where parent = ${dirId} order by id desc`;
				break;
			case Mode.ShowDir:
				sql = 'select * from directory order by dir_id desc';
				break;
			case Mode.Bookmark:
				sql =
					'select id, title,path, b_cover as cover, b_url as url, b_timeStamp as timeStamp from bookmark, pack_list where bookmark.b_id = pack_list.id';
				break;
			default:
				sql =
					'select * from pack_list where status = 0 order by id desc limit ? ,?';
		}
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, result: any) => {
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
										status: v.status ?? 0,
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
									status: v.status ?? 0,
									stared: Boolean(v.stared ?? v.dir_stared)
								} as BasicData;
							})
						);
					}
					connection.release();
				});
			});
		});
	}
	getCount(): Promise<number> {
		let sql = 'select count(*) as count from pack_list where status = 0';
		return new Promise((resolve, reject) => {
			if (this.count !== 0) {
				resolve(this.count);
			}
			this._pool.getConnection((err: any, connection: any) => {
				connection?.query(sql, (err: any, result: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(result[0].count);
					}
					connection.release();
				});
			});
		});
	}

	end() {
		this._pool.end();
	}

	async search(sqlParam: string, mode: Mode): Promise<BasicData[]> {
		let sql = '';
		let dirId = '';
		switch (mode) {
			case Mode.Normal:
				sql = `select * from pack_list where title like '%${sqlParam}%'`;
				break;
			case Mode.Stared:
				sql = `select * from pack_list where stared = 1 and title like '%${sqlParam}%'`;
				break;
			case Mode.InDir:
				dirId = window.location.href.match(/directory=([0-9]+)/)![1];
				sql = `select * from pack_list where parent = ${dirId} and title like '%${sqlParam}%'`;
				break;
			case Mode.ShowDir:
				sql = `select * from directory where dir_title like '%${sqlParam}%'`;
				break;
			case Mode.Bookmark:
				sql = `select * from bookmark where title like '%${sqlParam}%'`;
				break;
			default:
				sql = `select * from pack_list where title like '%${sqlParam}%'`;
		}
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, result: any) => {
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
									status: v.status ?? 0,
									stared: Boolean(v.stared ?? v.dir_stared)
								} as BasicData;
							})
						);
					}
					connection.release();
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
		let sql = 'update pack_list set status = ?, parent = ? where id = ?';
		let sqlParam = [status, status ? dirId : null, packId] as [
			number,
			number | null,
			number
		];
		return new Promise((resolve, reject) => {
			if (cover) {
				this._pool.getConnection((err: any, connection: any) => {
					connection.query(
						'update directory set dir_cover = ? where dir_id = ?',
						[cover, dirId],
						(err: any) => {
							if (err) {
								console.error(err);
							}
						}
					);
				});
			}
			this._pool.getConnection(async (err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, res: any) => {
					if (err) {
						reject(err);
					}
					resolve(res);
					connection.release();
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
					connection.release();
				});
			});
		});
	}

	insertDir(newDir: any) {
		let sql = 'insert into directory set ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, newDir, (err: any) => {
					if (err) {
						reject(err);
					}
				});
			});
		});
	}

	insertPack(newPack: any) {
		let sql = 'insert into pack_list set ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, newPack, (err: any, res: any) => {
					if (err) {
						reject(err);
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
						if (err) {
							reject(err);
						}
						resolve(res);
					}
				);
			});
		});
	}
}
export const mysqlOperator = MysqlOperator.getInstance();
