import { writable } from 'svelte/store';
import type { ManagerStore, TWindow } from '../types';

export const createManager = (): ManagerStore => {
	const { subscribe, set, update } = writable<TWindow[]>([]);

	return {
		subscribe,
		set,
		update
	};
};
