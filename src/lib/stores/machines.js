import { writable } from 'svelte/store';

export const machines = writable([
  { id: 1, name: 'Machine 1', created_at: 'desc', ip_address: 'repo', last_heartbeat: 'then', status: 'updated'},
]);