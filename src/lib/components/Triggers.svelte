<script>
  import { onMount } from 'svelte';
  import { fetchJobs, createJob, fetchProcesses, fetchMachines, createTrigger, fetchTriggers } from '$lib/services/api.js';
  import { jobs } from '$lib/stores/jobs.js';
  import { triggers } from '$lib/stores/triggers.js';
  import {processes} from '$lib/stores/processes';
  import {machines} from '$lib/stores/machines';
  import { goto } from '$app/navigation';
  import { formatDateTime } from '$lib/services/utils';
  let selectedProcess = null;
  let selectedMachine = null;
  let schedule_type = 'once'; // Options: once, daily, workingDays, customDays
  let selected_days = []; // Array to hold custom days
  let time = '12:00'; // Default time
 

  // Fetch processes on component mount
  onMount(async () => {
    goto(`/protected/orchestrator`);
    try {
      const data = await fetchTriggers();
      triggers.set(data); // Set the fetched processes to the store
    } catch (error) {
      console.error('Error loading processes:', error);
    }
    try {
      const data = await fetchProcesses();
      processes.set(data); // Set the fetched processes to the store
    }catch (error){
      console.error('Error loading machines:', error);
    }
    try {
      const data = await fetchMachines();
      machines.set(data); // Set the fetched processes to the store
    }catch (error){
      console.error('Error loading machines:', error);
    }
  });
  
  function getProcessName(process_id) {
        const process = $processes.find(p => p.id === process_id);
        return process ? process.name : 'Unknown process';
    }

    // Function to find machine name by machine_id
    function getMachineName(machine_id) {
        const machine = $machines.find(m => m.id === machine_id);
        return machine ? machine.ip_address : 'Unknown machine';
    }
  let createbutton = false;
  // Navigate to the specific process page
  function viewProcess(jobName) {
    const processElement = document.getElementById("process-details");
    goto(`/protected/orchestrator/jobs/${jobName}`);
    
  }
  let name = '';
  let description = '';
  let repository_url = '';

  
  function toggleDay(day) {
  if (selectedDays.includes(day)) {
    selectedDays = selectedDays.filter(d => d !== day);
  } else {
    selectedDays = [...selectedDays, day];
  }
}
  async function handleSubmit() {
  
  const triggerData = {
    process_id: selectedProcess,
    machine_id: selectedMachine,
    schedule_type,
    selected_days,
    time,
  }
  const response = await createTrigger(triggerData);
  createbutton = !createbutton;
  console.log('Trigger data:', triggerData);
  
}
</script>

<div >
  <button on:click={() => createbutton = !createbutton} class='btn-create'>Create Trigger</button>
</div>
{#if createbutton == true}
<form on:submit|preventDefault={handleSubmit}>
  <!-- Select Process -->
  <label for="process">Select Process:</label>
  <select id="process" bind:value={selectedProcess}>
    <option value="" disabled selected>Select a process</option>
    {#each $processes as process}
      <option value={process.id}>{process.name}</option>
    {/each}
  </select>

  <!-- Select Machine -->
  <label for="machine">Select Machine:</label>
  <select id="machine" bind:value={selectedMachine}>
    <option value="" disabled selected>Select a machine</option>
    {#each $machines as machine}
      <option value={machine.id}>{machine.name}</option>
    {/each}
  </select>

  <!-- Schedule Type -->
  <label>Schedule Type:</label>
  <select bind:value={schedule_type}>
    <option value="once">Once</option>
    <option value="daily">Every Day</option>
    <option value="workingDays">Only Working Days (Mon-Fri)</option>
    <option value="customDays">Select Specific Days</option>
  </select>

  <!-- Time -->
  <label for="time">Select Time:</label>
  <input type="time" id="time" bind:value={time} />

  <!-- Custom Days Selection -->
  {#if schedule_type === 'customDays'}
    <div>
      <label>Select Days:</label>
      <div>
        {#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as day}
          <input type="checkbox" id={day} value={day} on:change={() => toggleDay(day)} />
          <label for={day}>{day}</label>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Submit Button -->
  <button type="submit">Create Trigger</button>
</form>
{/if}
<table class="styled-table">
  <thead>
      <tr>
          <!--<th>Name</th>-->
          <th>Process</th>
          <th>Machine</th>
          <th>Schedule Type</th>
          <th>Selected Days</th>
          <th>Schedule Time</th>
          <th>Created At</th>
      </tr>
  </thead>
  <tbody>
    {#each $triggers as trigger}
      <tr>
          <!-- <td><button on:click={() => viewProcess(trigger.id)} class="process-link">
            {trigger.name}
          </button></td> -->
          <td>{getProcessName(trigger.process_id) }</td>
          <td>{getMachineName(trigger.machine_id)}</td>
          <td>{trigger.schedule_type}</td>
          <td>{trigger.selected_days ? trigger.selected_days : '-'}</td>
          <td>{trigger.schedule_time}</td>
          <td>{formatDateTime(trigger.created_at)}</td>
      </tr>
      {/each}
  </tbody>
</table>



<style>
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
