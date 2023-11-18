import type { Store } from '$lib/types';
import { writable } from 'svelte/store';
import { filterOutWindow } from '../helper';
import type { TWindow, Vector } from '../types';
import { desktop } from './deskop';

export type WindowStore = Store<TWindow> & {
	close: () => void;
	toggleFullscreen: () => void;
	startDragging: (pos: Vector) => void;
	drag: (pos: Vector) => void;
};

export const createWindowStore = (win: TWindow): WindowStore => {
	const { subscribe, set, update } = writable<TWindow>(win);

	let lastSize: Vector = win.size;
	let lastPosition: Vector = win.pos;
	let dragOffset: Vector = [0, 0];

	const updateField = <K extends keyof TWindow>(field: K, value: TWindow[K]) =>
		update((win) => {
			win[field] = value;
			return win;
		});

	const getField = <K extends keyof TWindow>(field: K): TWindow[K] => {
		let value: TWindow[K] | null = null;
		subscribe((win) => (value = win[field]));
		return value as any;
	};

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

	const startDragging = (pos: Vector) => {
		dragOffset = pos;
		updateField('isDragging', true);
	};

	const drag = (pos: Vector) =>
		getField('isDragging') && updateField('pos', [pos[0] - dragOffset[0], pos[1] - dragOffset[1]]);

	return {
		subscribe,
		set,
		update,
		close,
		toggleFullscreen,
		startDragging: startDragging,
		drag
	};
};
