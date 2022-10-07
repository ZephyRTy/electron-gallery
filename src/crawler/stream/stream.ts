/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-class-members */

/**
 * 自行实现的一个爬虫库，支持流水线式爬虫
 */
import { Pipe } from '../types/pipe';
import { StreamEntry } from '../types/StreamEntry';
import { HasProperty, midType } from '../types/types';
import { Exit } from './exit';
import { Req } from './req';
export { Stream };
type Status = {
	open: boolean;
	clear: () => void;
	queue: any[];
	len: number;
	name: () => string;
};
const isString = (v: any): v is string => {
	return typeof v === 'string';
};
class Stream<IN, MID, OUT> extends StreamEntry<IN, MID, OUT> {
	protected pool: OUT[] = []; //输出结果池
	name = '';
	//输出结果池
	private id: any = null;
	private awaitedQueue: midType<IN, MID>[] = [];
	protected pendingQueue: Promise<any>[] = [];
	protected option: any = null;
	protected netOptions: any = null;
	private prevPipeClosed = false;
	private status: Status = {
		open: true,
		name: () => {
			return this.name;
		},
		queue: this.awaitedQueue,
		clear: () => {
			if (this.id) {
				clearInterval(this.id);
			}
		},
		get len() {
			return this.queue.length;
		}
	};
	protected pipe: Pipe<OUT> = (function* (pool: OUT[], status: Status) {
		while (true) {
			if (!status.open && pool.length === 0 && status.len === 0) {
				console.log(status.name() + ' is empty');
				return;
			}
			let el = pool.shift();
			yield el;
		}
	})(this.pool, this.status) as any;
	preprocessor: null | ((data: IN) => midType<IN, MID> | midType<IN, MID>[]) =
		null; // 处理输入数据
	// 处理HTML数据,并输出
	constructor(
		parser: (body: any, data: MID) => OUT[],
		options?: any,
		inType?: IN
	) {
		super();
		this.parser = parser ?? null;
		this.connection = null;
		this.pipe.target = null;
		this.option = options;
		if (options?.interval) {
			this.id = setInterval(() => {
				if (this.prevPipeClosed && this.awaitedQueue.length === 0) {
					this.readyToClose();
					return;
				}
				if (this.awaitedQueue.length === 0) {
					return;
				}
				let data = this.awaitedQueue.shift();
				if (!data) {
					return;
				}
				this.get(data);
			}, options.interval);
		}
	}

	setParser(parser: (body: any, data: MID) => OUT[]) {
		this.parser = parser;
	}

	setPreprocessor(
		preprocessor: (data: IN) => midType<IN, MID> | midType<IN, MID>[]
	) {
		this.preprocessor = preprocessor;
	}
	setNetOptions(options: any) {
		this.netOptions = options;
		return this;
	}
	setOption(option: any) {
		this.option = option;
	}
	/**
	 * 将内部管道连接至下一个工作流
	 * @param nextStream 下一个工作流
	 * @returns 下一个工作流
	 */
	next<T, K, A, B>(
		nextStream: Stream<OUT, K, T> | ((body: any, data: K) => T[]),
		option?: any
	): Stream<OUT, K, T> {
		if (!(nextStream instanceof Stream)) {
			let n = new Stream<OUT, K, T>(nextStream, option);
			this.pipe.target = n;
			n.connection = this.pipe;
			return n;
		}
		this.pipe.target = nextStream;
		nextStream.connection = this.pipe;
		return nextStream;
	}

	/**
	 * 从外部管道中抽取数据
	 */
	extract() {
		let { value, done } = (this.connection?.next() as {
			value: IN;
			done: boolean;
		}) || { value: null, done: true };
		if (done) {
			this.connection = null;
			this.prevPipeClosed = true;
			if (!this.id) {
				this.readyToClose();
			}
			return;
		}

		type Check<T> = T extends
			| string
			| string[]
			| HasProperty<MID, 'url', string>
			| HasProperty<MID, 'url', string>[]
			? T
			: never;
		if ((typeof value as Check<IN>) === 'never' && !this.preprocessor) {
			throw new Error('preprocessor is not defined');
		}
		let v = this.preprocessor ? this.preprocessor(value) : (value as any);
		if (this.id) {
			this.awaitedQueue.push(v);
		} else if (v) {
			this.get(v);
		}
	}

	private get(url: midType<IN, MID> | midType<IN, MID>[]) {
		if (url instanceof Array) {
			url.forEach((url) => {
				if (isString(url)) {
					this.pending(Req.get({ url }, this.netOptions));
				} else {
					this.pending(Req.get(url, this.netOptions));
				}
			});
		} else if (typeof url === 'string') {
			this.pending(Req.get({ url }, this.netOptions));
		} else {
			this.pending(Req.get(url, this.netOptions));
		}
	}
	exec(url: midType<IN, MID> | midType<IN, MID>[]) {
		if (this.id) {
			if (Array.isArray(url)) {
				this.awaitedQueue.push(...url);
			} else {
				this.awaitedQueue.push(url);
			}
		} else {
			this.get(url);
			this.readyToClose();
		}
		return this;
	}

	/**
	 * 往数据池中注入数据
	 * @param res 输入的数据
	 */
	protected inject(res: HasProperty<MID, 'body'>) {
		let { body, ...data } = res as any;
		if (!this.parser) {
			throw Error('parser is not defined');
		}
		let result = this.parser(body, data);
		let count = 1;
		if (Array.isArray(result)) {
			this.push(...result);
			count = result.length;
			if (count === 0) {
				return;
			}
		} else {
			this.push(result);
		}
		for (let i = 0; i < count; i++) {
			this.pipe.target?.extract();
		}
	}

	protected pending(req: Promise<any>) {
		let res = req
			.then((res) => {
				if (res.length === 0) {
					return;
				}
				this.inject(res);
			})
			.catch((e) => {
				console.log(e);
			});
		this.pendingQueue.push(req);
	}
	/**
	 *
	 * @param req 输入的网络请求
	 * @param processor 对输出结果的处理
	 */

	/**
	 * 上级管道关闭时，调用此方法
	 */
	async readyToClose() {
		Promise.allSettled(this.pendingQueue)
			.then(() => {
				this.status.open = false;
				this.status.clear();
				this.pipe.target?.extract();
			})
			.catch((e: Error) => {
				console.log(this.name, e.message);
			});
	}
	protected push(...data: OUT[]) {
		this.pool.push(...data);
	}
	async break() {
		if (this.pendingQueue.length === 0) {
			return [];
		}
		await this.readyToClose();
		return this.pool;
	}
	//static create<A,B,C>(parser?: (body: any, data: B) => C[], options?: any,inType?:C): Stream<A, B, C> ;

	static create<A, B, C>(
		parser: (body: any, data: B) => C[],
		options?: any
	): Stream<HasProperty<B, 'url', string>, B, C>;
	static create<A, B, C>(
		parser: (body: any, data: B) => C[],
		options?: any,
		inType?: A
	): Stream<A, B, C>;
	static create<A, B, C>(
		parser: (body: any, data: B) => C[],
		options?: any,
		inType?: A
	) {
		if (inType) {
			return new Stream<A, B, C>(parser, options, inType);
		}
		return new Stream<HasProperty<B, 'url', string>, B, C>(parser, options);
	}
	output(endParser: (data: OUT) => void, options?: any) {
		let exit = new Exit(endParser, options);
		this.pipe.target = exit;
		exit.connection = this.pipe;
		return exit;
	}
}
