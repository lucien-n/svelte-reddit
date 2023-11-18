import type { Store } from '$lib/types';

export type Vector = [number, number];

export type TWindow = {
	pos: Vector;
	size: Vector;
	isFullscreen: boolean;
	isMinimized: boolean;
};

export type ManagerStore = Store<TWindow[]> & {};
