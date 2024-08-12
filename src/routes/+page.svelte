<script lang="ts">
	export let data
</script>


<main>
	<h1>SvelteKit Hooks</h1>
	{#if data.user}
	<p>Welcome, {data.user.email}</p>
	{:else}
		<div class="button-container">
			<form action="?/login" method="POST">
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
			<a href="/protected" class="btn btn-secondary">Protected</a>
		</div>
	{/if}
</main>
