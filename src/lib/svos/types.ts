import type { WindowStore } from './stores/window';

export type Vector = [number, number];

export type TWindow = {
	id: string;
	pos: Vector;
	size: Vector;
	isFullscreen: boolean;
	isMinimized: boolean;
};

export type TDesktop = {
	windows: WindowStore[];
};
