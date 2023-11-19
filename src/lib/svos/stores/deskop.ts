import type { Store } from '$lib/types';
import { nanoid } from 'nanoid';
import { filterOutWindow } from '../helper';
import type { TDesktop, TWindow } from '../types';
import { writable } from './svos-store';
import { createWindowStore, type WindowStore } from './window';

export type WindowInitSettings = Pick<TWindow, 'pos' | 'size' | 'title' | 'icon' | 'component'> & {
	icon?: string | undefined;
};

export type DesktopStore = Store<TDesktop> & {
	createWindow: (settings: WindowInitSettings) => WindowStore;
	getWindow: (windowId: string) => WindowStore | undefined;
	closeWindow: (windowId: string) => void;
	focusWindow: (windowId: string) => void;
};

const createDesktopStore = (): DesktopStore => {
	const { subscribe, set, update, getField, setField } = writable<TDesktop>({
		windows: [],
		focusedWindowId: ''
	});

	const createWindow = (settings: WindowInitSettings) => {
		const win = createWindowStore({
			...settings,
			id: nanoid(),
			isFocused: false,
			isFullscreen: false,
			isMinimized: false,
			isDragging: false
		} satisfies TWindow);

		update((desktop) => {
			return { ...desktop, windows: [...desktop.windows, win] };
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

	const closeWindow = (windowId: string) => {
		const filteredWindows = getField('windows').filter((win) => filterOutWindow(windowId, win));
		setField('windows', filteredWindows);
		setField('focusedWindowId', getField('windows')[0].getField('id') || '');
	};

	const focusWindow = (windowId: string) => {
		subscribe((dt) => {
			dt.windows.forEach((win) => win.setField('isFocused', false));
		});
		setField('focusedWindowId', windowId);
	};

	return {
		subscribe,
		set,
		update,
		getField,
		setField,
		createWindow,
		getWindow,
		closeWindow,
		focusWindow
	};
};

export const desktop = createDesktopStore();
