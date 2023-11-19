import type { Settings, Theme } from '../types';
import { persisted } from './svos-store';

const createSettingsStore = () => {
	const { subscribe, set, update } = persisted<Settings>('settings', {
		taskbar: { autoHide: false },
		appearence: {
			theme: document.children[0].className as Theme
		}
	});

	const setTheme = (theme: Theme) => {
		update((curr) => {
			return { ...curr, appearence: { theme } };
		});
		document.children[0].className = theme;
	};

	return {
		subscribe,
		set,
		update,
		setTheme
	};
};

export const settings = createSettingsStore();
