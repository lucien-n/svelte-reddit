<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import type { WindowStore } from '../stores/window';
	import type { Vector } from '../types';
	import Titlebar from './titlebar.svelte';

	export let win: WindowStore;
	let node: HTMLElement;

	const setPosition = (pos: Vector) => {
		node.style.left = `${pos[0]}px`;
		node.style.top = `${pos[1]}px`;
	};

	const setSize = (size: Vector) => {
		node.style.width = `${size[0]}px`;
		node.style.height = `${size[1]}px`;
	};

	onMount(() => {
		win.subscribe(({ pos, size }) => {
			setPosition(pos);
			setSize(size);
		});
	});

	const handleMouseUp = () => win.stopDragging();
	const handleMouseMove = ({ clientX, clientY }: MouseEvent) => win.drag([clientX, clientY]);
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
	id={$win.id}
	bind:this={node}
	class={cn('absolute border rounded-md visible bg-background', $win.isFocused ? 'z-10' : 'z-0')}
	class:hidden={$win.isMinimized}
	on:mousedown={() => win.focus()}
>
	<Titlebar {win} />
	<slot />
</article>
