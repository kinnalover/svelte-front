<script>
  import { onMount } from 'svelte';
  import { fetchMachines, createMachine} from '$lib/services/api.js';
  import { machines } from '$lib/stores/machines.js';
  import { goto } from '$app/navigation';
  import { formatDateTime } from '$lib/services/utils';


  onMount(async () => {
    goto('/protected/orchestrator')
    await loadMachines()
    setInterval(loadMachines, 10000)
  });

  async function loadMachines(){
    try {
      const data = await fetchMachines();
      machines.set(data);
    } catch (error) {
      console.error('Error loading machines:', error);
    }
  }
  function viewMachine(machineId) {
    goto(`/protected/orchestrator/machines/${machineId}`);
  } 
  let name = '';
  let ip_address ='';
  let status = 'offline'
  let createbutton = false;
  async function handleCreateMachine(event){
    event.preventDefault(); // Prevent default form behavior
    const processData = {
        name,
        ip_address,
        status
    };
    Response = await createMachine(processData);
    // Optionally clear the form
    createbutton = !createbutton
    name = '';
    ip_address = '';
  }
  </script>
  <div >
    <button on:click={() => createbutton = !createbutton} class='btn-create'>Add machine</button>
  </div>
  {#if createbutton == true}
    <form on:submit|preventDefault={handleCreateMachine}>
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={name} required />
    
      <label for="ip_address">IP Address</label>
      <input type="text" id="description" bind:value={ip_address} />
    
    
      <button type="submit">Add machine</button>
    </form>
  {/if}
    <table class="styled-table">
      <thead>
          <tr>
              <th>Name</th>
              <th>IP address</th>
              <th>Status</th>
              <th>Last Heartbeat</th>
              <th>Create At</th>
          </tr>
      </thead>
      <tbody>
        {#each $machines as machine}
          <tr>
              <td><button on:click={() => viewMachine(machine.id)} class="process-link">
                {machine.name}
              </button></td>
              <td>{machine.ip_address}</td>
              <td>{machine.status}</td>
              <td>{formatDateTime(machine.last_heartbeat)}</td>
              <td>{formatDateTime(machine.created_at)}</td>
              
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
        background-color: #0056b3;
      }
      .btn-create{
  text-align: left;
  padding: 0.5rem 1rem;
}
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
      