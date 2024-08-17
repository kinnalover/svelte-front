<script>
    import { onMount } from 'svelte';
    import { fetchTriggers } from '$lib/services/api.js';
    import { triggers} from '$lib/stores/triggers.js';
    import { goto } from '$app/navigation';
  
   
  
    // Fetch processes on component mount
    onMount(async () => {
        goto(`/protected/orchestrator`);
      try {
        const data = await fetchTriggers();
        triggers.set(data); // Set the fetched processes to the store
      } catch (error) {
        console.error('Error loading processes:', error);
      }
    });
  
    // Navigate to the specific process page
    function viewProcess(processName) {
      goto(`/protected/orchestrator/triggers/${processName}`);
    }
  </script>
  
  <ul>
  {#each $triggers as trigger}
    <li>
      <div>
        <button on:click={() => viewProcess(trigger.id)} class="process-link">
          {trigger.name}
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
  