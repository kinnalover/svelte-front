<script>
    import ProcessList from './ProcessList.svelte';
    import MachineList from './MachineList.svelte';
    import Triggers  from  './Triggers.svelte';
  
    let activeTab = 'processes';
  </script>
  <div class="sidebar">
    <button on:click={() => activeTab = 'processes'}>Processes</button>
    <button on:click={() => activeTab = 'machines'}>Machines</button>
    <button on:click={() => activeTab = 'triggers'}>Triggers</button>
    <!-- Add more buttons as needed -->
  </div>
  <div class="dashboard">
    <div class="content">
      {#if activeTab === 'processes'}
        <ProcessList />
      {/if}
      {#if activeTab === 'machines'}
        <MachineList />
      {/if}
      {#if activeTab === 'triggers'}
        <Triggers/>
      {/if}
      <!-- Add more conditional renders based on activeTab -->
    </div>
  </div>
  
  <style>
    .dashboard {
      width: 80%;   
    }
    .sidebar {
      display: flex;           /* Flexbox layout */
    justify-content: space-around; /* Space between the buttons */
    background-color: #2c3e50;
    padding: 10px;
    color: white;
    width: 80%;   
    }
    .content {
      flex-grow: 1;
      padding: 20px;
    }
    .sidebar button {
      display: block;
      width: 100%;
      padding: 10px;
      margin-bottom: 5px;
      background: #34495e;
      border: none;
      color: white;
      cursor: pointer;
    }
    .sidebar button:hover {
      background: #1abc9c;
    }
  </style>
  