import type { Store } from '$lib/types';

export type Vector = [number, number];

export type TWindow = {
	id: string;
	pos: Vector;
	size: Vector;
	isFullscreen: boolean;
	isMinimized: boolean;
};

export type DesktopStore = Store<TWindow[]> & {
	add: (window: TWindow) => void;
	close: (windowId: string) => boolean;
	open: (windowId: string) => void;
	minimize: (windowId: string) => void;
	toggleFullscreen: (windowId: string) => void;
};
