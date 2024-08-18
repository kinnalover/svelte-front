import { writable } from 'svelte/store';

export const jobs = writable([
  { id: 1, process_id: 'process_id',
    machine_id : 'machine_id',
    status: 'status',
    start_time: 'start_time',
    end_time: 'end_time',
    created_at: 'created_at',
    updated_at: 'updated_at'
  },
  
  
]);