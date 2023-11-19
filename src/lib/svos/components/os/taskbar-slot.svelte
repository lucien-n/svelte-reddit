<script lang="ts">
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import type { WindowStore } from '$lib/svos/stores/window';
	import { cn } from '$lib/utils';
	import { Bird, X } from 'lucide-svelte';

	export let win: WindowStore;
</script>

<button
	on:click={() => win.focus()}
	id="{$win.id}-taskbar-slot"
	class={cn(
		'relative h-full rounded aspect-square hover:bg-foreground/10 group ease-in-out duration-200',
		$win.isFocused && 'outline outline-1 outline-foreground/30 bg-muted/30'
	)}
>
	<ContextMenu.Root>
		<ContextMenu.Trigger>
			<div class="p-3">
				{#if $win.icon}
					{#if typeof $win.icon === 'string'}
						<img src={$win.icon} alt={$win.title} />
					{:else}
						<svelte:component this={$win.icon.ref} size="38px" />
					{/if}
				{:else}
					<Bird size="100%" />
				{/if}
			</div>
			<!-- Bottom bar -->
			<div class="absolute bottom-0 flex w-full">
				<div
					class={cn(
						'mx-auto group-hover:w-full  ease-in-out duration-200 bg-muted-foreground h-1 rounded-full',
						$win.isFocused ? 'w-full' : 'w-3/5'
					)}
				></div>
			</div>
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item on:click={win.close} class="flex gap-1 items-center">
				<X size="20px" />
				<p>Close</p>
			</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>
</button>
