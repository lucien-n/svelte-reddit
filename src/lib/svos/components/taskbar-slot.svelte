<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WindowStore } from '../stores/window';

	export let win: WindowStore;
</script>

<button
	on:click={() => win.focus()}
	id="{$win.id}-taskbar-slot"
	class={cn('h-full aspect-square', $win.isFocused ? 'bg-foreground/30' : '')}
>
</button>
