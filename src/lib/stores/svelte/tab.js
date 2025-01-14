import { writable } from 'svelte/store';

export const tab = writable({
  current: '근무 설정',
  items: ['근무 설정', '근무 기록', '설정']
});