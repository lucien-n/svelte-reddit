import type { Invalidator, Subscriber, Unsubscriber, Updater } from 'svelte/store';

export type Writable<T> = {
	subscribe: (
		this: void,
		run: Subscriber<T>,
		invalidate?: Invalidator<T> | undefined
	) => Unsubscriber;
	set: (this: void, value: T) => void;
	update: (this: void, updater: Updater<T>) => void;
	getField: <K extends keyof T>(field: K) => T[K];
	setField: <K extends keyof T>(field: K, value: T[K]) => void;
};
