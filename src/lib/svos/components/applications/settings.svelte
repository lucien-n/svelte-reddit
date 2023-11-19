<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { fade } from 'svelte/transition';
	import SettingsAppearence from './settings-appearence.svelte';
	import SettingsTaskbar from './settings-taskbar.svelte';

	let currentCategory: 'taskbar' | 'appearence' = 'taskbar';
</script>

<section class="w-full h-full p-3 flex gap-4 flex-col">
	<div class="space-y-0.5">
		<h1 class="text-2xl font-bold tracking-tight">Settings</h1>
		<p class="text-muted-foreground">Manage Svos settings.</p>
	</div>
	<Separator orientation="horizontal" />
	<div class="grid grid-cols-9 gap-8 h-full">
		<div class="flex flex-col gap-2 col-span-2">
			<Button variant="secondary" on:click={() => (currentCategory = 'taskbar')}>Taskbar</Button>
			<Button variant="secondary" on:click={() => (currentCategory = 'appearence')}
				>Appearence</Button
			>
		</div>
		<div class="col-span-7">
			{#key currentCategory}
				<div class="w-full" out:fade={{ duration: 100 }} in:fade={{ duration: 100, delay: 100 }}>
					{#if currentCategory === 'taskbar'}
						<SettingsTaskbar />
					{:else if currentCategory === 'appearence'}
						<SettingsAppearence />
					{/if}
				</div>
			{/key}
		</div>
	</div>
</section>
