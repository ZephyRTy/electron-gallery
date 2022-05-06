/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs/promises';
export class Database<T> {
	private static readonly root: string = '../../json/';
	private data: any;
	private name: string;
	constructor(name: string) {
		this.name = name;
	}
	read() {
		fs.readFile(Database.root + this.name, 'utf-8')
			.then((data) => {
				this.data = JSON.parse(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	static connect<T>(name: string) {
		const database = new Database<T>(name);
		return database;
	}
}
