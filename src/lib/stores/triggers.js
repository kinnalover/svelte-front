import { writable } from 'svelte/store';

export const triggers = writable([
  { id: 1, name: 'trigger', process_id: 'process_id', machine_id: "machines_id",
     schedule_type: "ince",
    schedule_time: '12:00',
    selected_days: 'monday'
    
    },
]);