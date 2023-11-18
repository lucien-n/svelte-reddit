import type { Store } from '$lib/types';
import { nanoid } from 'nanoid';
import type { TDesktop, TWindow } from '../types';
import { writable } from './svos-store';
import { createWindowStore, type WindowStore } from './window';

export type WindowInitSettings = Pick<TWindow, 'pos' | 'size' | 'title'>;

export type DesktopStore = Store<TDesktop> & {
	createWindow: (settings: WindowInitSettings) => WindowStore;
	getWindow: (windowId: string) => WindowStore | undefined;
};

const createDesktopStore = (): DesktopStore => {
	const { subscribe, set, update, getField, setField } = writable<TDesktop>({
		windows: []
	});

	const createWindow = (settings: WindowInitSettings) => {
		const { pos, size, title } = settings;

		const win = createWindowStore({
			id: nanoid(),
			pos,
			title,
			size,
			isFullscreen: false,
			isMinimized: false,
			isDragging: false
		} satisfies TWindow);

		update(({ windows }) => {
			return {
				windows: [...windows, win]
			};
		});

		return win;
	};

	const getWindow = (windowId: string): WindowStore | undefined => {
		let win;

		subscribe(({ windows }) => {
			win = windows.find((desktopWindow) => {
				let isSelf;
				desktopWindow.subscribe(({ id }) => (isSelf = id === windowId));
				return isSelf;
			});
		});

		return win;
	};

	return {
		subscribe,
		set,
		update,
		getField,
		setField,
		createWindow,
		getWindow
	};
};

export const desktop = createDesktopStore();
