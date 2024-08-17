<script>
    export let process;

    // If there are actions related to the process, you can define them here.
    function startProcess() {
        console.log(`Starting process: ${process.name}`);
        // Add logic to start the process, e.g., send a request to an API endpoint
    }

    function stopProcess() {
        console.log(`Stopping process: ${process.name}`);
        // Add logic to stop the process, e.g., send a request to an API endpoint
    }
</script>

<div class="process-details-container">
    {#if process}
        <h1>{process.name}</h1>
        <p><strong>Description:</strong> {process.description}</p>
        <p><strong>Status:</strong> {process.status}</p>
        <p><strong>Last Run:</strong> {process.last_run || 'Not available'}</p>
        <p><strong>Created At:</strong> {new Date(process.created_at).toLocaleString()}</p>

        <div class="process-actions">
            {#if process.status === 'running'}
                <button on:click={stopProcess} class="stop-btn">Stop Process</button>
            {:else}
                <button on:click={startProcess} class="start-btn">Start Process</button>
            {/if}
        </div>
    {:else}
        <p>Loading process details...</p>
    {/if}
</div>

<style>
.process-details-container {
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

p {
    margin-bottom: 0.5rem;
}

strong {
    font-weight: bold;
}

.process-actions {
    margin-top: 1rem;
}

button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-right: 0.5rem;
}

.start-btn {
    background-color: #28a745;
    color: white;
}

.stop-btn {
    background-color: #dc3545;
    color: white;
}

button:hover {
    opacity: 0.9;
    background-color: #1abc9c;
}
</style>
