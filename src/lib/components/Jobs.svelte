<script>
    import { onMount } from 'svelte';
    import { fetchJobs, createJob, fetchProcesses, fetchMachines, createTrigger } from '$lib/services/api.js';
    import { jobs } from '$lib/stores/jobs.js';
    import {processes} from '$lib/stores/processes';
    import {machines} from '$lib/stores/machines';
    import { goto } from '$app/navigation';
    
    let selectedProcess = null;
    let selectedMachine = null;

  
    // Fetch processes on component mount
    onMount(async () => {
      goto(`/protected/orchestrator`);
      try {
        const data = await fetchJobs();
        jobs.set(data); // Set the fetched processes to the store
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
  
    let createbutton = false;
    // Navigate to the specific process page
    function viewProcess(jobName) {
      const processElement = document.getElementById("process-details");
      goto(`/protected/orchestrator/jobs/${jobName}`);
      
    }
    
    function toggleDay(day) {
    if (selectedDays.includes(day)) {
      selectedDays = selectedDays.filter(d => d !== day);
    } else {
      selectedDays = [...selectedDays, day];
    }
  }
    async function handleSubmit() {
    const jobData = {
      process_id: selectedProcess,
      machine_id: selectedMachine,
      status: 'pending'
    };
    
    Response = await createJob(jobData);
    console.log('Job data:', jobData);
    
  }
  </script>
  
  <div >
    <button on:click={() => createbutton = !createbutton} class='btn-create'>Create a job</button>
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
  
    <!-- Submit Button -->
    <button type="submit">Create Job</button>
  </form>
  {/if}
  <table class="styled-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Process</th>
            <th>Machine</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Created At</th>
        </tr>
    </thead>
    <tbody>
      {#each $jobs as job}
        <tr>
            <td><button on:click={() => viewProcess(job.id)} class="process-link">
              {job.name}
            </button></td>
            <td>{job.process_id}</td>
            <td>{job.machine_id}</td>
            <td>{job.status}</td>
            <td>{job.start_time}</td>
            <td>{job.end_time}</td>
            <td>{job.created_at}</td>
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
  