import type { Store } from '$lib/types';
import { vector } from '../helper';
import type { TWindow, Vector } from '../types';
import { desktop } from './deskop';
import { writable } from './svos-store';

export type WindowStore = Store<TWindow> & {
	close: () => void;
	toggleFullscreen: () => void;
	startDragging: (pos: Vector) => void;
	stopDragging: () => void;
	drag: (pos: Vector) => void;
	show: () => void;
	hide: () => void;
	focus: () => void;
};

export const createWindowStore = (win: TWindow): WindowStore => {
	const { subscribe, set, update, setField, getField } = writable<TWindow>(win);

	let lastSize: Vector = win.size;
	let lastPosition: Vector = win.pos;
	let dragOffset: Vector = [0, 0];

	const close = () => desktop.closeWindow(getField('id'));

	const toggleFullscreen = (state?: 'on' | 'off' | undefined) => {
		let isFullscreen = state === 'on';
		if (state === 'on') setField('isFullscreen', true);
		if (state === 'off') setField('isFullscreen', false);
		else {
			isFullscreen = getField('isFullscreen');
			setField('isFullscreen', !isFullscreen);
		}

		if (win.isFullscreen) {
			lastPosition = getField('pos');
			lastSize = getField('size');
			setField('size', vector.substract([window.innerWidth, window.innerHeight], [1, 1]));
			setField('pos', [0, 0]);
		} else {
			setField('size', lastSize);
			setField('pos', lastPosition);
		}
	};

	const startDragging = (pos: Vector) => {
		toggleFullscreen('off');
		dragOffset = pos;
		setField('isDragging', true);
		focus();
	};

	const stopDragging = () =>
		getField('isDragging') && (lastPosition = getField('pos')) && setField('isDragging', false);

	const drag = (pos: Vector) =>
		getField('isDragging') &&
		setField('pos', vector.add(lastPosition, vector.substract(pos, dragOffset)));

	const show = () => setField('isMinimized', false);
	const hide = () => setField('isMinimized', true);

	const focus = () => {
		desktop.focusWindow(getField('id'));
		setField('isFocused', true);
		show();
	};

	return {
		subscribe,
		set,
		update,
		getField,
		setField,
		close,
		toggleFullscreen,
		startDragging,
		stopDragging,
		drag,
		show,
		hide,
		focus
	};
};
