<script>
	import '../app.postcss';
	export let data;
</script>

<div class="navbar">
	<a href="/" class="btn">Home</a>
	<a href="/protected" class="btn">Protected</a>
	<a href="/protected/todo" class="btn">Todo</a>
	<a href="/protected/orchestrator" class="btn">Orchestrator</a>
	{#if data.user}
		<form action="/logout" method="POST" class="logout-form">
			<button class="logoutbtn">Logout</button>
		</form>
	{/if}
</div>
<style>	
	.logout-form {
    display: inline-block;  /* Ensures the form doesn't take up the full width */
	
	}
	.logoutbtn {
		background-color: #b434db; /* Primary blue */
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;       
	}
	.logoutbtn:hover {
    background-color: #b92982; /* Darker blue on hover */
}
	.btn {
    background-color: #3498db; /* Primary blue */
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;       /* Optional: Rounded corners */
}

.btn:hover {
    background-color: #2980b9; /* Darker blue on hover */
}

.btn:active {
    background-color: #1c5980; /* Even darker on click */
}
</style>
<slot />
