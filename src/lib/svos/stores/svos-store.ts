import { writable as svelteWritable } from 'svelte/store';

export const writable = <T>(value: T) => {
	const { subscribe, set, update } = svelteWritable<T>(value);

	const setField = <K extends keyof T>(field: K, value: T[K]) =>
		update((obj) => {
			obj[field] = value;
			return obj;
		});

	const getField = <K extends keyof T>(field: K): T[K] => {
		let value: T[K] | null = null;
		subscribe((obj) => (value = obj[field]));
		return value as any;
	};

	return {
		subscribe,
		set,
		update,
		setField,
		getField
	};
};
