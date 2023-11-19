<script lang="ts">
	let count = 0;

	const increment = () => (count += 1);
</script>

<section class="w-full h-full">
	<p>Hello</p>
	{count}
	<button on:click={increment}>+</button>
</section>
