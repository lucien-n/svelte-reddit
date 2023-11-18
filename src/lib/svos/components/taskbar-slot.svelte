<script lang="ts">
	import type { WindowStore } from '../stores/window';

	export let win: WindowStore;
</script>

<button on:click={() => win.show()} id="{$win.id}-taskbar-slot" class="w-20 h-20 rounded border"
></button>
