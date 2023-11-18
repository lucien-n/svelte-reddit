<script lang="ts">
	import { desktop } from '../stores/deskop';
	import TaskbarSlot from './taskbar-slot.svelte';
</script>

<section id="taskbar" class="flex mt-auto border-t z-20 h-16 w-full bg-background">
	{#each $desktop.windows as win}
		<TaskbarSlot {win} />
	{/each}
</section>
