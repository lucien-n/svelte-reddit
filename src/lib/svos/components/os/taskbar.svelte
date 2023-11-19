<script lang="ts">
	import { desktop } from '$lib/svos/stores/deskop';
	import { flyAndScale } from '$lib/utils';
	import TaskbarSlot from './taskbar-slot.svelte';

	export let autoHide: boolean = false;

	let isHovering = false;

	const handleMouseEnter = () => {
		if (!autoHide) return;
		isHovering = true;
	};

	const handleMouseLeave = () => {
		if (!autoHide) return;
		isHovering = false;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	id="taskbar"
	class="flex mt-auto h-16 w-full m-3 z-20"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	{#if !autoHide || isHovering}
		<div transition:flyAndScale={{ duration: 200 }} class="mx-auto">
			<div class="border rounded h-16 bg-background">
				{#each $desktop.windows as win (win.getField('id'))}
					<TaskbarSlot {win} />
				{/each}
			</div>
		</div>
	{/if}
</section>
