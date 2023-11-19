<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dropdown from '$lib/components/ui/dropdown-menu/';
	import { Label } from '$lib/components/ui/label';
	import { settings } from '$lib/svos/stores/settings';

	const themeChoices = [
		{ label: 'Light', value: 'light' },
		{ label: 'Dark', value: 'dark' },
		{ label: 'System', value: 'system' }
	] as const;

	let currentTheme = '';

	settings.subscribe(
		({ appearence: { theme } }) =>
			(currentTheme = themeChoices.find(({ value }) => value === theme)?.label ?? 'light')
	);
</script>

<div>
	<section class="flex flex-col gap-2">
		<Label for="settingsAppearenceTheme" class="font-semibold">Theme</Label>
		<Dropdown.Root>
			<Dropdown.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" class="w-24">{currentTheme}</Button>
			</Dropdown.Trigger>
			<Dropdown.Content>
				{#each themeChoices as theme}
					<Dropdown.Item on:click={() => settings.setTheme(theme.value)}
						>{theme.label}</Dropdown.Item
					>
				{/each}
			</Dropdown.Content>
		</Dropdown.Root>
	</section>
</div>
