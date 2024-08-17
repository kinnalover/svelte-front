import { writable } from 'svelte/store';

export const processes = writable([
  { id: 1, name: 'Process 1', description: 'desc', repository_url: 'gitlab'},
  
  
]);