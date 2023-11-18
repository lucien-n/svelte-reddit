<script lang="ts">
	import { Maximize2, Minus, Shrink, X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { WindowStore } from '../stores/window';

	export let win: WindowStore;

	const dispatch = createEventDispatcher();

	let node: HTMLElement;
</script>

<section bind:this={node} class="border-b h-8 flex gap-1 items-center bg-foreground/10 rounded-t">
	<div class="flex gap-1 m-1">
		<button
			on:click={() => dispatch('close')}
			class="rounded-full bg-red-600 p-[2px] aspect-square w-5 flex items-center justify-center"
		>
			<X size="16px" strokeWidth="3px" />
		</button>
		<button
			on:click={() => dispatch('minimize')}
			class="rounded-full bg-orange-600 p-[2px] aspect-square w-5 flex items-center justify-center"
		>
			<Minus size="16px" strokeWidth="3px" />
		</button>
		<button
			on:click={() => dispatch('fullscreen')}
			class="rounded-full bg-green-600 p-[2px] aspect-square w-5 flex items-center justify-center"
		>
			{#if $win.isFullscreen}
				<Shrink size="16px" strokeWidth="3px" />
			{:else}
				<Maximize2 size="14px" strokeWidth="3px" />
			{/if}
		</button>
	</div>
	<p class="select-none">
		{$win.title}
	</p>
</section>
