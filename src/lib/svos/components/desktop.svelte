<script lang="ts">
	import { desktop } from '../stores/deskop';
	import Taskbar from './taskbar.svelte';
	import Window from './window.svelte';

	desktop.createWindow({
		pos: [10, 10],
		size: [640, 360],
		title: 'Window №1'
	});
</script>

<section id="desktop" class="w-full h-full flex bg-background">
	{#each $desktop.windows as win}
		<Window {win} />
	{/each}
	<Taskbar />
</section>
