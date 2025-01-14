import { writable } from 'svelte/store';

const initialModal = {
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
};

const createModal = () => {
  const { subscribe, update, set } = writable({ ...initialModal});

  return {
    subscribe,
    open: (modal) => {
      update(current => ({
        ...current,
        ...modal,
        open: true
      }));
    },
    close: () => {
      set({ ...initialModal });
    }
  }
}

export const modal = createModal();