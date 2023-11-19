<script lang="ts">
	import Taskbar from '$lib/svos/components/os/taskbar.svelte';
	import Window from '$lib/svos/components/os/window.svelte';
	import { desktop } from '$lib/svos/stores/deskop';
	import Settings from '../applications/settings.svelte';

	desktop.createWindow({
		pos: [10, 10],
		size: [640, 360],
		title: 'Window №1',
		icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fbig%2F80-800546_this-icon-represents-settings-settings-icon-transparent-clipart.png&f=1&nofb=1&ipt=50c462e63faf3054569b203485a0526f674f3b4e9c247d9fc7191828769bda62&ipo=images',
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
		title: 'Window №3'
	});
</script>

<section id="desktop" class="w-full h-full flex bg-background">
	{#each $desktop.windows as win (win.getField('id'))}
		<Window {win} />
	{/each}
	<Taskbar />
</section>
