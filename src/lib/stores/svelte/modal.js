import { writable } from 'svelte/store';

export const modal = writable({
  open: false,
  title: {
    icon: '',
    text: ''
  },
  contents: [],
  confirm: {
    label: '확인',
    callback: () => {}
  },
  cancel: {
    label: '취소',
    callback: () => {}
  },
});