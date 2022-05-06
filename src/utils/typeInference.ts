/* eslint-disable no-unused-vars */
type basic<T> = T extends TYPE.NUMBER
	? number
	: T extends TYPE.BOOLEAN
	? boolean
	: T extends TYPE.STRING
	? string
	: T extends TYPE.NULL
	? null
	: T extends TYPE.UNDEFINED
	? undefined
	: never;

enum TYPE {
	NUMBER,
	BOOLEAN,
	STRING,
	NULL,
	UNDEFINED
}
const NUMBER = TYPE.NUMBER;
const BOOLEAN = TYPE.BOOLEAN;
const STRING = TYPE.STRING;
const NULL = TYPE.NULL;
const UNDEFINED = TYPE.UNDEFINED;
export { NUMBER, BOOLEAN, STRING, NULL, UNDEFINED };
export type parseObject<T> = T extends (infer R)[]
	? parseObject<R>[]
	: T extends object
	? {
			[P in keyof T]: basic<T[P]> extends never
				? parseObject<T[P]>
				: basic<T[P]>;
	  }
	: basic<T>;
