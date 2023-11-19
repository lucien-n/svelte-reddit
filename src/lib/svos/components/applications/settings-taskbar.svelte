<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { settings } from '$lib/svos/stores/settings';
</script>

<div>
	<section class="flex flex-col gap-2">
		<Label for="settingsTaskBarAutoHide" class="font-semibold">Auto Hide</Label>
		<Switch bind:checked={$settings.taskbar.autoHide} id="settingsTaskBarAutoHide"></Switch>
	</section>
</div>
