import type { Store } from '$lib/types';
import { filterOutWindow } from '../helper';
import type { TWindow, Vector } from '../types';
import { desktop } from './deskop';
import { writable } from './svos-store';

export type WindowStore = Store<TWindow> & {
	close: () => void;
	toggleFullscreen: () => void;
	startDragging: (pos: Vector) => void;
	stopDragging: (pos: Vector) => void;
	drag: (pos: Vector) => void;
};

export const createWindowStore = (win: TWindow): WindowStore => {
	const { subscribe, set, update, setField, getField } = writable<TWindow>(win);

	let lastSize: Vector = win.size;
	let lastPosition: Vector = win.pos;
	let dragOffset: Vector = [0, 0];

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
		setField('isDragging', true);
	};

	const stopDragging = (pos: Vector) => {
		lastPosition = pos;
		setField('isDragging', false);
		setField('pos', lastPosition);
	};

	const drag = (pos: Vector) =>
		getField('isDragging') && setField('pos', [pos[0] - dragOffset[0], pos[1] - dragOffset[1]]);

	return {
		subscribe,
		set,
		update,
		close,
		toggleFullscreen,
		startDragging,
		stopDragging,
		drag
	};
};
