<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { desktop } from '$lib/svos/stores/deskop';
</script>

<div>
	<section class="flex flex-col gap-2">
		<Label for="settingsTaskBarAutoHide" class="font-semibold">Auto Hide</Label>
		<Switch bind:checked={$desktop.settings.taskbar.autoHide} id="settingsTaskBarAutoHide"></Switch>
	</section>
</div>
