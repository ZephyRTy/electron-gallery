import { StreamEntry } from './StreamEntry';

declare type DONE_SIG = -1;

declare type Pipe<T> = {
	target: StreamEntry<any, any, any> | null;
} & Generator<T, undefined, unknown>;
export const DONE_SIG_OF_PIPE = -1;
