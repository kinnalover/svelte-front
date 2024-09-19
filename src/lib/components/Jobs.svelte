<script>
    import { onMount } from 'svelte';
    import { fetchJobs, createJob, fetchProcesses, fetchMachines, createTrigger,  retryJob, stopJob, fetchLogs} from '$lib/services/api.js';
    import { faRedo, faStop, faFileAlt } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { jobs } from '$lib/stores/jobs.js';
    import {processes} from '$lib/stores/processes';
    import {machines} from '$lib/stores/machines';
    import { goto } from '$app/navigation';
    import { formatDateTime } from '$lib/services/utils';
    let selectedProcess = null;
    let selectedMachine = null;
    let showLogsModal = false;
    let logsData = [];
    let currentJobId = null;
    let sortDirection = 'desc'; 

    let socket;

    // Fetch processes on component mount
    onMount(async () => {
      goto(`/protected/orchestrator`);
      await loadJobs();
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
      setInterval(loadJobs, 10000)
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
    function connectToLogStream(jobId) {
        // Establish WebSocket connection
        socket = new WebSocket(`ws://localhost:5000/ws/logs/${jobId}`);

        socket.onmessage = (event) => {
            const log = JSON.parse(event.data);
            logsData = [...logsData, log];  // Append new logs in real-time
            sortLogs();  // Ensure logs are sorted after new data is added
        };

        socket.onerror = (error) => {
            console.error("WebSocket error: ", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
    }

    // Close WebSocket connection when the modal is closed
    function closeLogsModal() {
        if (socket) {
            socket.close();
        }
        showLogsModal = false;
        logsData = [];
        currentJobId = null;
    }

    // Function to toggle the sorting direction
    function toggleSort() {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        sortLogs();
    }

    // Function to sort logs based on asctime
    function sortLogs() {
        logsData = logsData.sort((a, b) => {
            const dateA = new Date(a.asctime);
            const dateB = new Date(b.asctime);

            if (sortDirection === 'asc') {
                return dateA - dateB; // Ascending order
            } else {
                return dateB - dateA; // Descending order
            }
        });
    }

    async function loadJobs() {
      try {
        const data = await fetchJobs();
        jobs.set(data); // Update the jobs store with fetched jobs
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    function viewProcess(jobName) {
      goto(`/protected/orchestrator/jobs/${jobName}`);
    }

    async function handleRetry(jobId) {
      await retryJob(jobId); // Retry the job via API
      loadJobs(); // Refresh the job list
    }

    async function handleStop(jobId) {
      await stopJob(jobId); // Stop the job via API
      loadJobs(); // Refresh the job list
    }

    function handleLogs(jobId) {
        currentJobId = jobId;
        showLogsModal = true;
        logsData = []; // Open the modal
        connectToLogStream(jobId); // Establish WebSocket connection
    }

    async function fetchJobLogs(jobId) {
      try {
        const logs = await fetchLogs(jobId);
        logsData = logs; // Set logs for display in modal
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    }


    let createbutton = false;
    // Navigate to the specific process page
    
    
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
            <th>Process</th>
            <th>Machine</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Created At</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
      {#each $jobs as job}
        <tr class={job.status === 'completed' ? 'success-row' : ''}>
            <td>{getProcessName(job.process_id)}</td>
            <td>{getMachineName(job.machine_id)}</td>
            <td>{job.status}</td>
            <td>{formatDateTime(job.start_time)}</td>
            <td>{formatDateTime(job.end_time)}</td>
            <td>{formatDateTime(job.created_at)}</td>
            <td>
              {#if job.status === 'completed'}
              <button on:click={() => handleRetry(job.id)} class="icon-btn retry-btn">
                <FontAwesomeIcon icon={faRedo} />
              </button>
              {/if}
              {#if job.status === 'pending' || job.status === 'running'}
              <button on:click={() => handleStop(job.id)} class="icon-btn stop-btn">
                <FontAwesomeIcon icon={faStop} />
              </button>
              {/if}
            </td>
            <td>
              <button on:click={() => handleLogs(job.id)} class="icon-btn logs-btn">
                <FontAwesomeIcon icon={faFileAlt} />
              </button>
            </td>
        </tr>
        {/each}
    </tbody>
  </table>
  
  <!-- Logs Modal -->
<!-- Logs Modal -->
{#if showLogsModal}
  <div class="modal">
    <div class="modal-content">
      <span class="close" on:click={closeLogsModal}>&times;</span>
      <h3>Logs for Job {currentJobId}</h3>
      <table>
        <thead>
          <tr>
            <th style="cursor: pointer" on:click={toggleSort}>
              Time {sortDirection === 'asc' ? '↑' : '↓'} <!-- Visual indicator of sort order -->
            </th>
            <th>Level</th>
            <th>Message</th>
            <th>Function</th>
            <th>File</th>
            <th>Line</th>
          </tr>
        </thead>
        <tbody>
          {#each logsData as log}
            <tr>
              <td>{new Date(log.asctime).toLocaleString()}</td>
              <td>{log.levelname}</td>
              <td>{log.message}</td>
              <td>{log.funcname}</td>
              <td>{log.filename}</td>
              <td>{log.lineno}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/if}
  
<style>
.btn-create {
    text-align: left;
    padding: 0.5rem 1rem;
    background-color: #1abc9c;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 1rem 0;
}
.success-row {
    background-color: #175cac; /* Green background for success rows */
    color: white; /* White text for contrast */
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

/* .styled-table tbody tr:nth-of-type(even) {
    background-color: #683fd8;
} */

.styled-table tbody tr:hover {
    background-color: #2d34c2;
}

form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
}

label,
input {
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

/* Modal styling */
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Dark semi-transparent background */
}

.modal-content {
    background-color: #0c2d5b; /* Dark blue background for modal content */
    color: white; /* White text to ensure contrast on dark background */
    margin: 5% auto;
    padding: 20px;
    width: 80%; /* Increase width to fit the table */
    max-height: 80%; /* Limit modal height */
    overflow-y: auto; /* Enable scrolling if content overflows */
    border-radius: 10px;
}

.close {
    float: right;
    cursor: pointer;
    font-size: 1.5rem;
    color: white; /* Ensure the close button is visible on dark background */
}

.close:hover {
    color: red;
}

/* Modal Table Styling */
.modal-table {
    background-color: #2c3e50;
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed; /* Ensure table doesn't overflow */
}

.modal-table th,
.modal-table td {
    padding: 10px;
    text-align: left;
    word-wrap: break-word; /* Ensure long text breaks into multiple lines */
}

.modal-table th {
    background-color: #2c3e50; /* Darker background for modal table headers */
    color: rgb(49, 9, 9);
    cursor: pointer;
}

.modal-table td {
    background-color: #043642; /* Light background for modal table cells */
}

.modal-table,
.modal-table th,
.modal-table td {
    border: 1px solid #074066;
}

/* Retry and Stop Button Icons */
.icon-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
}

.icon-btn:hover {
    background-color: #2980b9;
}

.retry-btn {
    background-color: #27ae60; /* Green for retry */
}

.retry-btn:hover {
    background-color: #2ecc71;
}

.stop-btn {
    background-color: #e74c3c; /* Red for stop */
}

.stop-btn:hover {
    background-color: #c0392b;
}

</style>
  