import type { WindowStore } from './stores/window';

export type Vector = [number, number];

type Component = {
	ref: any;
	props?: Record<string, unknown>;
	slot?: string;
};

export type ApplicationComponent = Component;

export type IconComponent = Component;

export type TWindow = {
	id: string;
	pos: Vector;
	size: Vector;
	title: string;
	icon?: IconComponent;
	component?: ApplicationComponent;
	isFullscreen: boolean;
	isMinimized: boolean;
	isDragging: boolean;
	isFocused: boolean;
};

export type TDesktop = {
	windows: WindowStore[];
	focusedWindowId: string;
};

export type Settings = {
	taskbar: {
		autoHide: boolean;
	};
	appearence: {
		theme: Theme;
	};
};

export type Theme = 'system' | 'light' | 'dark';
