<script lang="ts">
	import { createDesktopStore } from '../stores/deskop';
	import Window from './window.svelte';

	export const desktop = createDesktopStore();
	desktop.createWindow({
		pos: [10, 10],
		size: [640, 360]
	});
</script>

<section id="desktop" class="w-full h-full bg-background">
	{#each $desktop.windows as win}
		<Window {win} />
	{/each}
</section>
