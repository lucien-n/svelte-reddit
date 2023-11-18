import type { WindowStore } from './stores/window';
import type { Vector } from './types';

export const filterOutWindow = (windowId: string, windowStore: WindowStore) => {
	let desktopWinId;
	windowStore.subscribe(({ id }) => (desktopWinId = id));
	return windowId !== desktopWinId;
};

export const vector = {
	substract: (a: Vector, b: Vector) => [a[0] - b[0], a[1] - b[1]],
	add: (a: Vector, b: Vector) => [a[0] + b[0], a[1] + b[1]]
};
