import type { WindowStore } from './stores/window';

export const filterOutWindow = (windowId: string, windowStore: WindowStore) => {
	let desktopWinId;
	windowStore.subscribe(({ id }) => (desktopWinId = id));
	return windowId !== desktopWinId;
};
