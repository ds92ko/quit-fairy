import { writable } from 'svelte/store';

let notificationTimeout;

const requestNotificationPermission = async () => {
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
}

const createNotification = () => {
  const { subscribe, set } = writable({
    message: '',
    enableSystemNotification: true,
  });

  return {
    subscribe,
    set: ({ message, enableSystemNotification }) => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }

      set({ message, enableSystemNotification });

      if (enableSystemNotification) {
        requestNotificationPermission().then(() => {
          new Notification('칼퇴 요정', { body: message });
        });
      }

      notificationTimeout = setTimeout(() => {
        set({ message: '', enableSystemNotification: true });
      }, 2000);
    },
  };
}

export const notification = createNotification();




