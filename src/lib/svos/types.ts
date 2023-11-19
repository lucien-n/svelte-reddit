import type { WindowStore } from './stores/window';

export type Vector = [number, number];

export type ApplicationComponent = {
	ref: any;
	props?: Record<string, unknown>;
	slot?: string;
};

export type TWindow = {
	id: string;
	pos: Vector;
	size: Vector;
	title: string;
	icon?: string;
	isFullscreen: boolean;
	isMinimized: boolean;
	isDragging: boolean;
	isFocused: boolean;
	component?: ApplicationComponent;
};

export type TDesktop = {
	windows: WindowStore[];
	focusedWindowId: string;
};
