import type { Store } from '$lib/types';
import { writable } from 'svelte/store';
import type { TWindow } from '../types';

export type WindowStore = Store<TWindow> & {};

export const createWindowStore = (win: TWindow): WindowStore => {
	const { subscribe, set, update } = writable<TWindow>(win);

	return {
		subscribe,
		set,
		update
	};
};
