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

	select(sqlParam: number[]) {
		let sql =
			'select pack_title from pack_list where pack_id between ? and ?';
		return new Promise((resolve, reject) => {
			this._pool.getConnection((err: any, connection: any) => {
				connection.query(sql, sqlParam, (err: any, result: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(result.map((v: any) => v.pack_title));
					}
					connection.release();
				});
			});
		});
	}
	getCount() {
		let sql = 'select count(*) as count from pack_list';
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

	search(sqlParam: string) {
		let sql = 'select pack_title from pack_list where pack_title like ?';
		return new Promise((resolve, reject) => {
			if (this._searchRes.param === sqlParam) {
				resolve(this._searchRes.result);
			} else {
				this._pool.getConnection((err: any, connection: any) => {
					connection.query(sql, sqlParam, (err: any, result: any) => {
						if (err) {
							reject(err);
						} else {
							this._searchRes.param = sqlParam;
							this._searchRes.result = result.map(
								(v: any) => v.pack_title
							);
							resolve(this._searchRes.result);
						}
						connection.release();
					});
				});
			}
		});
	}
}
