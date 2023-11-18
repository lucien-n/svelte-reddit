import type { Store } from '$lib/types';
import { writable } from 'svelte/store';
import { filterOutWindow } from '../helper';
import type { TWindow } from '../types';
import { desktop } from './deskop';

export type WindowStore = Store<TWindow> & {
	close: () => void;
};

export const createWindowStore = (win: TWindow): WindowStore => {
	const { subscribe, set, update } = writable<TWindow>(win);

	const close = () => {
		desktop.update(({ windows }) => {
			return {
				windows: windows.filter((desktopWin) => filterOutWindow(win.id, desktopWin))
			};
		});
	};

	return {
		subscribe,
		set,
		update,
		close
	};
};
