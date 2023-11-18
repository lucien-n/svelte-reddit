import type { Invalidator, Subscriber, Unsubscriber, Updater } from 'svelte/store';

export type Store<T> = {
	subscribe: (
		this: void,
		run: Subscriber<T>,
		invalidate?: Invalidator<T> | undefined
	) => Unsubscriber;
	set: (this: void, value: T) => void;
	update: (this: void, updater: Updater<T>) => void;
};
