<script lang="ts">
	import type { WindowStore } from '$lib/svos/stores/window';
	import type { Vector } from '$lib/svos/types';
	import { cn, flyAndScale } from '$lib/utils';
	import { onMount } from 'svelte';
	import Titlebar from './titlebar.svelte';

	export let win: WindowStore;
	let node: HTMLElement;
	let content: HTMLElement;

	const setPosition = (pos: Vector) => {
		node.style.left = `${pos[0]}px`;
		node.style.top = `${pos[1]}px`;
	};

	const setSize = (size: Vector) => {
		node.style.width = `${size[0]}px`;
		node.style.height = `${size[1]}px`;
		content.style.height = `${size[1] - 32}px`;
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
	class={cn(
		'absolute border rounded-md visible bg-background',
		$win.isFocused ? 'z-10 outline outline-1 outline-foreground/40' : 'z-0'
	)}
	class:hidden={$win.isMinimized}
	on:mousedown={() => win.focus()}
	transition:flyAndScale
>
	<Titlebar {win} />
	<div bind:this={content}>
		{#if win.getField('component')}
			{@const component = win.getField('component')}
			<svelte:component this={component?.ref} {...component?.props} parent={node}>
				{@html component?.slot}
			</svelte:component>
		{:else}
			<slot />
		{/if}
	</div>
</article>
