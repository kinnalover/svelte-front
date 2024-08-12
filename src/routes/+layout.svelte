<script>
	import '../app.postcss';
	export let data;
</script>

<div class="navbar">
	<a href="/" class="btn">Home</a>
	<a href="/protected" class="btn">Protected</a>
	{#if data.user}
		<form action="/logout" method="POST">
			<button class="btn btn-primary">Logout</button>
		</form>
	{/if}
		

</div>
<slot />
