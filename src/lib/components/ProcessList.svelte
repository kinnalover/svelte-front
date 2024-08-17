<script>
  import { onMount } from 'svelte';
  import { fetchProcesses, createProcess } from '$lib/services/api.js';
  import { processes } from '$lib/stores/processes.js';
  import { goto } from '$app/navigation';

 

  // Fetch processes on component mount
  onMount(async () => {
    goto(`/protected/orchestrator`);
    try {
      const data = await fetchProcesses();
      processes.set(data); // Set the fetched processes to the store
    } catch (error) {
      console.error('Error loading processes:', error);
    }
  });

  let createbutton = false;
  // Navigate to the specific process page
  function viewProcess(processName) {
    goto(`/protected/orchestrator/processes/${processName}`);
  }
  let name = '';
    let description = '';
    let repository_url = '';

  async function handleCreateProcess(event){
    event.preventDefault(); // Prevent default form behavior
        const processData = {
            name,
            description,
            repository_url,
        };
        Response = await createProcess(processData);
        // Optionally clear the form
        createbutton = !createbutton
        name = '';
        description = '';
        repository_url = '';
        
    
  }
</script>

<div>
  <button on:click={() => createbutton = !createbutton}>Create a process</button>
</div>
{#if createbutton == true}
<form on:submit|preventDefault={handleCreateProcess}>
  <label for="name">Name</label>
  <input type="text" id="name" bind:value={name} required />

  <label for="description">Description</label>
  <input type="text" id="description" bind:value={description} />

  <label for="repository_url">Repository URL</label>
  <input type="url" id="repository_url" bind:value={repository_url} />

  <button type="submit">Create Process</button>
</form>
{/if}
<table class="styled-table">
  <thead>
      <tr>
          <th>Name</th>
          <th>Version</th>
          <th>Repo</th>
          <th>Description</th>
      </tr>
  </thead>
  <tbody>
    {#each $processes as process}
      <tr>
          <td><button on:click={() => viewProcess(process.id)} class="process-link">
            {process.name}
          </button></td>
          <td>1.2.3</td>
          <td><a href="{process.repository_url}" target="_blank" rel="noopener noreferrer" >Gitlab</a></td>
          <td>{process.description}</td>
          
      </tr>
      {/each}
  </tbody>
</table>



<style>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 1rem 0;
}

.process-link {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
}

.process-link:hover {
  background-color: #1abc9c;
}
/* Table styling */
.styled-table {
        width: 100%;
        border-collapse: collapse;
    }

    .styled-table thead tr {
        background-color: #3498db;
        color: white;
        text-align: left;
    }

    .styled-table th,
    .styled-table td {
        padding: 12px 15px;
    }

    .styled-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    .styled-table tbody tr:nth-of-type(even) {
        background-color: #220969;
    }

    .styled-table tbody tr:hover {
        background-color: #0c1274;
    }

    form {
      padding: 20px;
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: 0 auto;
    }

    label, input {
        margin-bottom: 10px;
    }

    button {
        padding: 10px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #2980b9;
    }
</style>
