<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import SettingsTaskbar from './settings-taskbar.svelte';
</script>

<section class="w-full h-full p-3 flex gap-4 flex-col">
	<div class="space-y-0.5">
		<h1 class="text-2xl font-bold tracking-tight">Settings</h1>
		<p class="text-muted-foreground">Manage Svos settings.</p>
	</div>
	<Separator orientation="horizontal" />
	<div class="grid grid-cols-5 gap-3">
		<div class="flex flex-col gap-2 col-span-1">
			<Button variant="secondary">Taskbar</Button>
		</div>
		<div class="col-span-4">
			<SettingsTaskbar />
		</div>
	</div>
</section>
