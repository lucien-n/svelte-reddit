import type { WindowStore } from './stores/window';

export type Vector = [number, number];

export type TWindow = {
	id: string;
	pos: Vector;
	size: Vector;
	title: string;
	isFullscreen: boolean;
	isMinimized: boolean;
	isDragging: boolean;
	isFocused: boolean;
};

export type TDesktop = {
	windows: WindowStore[];
	focusedWindowId: string;
};
