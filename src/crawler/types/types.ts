export type HasProperty<
	T,
	K extends keyof any,
	U = undefined
> = K extends keyof T
	? T
	: T & {
			[P in K]: U extends undefined ? any : U;
	  };
export type Url<T> = T extends string ? { url: T } : T;
export type midType<K, T> = T extends object
	? HasProperty<T, 'url', string>
	: K;
