import type { Store } from '$lib/types';
import { writable } from 'svelte/store';
import { filterOutWindow } from '../helper';
import type { TWindow, Vector } from '../types';
import { desktop } from './deskop';

export type WindowStore = Store<TWindow> & {
	close: () => void;
	toggleFullscreen: () => void;
};

export const createWindowStore = (win: TWindow): WindowStore => {
	const { subscribe, set, update } = writable<TWindow>(win);

	let lastSize: Vector = win.size;
	let lastPosition: Vector = win.pos;

	const close = () => {
		desktop.update(({ windows }) => {
			return {
				windows: windows.filter((desktopWin) => filterOutWindow(win.id, desktopWin))
			};
		});
	};

	const toggleFullscreen = () => {
		update((win) => {
			win.isFullscreen = !win.isFullscreen;

			if (win.isFullscreen) {
				lastPosition = win.pos;
				lastSize = win.size;
				win.size = [window.innerWidth - 1, window.innerHeight - 1];
				win.pos = [0, 0];
			} else {
				win.pos = lastPosition;
				win.size = lastSize;
			}

			return win;
		});
	};

	return {
		subscribe,
		set,
		update,
		close,
		toggleFullscreen
	};
};
