<script lang="ts">
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

	const handleMouseUp = ({ clientX, clientY }: MouseEvent) => win.stopDragging([clientX, clientY]);
	const handleMouseMove = ({ clientX, clientY }: MouseEvent) => win.drag([clientX, clientY]);
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<article id={$win.id} bind:this={node} class="absolute border rounded-md">
	<Titlebar {win} />
	<slot />
</article>
