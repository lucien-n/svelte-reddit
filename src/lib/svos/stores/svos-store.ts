import {
	get,
	writable as svelteWritable,
	type StartStopNotifier,
	type Writable as SvelteWritable
} from 'svelte/store';

export const writable = <T>(value: T, start?: StartStopNotifier<T> | undefined) => {
	const store = svelteWritable<T>(value, start);
	const { subscribe, set, update } = store;

	const setField = <K extends keyof T>(field: K, value: T[K]) =>
		update((obj) => {
			return { ...obj, [field]: value };
		});

	const getField = <K extends keyof T>(field: K): T[K] => get(store)[field];

	return {
		subscribe,
		set,
		update,
		setField,
		getField
	};
};

declare type Updater<T> = (value: T) => T;
declare type StoreDict<T> = { [key: string]: SvelteWritable<T> };

interface Stores {
	local: StoreDict<any>;
	session: StoreDict<any>;
}

const stores: Stores = {
	local: {},
	session: {}
};

export interface Serializer<T> {
	parse(text: string): T;
	stringify(object: T): string;
}

export type StorageType = 'local' | 'session';

export interface Options<T> {
	serializer?: Serializer<T>;
	storage?: StorageType;
}

function getStorage(type: StorageType) {
	return type === 'local' ? localStorage : sessionStorage;
}

export function persisted<T>(
	key: string,
	initialValue: T,
	options?: Options<T>
): SvelteWritable<T> {
	const serializer = options?.serializer ?? JSON;
	const storageType = options?.storage ?? 'local';
	const browser = typeof window !== 'undefined' && typeof document !== 'undefined';
	const storage = browser ? getStorage(storageType) : null;

	function updateStorage(key: string, value: T) {
		storage?.setItem(key, serializer.stringify(value));
	}

	if (!stores[storageType][key]) {
		const store = svelteWritable<T>(initialValue, (set) => {
			const json = storage?.getItem(key);

			if (json) {
				set(<T>serializer.parse(json));
			}

			if (browser && storageType == 'local') {
				const handleStorage = (event: StorageEvent) => {
					if (event.key === key) set(event.newValue ? serializer.parse(event.newValue) : null);
				};

				window.addEventListener('storage', handleStorage);

				return () => window.removeEventListener('storage', handleStorage);
			}
		});

		const { subscribe, set } = store;

		stores[storageType][key] = {
			set(value: T) {
				updateStorage(key, value);
				set(value);
			},
			update(callback: Updater<T>) {
				return store.update((last) => {
					const value = callback(last);

					updateStorage(key, value);

					return value;
				});
			},
			subscribe
		};
	}

	return stores[storageType][key];
}
