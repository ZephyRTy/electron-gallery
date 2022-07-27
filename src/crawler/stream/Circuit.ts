/* eslint-disable no-unused-vars */
import { HasProperty } from '../types/types';
import { Req } from './req';
import { Stream } from './stream';
// 对当前页面循环爬取
export class Circuit<IN, MID, OUT> extends Stream<IN, MID, OUT> {
	private urlPool: string[] = [];
	private urlParser: (body: unknown) => string[] | string;
	private max = 0;
	private count = 0;
	private closed = false;
	constructor(
		urlParser: (body: unknown) => string[] | string,
		parser: (body: unknown, data: MID) => OUT[],
		options?: any
	) {
		super(parser, options);
		this.max = options?.['max'] ?? 0;
		this.urlParser = urlParser;
	}
	collect(url: string) {
		this.pending(Req.get(url, this.netOptions));
		return this;
	}
	private getNewUrl(body: unknown) {
		if (this.closed) {
			return;
		}
		if (this.max > 0 && this.count >= this.max) {
			this.readyToClose();
			this.closed = true;
			return;
		}
		++this.count;
		let url = this.urlParser(body);
		if (!url || url.length === 0) {
			this.readyToClose();
			this.closed = true;
			return;
		}
		if (Array.isArray(url)) {
			this.urlPool.push(...url);
		} else {
			this.urlPool.push(url);
		}
		this.collect(this.urlPool.shift() as string);
	}
	protected inject(res: HasProperty<MID, 'body'>) {
		let { body, ...data } = res as any;
		if (!this.parser) {
			throw Error('parser is not defined');
		}
		let result = this.parser(body, data);
		let count = 1;
		if (Array.isArray(result)) {
			if (result.length === 0) {
				return;
			}
			count = result.length;
			this.push(...result);
		} else {
			this.push(result);
		}
		for (let i = 0; i < count; i++) {
			this.pipe.target?.extract();
		}
	}

	protected pending(req: Promise<any>) {
		this.pendingQueue.push(req);
		req.then((res: HasProperty<MID, 'body'>) => {
			this.inject(res);
			this.getNewUrl((res as any).body);
		});
	}
}
