import type { Store } from '$lib/types';
import { nanoid } from 'nanoid';
import { writable } from 'svelte/store';
import type { TDesktop, TWindow } from '../types';
import { createWindowStore, type WindowStore } from './window';

export type WindowInitSettings = Pick<TWindow, 'pos' | 'size'>;

export type DesktopStore = Store<TDesktop> & {
	createWindow: (settins: WindowInitSettings) => WindowStore;
};

export const createDesktopStore = (): DesktopStore => {
	const { subscribe, set, update } = writable<TDesktop>({
		windows: []
	});

	const createWindow = (settings: WindowInitSettings) => {
		const { pos, size } = settings;

		const win = createWindowStore({
			id: nanoid(),
			pos,
			size,
			isFullscreen: false,
			isMinimized: false
		} satisfies TWindow);

		update(({ windows }) => {
			return {
				windows: [...windows, win]
			};
		});

		return win;
	};

	return {
		subscribe,
		set,
		update,
		createWindow
	};
};
