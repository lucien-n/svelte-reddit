<script lang="ts">
	import { cn } from '$lib/utils';
	import { Maximize2, Minimize2, Minus, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import type { WindowStore } from '../stores/window';

	export let win: WindowStore;

	let node: HTMLElement;

	let isHoveringButton = [false, false, false];

	const handleMouseDown = ({ clientX, clientY }: MouseEvent) =>
		!isHoveringButton.every((hovering) => hovering) && win.startDragging([clientX, clientY]);

	const handleDoubleClick = () => win.toggleFullscreen();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	bind:this={node}
	on:mousedown={handleMouseDown}
	on:dblclick={handleDoubleClick}
	class={cn(
		'border-b h-8 flex gap-1 px-1 items-center rounded-t bg-foreground/10',
		!$win.isFocused && 'text-foreground/60'
	)}
>
	<div class="flex gap-1 m-1">
		<button
			on:mouseenter={() => (isHoveringButton[0] = true)}
			on:mouseleave={() => (isHoveringButton[0] = false)}
			on:click={() => {
				win.close();
				isHoveringButton[0] = false;
			}}
			class="rounded-full bg-red-600 p-[2px] aspect-square w-4 flex items-center justify-center"
		>
			{#if isHoveringButton[0]}
				<div transition:fade={{ duration: 100 }}>
					<X size="12px" strokeWidth="3px" />
				</div>
			{/if}
		</button>
		<button
			on:mouseenter={() => (isHoveringButton[1] = true)}
			on:mouseleave={() => (isHoveringButton[1] = false)}
			on:click={() => {
				win.hide();
				isHoveringButton[1] = false;
			}}
			class="rounded-full bg-orange-600 p-[2px] aspect-square w-4 flex items-center justify-center"
		>
			{#if isHoveringButton[1]}
				<div transition:fade={{ duration: 100 }}>
					<Minus size="12px" strokeWidth="3px" />
				</div>
			{/if}
		</button>
		<button
			on:mouseenter={() => (isHoveringButton[2] = true)}
			on:mouseleave={() => (isHoveringButton[2] = false)}
			on:click={() => {
				win.toggleFullscreen();
				isHoveringButton[2] = false;
			}}
			class="rounded-full bg-green-600 p-[2px] aspect-square w-4 flex items-center justify-center"
		>
			{#if $win.isFullscreen}
				{#if isHoveringButton[2]}
					<div transition:fade={{ duration: 100 }}>
						<Minimize2 size="12px" strokeWidth="3px" />
					</div>
				{/if}
			{:else if isHoveringButton[2]}
				<div transition:fade={{ duration: 100 }}>
					<Maximize2 size="12px" strokeWidth="3px" />
				</div>
			{/if}
		</button>
	</div>
	<p class="select-none">
		{$win.title}
	</p>
</section>
