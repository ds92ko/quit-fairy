import { writable } from 'svelte/store';

const initialWorkStatus = {
  isHalfDay: false,
  hasLunch: false,
  clockInTime: new Date(),
  clockOutTime: null,
};

const createWorkStatus = () => {
  const { subscribe, update, set } = writable({ ...initialWorkStatus });

  return {
    subscribe,
    set: (workStatus) => {
      update(current => ({
        ...current,
        ...workStatus,
      }));
    },
    reset: () => {
      set({ ...initialWorkStatus });
    },
  }
}


export const workStatus = createWorkStatus();