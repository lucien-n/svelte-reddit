<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WindowStore } from '../stores/window';

	export let win: WindowStore;
</script>

<button
	on:click={() => win.focus()}
	id="{$win.id}-taskbar-slot"
	class={cn(
		'relative h-full aspect-square hover:bg-foreground/10 group ease-in-out duration-200',
		$win.isFocused && 'bg-foreground/30'
	)}
>
	<div class="absolute bottom-0 flex w-full">
		<div
			class={cn(
				'mx-auto group-hover:w-full  ease-in-out duration-200 bg-muted-foreground h-1',
				$win.isFocused ? 'w-full' : 'w-4/5'
			)}
		></div>
	</div>
</button>
