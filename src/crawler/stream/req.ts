import { midType } from '../types/types';

const request = window.require('request');

export type body<T> = T & {
	body: unknown;
};
export class Req {
	static options: any = null;
	private constructor() {}
	static get<K, T>(targetURL: midType<K, T>, options?: any) {
		let netOptions = options ?? Req.options;
		return new Promise((resolve, reject) => {
			let { url, ...data } =
				typeof targetURL === 'string'
					? { url: targetURL }
					: (targetURL as any);
			if (url.length === 0) {
				resolve('');
				return;
			}
			request.get(
				{ url, ...netOptions },
				(err: any, res: any, body: any) => {
					if (res?.statusCode !== 200) {
						console.log(res?.statusCode, url);
					}
					if (err) {
						reject(err);
					} else {
						resolve({ body, ...data });
					}
				}
			);
		});
	}
}
