<script>
    import { onMount } from 'svelte';
    import { fetchMachines } from '$lib/services/api.js';
    import { machines } from '$lib/stores/machines.js';
    import { goto } from '$app/navigation';
    onMount(async () => {
      goto('/protected/orchestrator')
      try {
        const data = await fetchMachines();
        machines.set(data);
      } catch (error) {
        console.error('Error loading machines:', error);
      }
    });
    function viewMachine(machineId) {
    goto(`/protected/orchestrator/machines/${machineId}`);
  }
  </script>
  
  <ul>
    {#each $machines as machine}
      <li>
        <div>
          <button on:click={() => viewMachine(machine.id)} class="process-link">
            {machine.name}
          </button>
        </div>
      </li>
    {/each}
    </ul>
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
      </style>
      