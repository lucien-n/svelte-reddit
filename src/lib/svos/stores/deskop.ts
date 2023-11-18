import { writable } from 'svelte/store';
import type { DesktopStore, TWindow } from '../types';

export const createDesktop = (): DesktopStore => {
	const { subscribe, set, update } = writable<TWindow[]>([]);

	const getWindow = (windowId: string): TWindow | undefined => {
		let window: TWindow | undefined = undefined;
		subscribe((windows) => (window = windows.filter(({ id }) => id === windowId)[0]));
		return window;
	};

	const setWindow = (window: TWindow) => {
		update((windows) => [...windows.filter(({ id }) => id !== window.id), window]);
	};

	const add = (window: TWindow): void => {
		update((windows) =>
			windows.find(({ id }) => id === window.id) ? windows : [...windows, window]
		);
	};

	const close = (windowId: string): boolean => {
		let removed = false;

		update((windows) => {
			const windowIndex = windows.find(({ id }) => id === windowId);
			removed = !windowIndex;
			return windows.filter(({ id }) => id !== windowId);
		});

		return removed;
	};

	const open = (windowId: string) => {
		const window = getWindow(windowId);
		if (!window) return;

		window.isMinimized = false;
		setWindow(window);
	};

	const minimize = (windowId: string) => {
		const window = getWindow(windowId);
		if (!window) return;

		window.isMinimized = true;
		setWindow(window);
	};

	const toggleFullscreen = (windowId: string) => {
		const window = getWindow(windowId);
		if (!window) return;

		window.isFullscreen = !window.isFullscreen;
		setWindow(window);
	};

	return {
		subscribe,
		set,
		update,
		add,
		close,
		open,
		minimize,
		toggleFullscreen
	};
};
