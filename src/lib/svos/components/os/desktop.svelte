<script lang="ts">
	import Taskbar from '$lib/svos/components/os/taskbar.svelte';
	import Window from '$lib/svos/components/os/window.svelte';
	import { desktop } from '$lib/svos/stores/deskop';
	import { settings } from '$lib/svos/stores/settings';
	import { SettingsIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Settings from '../applications/settings.svelte';
	import ShadcnSvelte from '../applications/shadcn-svelte.svelte';

	desktop.createWindow({
		pos: [10, 10],
		size: [640, 360],
		title: 'Settings',
		icon: { ref: SettingsIcon },
		component: { ref: Settings }
	});
	desktop.createWindow({
		pos: [800, 40],
		size: [200, 200],
		title: 'Window №2'
	});
	desktop.createWindow({
		pos: [90, 400],
		size: [720, 480],
		title: 'Shadcn Svelte',
		icon: 'https://www.shadcn-svelte.com/favicon.ico',
		component: { ref: ShadcnSvelte }
	});

	onMount(() => {
		document.children[0].className = $settings.appearence.theme;
	});
</script>

<section id="desktop" class="w-full h-full flex bg-background">
	{#each $desktop.windows as win (win.getField('id'))}
		<Window {win} />
	{/each}
	<Taskbar />
</section>
