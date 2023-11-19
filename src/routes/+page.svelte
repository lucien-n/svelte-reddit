<script lang="ts">
	import { Switch } from '$lib/components/ui/switch';
	import Desktop from '$lib/svos/components/os/desktop.svelte';

	const toggleTheme = () => {
		const currentClass = document.children[0].className;
		document.children[0].className = currentClass == 'dark' ? 'light' : 'dark';
	};
</script>

<div class="absolute right-1 top-1">
	<Switch id="theme" on:click={toggleTheme}></Switch>
</div>
<Desktop />
