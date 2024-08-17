import { writable } from 'svelte/store';

export const machines = writable([
  { id: 1, name: 'Machine 1', description: 'desc', repository_url: 'repo', created_at: 'then', updated_at: 'updated'},
]);