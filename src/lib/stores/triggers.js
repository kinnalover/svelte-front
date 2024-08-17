import { writable } from 'svelte/store';

export const triggers = writable([
  { id: 1, name: 'trigger', description: 'desc'},
]);