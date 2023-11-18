<script lang="ts">
	import { desktop } from '../stores/deskop';
	import TaskbarSlot from './taskbar-slot.svelte';
</script>

<section id="taskbar" class="flex mx-auto mt-auto m-3 z-20 bg-background">
	{#each $desktop.windows as win}
		<TaskbarSlot {win} />
	{/each}
</section>
