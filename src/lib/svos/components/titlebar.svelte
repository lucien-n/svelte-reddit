<script lang="ts">
	import { cn } from '$lib/utils';
	import { Maximize2, Minimize2, Minus, X } from 'lucide-svelte';
	import type { WindowStore } from '../stores/window';

	export let win: WindowStore;

	let node: HTMLElement;

	let isHoveringButton = false;

	const handleMouseDown = ({ clientX, clientY }: MouseEvent) =>
		!isHoveringButton && win.startDragging([clientX, clientY]);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	bind:this={node}
	on:mousedown={handleMouseDown}
	class={cn(
		'border-b h-8 flex gap-1 items-center rounded-t bg-foreground/10',
		!$win.isFocused && 'text-foreground/60'
	)}
>
	<div class="flex gap-1 m-1">
		<button
			on:mouseenter={() => (isHoveringButton = true)}
			on:mouseleave={() => (isHoveringButton = false)}
			on:click={() => {
				win.close();
				isHoveringButton = false;
			}}
			class="rounded-full bg-red-600 p-[2px] aspect-square w-5 flex items-center justify-center"
		>
			<X size="16px" strokeWidth="3px" />
		</button>
		<button
			on:mouseenter={() => (isHoveringButton = true)}
			on:mouseleave={() => (isHoveringButton = false)}
			on:click={() => {
				win.hide();
				isHoveringButton = false;
			}}
			class="rounded-full bg-orange-600 p-[2px] aspect-square w-5 flex items-center justify-center"
		>
			<Minus size="16px" strokeWidth="3px" />
		</button>
		<button
			on:mouseenter={() => (isHoveringButton = true)}
			on:mouseleave={() => (isHoveringButton = false)}
			on:click={() => {
				win.toggleFullscreen();
				isHoveringButton = false;
			}}
			class="rounded-full bg-green-600 p-[2px] aspect-square w-5 flex items-center justify-center"
		>
			{#if $win.isFullscreen}
				<Minimize2 size="16px" strokeWidth="3px" />
			{:else}
				<Maximize2 size="16px" strokeWidth="3px" />
			{/if}
		</button>
	</div>
	<p class="select-none">
		{$win.title}
	</p>
</section>
