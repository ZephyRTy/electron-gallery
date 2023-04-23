import { readerR18 } from '../../types/constant';

class CatalogCache {
	private db: IDBOpenDBRequest;
	constructor() {
		this.db = indexedDB.open(readerR18 ? 'catalogCache' : 'testCache', 1);
		this.db.onupgradeneeded = () => {
			const res = this.db.result;
			const objectStore = res.createObjectStore('catalog', {
				keyPath: 'id'
			});
			objectStore.createIndex('chapter', 'chapter', { unique: false });
		};
	}

	async getCachedCatalog(id: number) {
		return new Promise((resolve) => {
			const transaction = this.db.result.transaction(
				['catalog'],
				'readwrite'
			);
			const req = transaction.objectStore('catalog').get(id);
			req.onsuccess = () => {
				resolve(req.result?.catalog || '[]');
			};
		});
	}

	async setCachedCatalog(id: number, catalog: string) {
		return new Promise((resolve) => {
			const transaction = this.db.result.transaction(
				['catalog'],
				'readwrite'
			);
			const req = transaction.objectStore('catalog').put({
				id,
				catalog
			});
			req.onsuccess = () => {
				resolve(req.result);
			};
		});
	}
}

export const catalogCache = new CatalogCache();
