import { get, writable as svelteWritable } from 'svelte/store';

export const writable = <T>(value: T) => {
	const store = svelteWritable<T>(value);
	const { subscribe, set, update } = store;

	const setField = <K extends keyof T>(field: K, value: T[K]) =>
		update((obj) => {
			return { ...obj, [field]: value };
		});

	const getField = <K extends keyof T>(field: K): T[K] => get(store)[field];

	return {
		subscribe,
		set,
		update,
		setField,
		getField
	};
};
