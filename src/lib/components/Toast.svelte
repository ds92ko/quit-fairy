<script>
  import { Snackbar } from 'attractions';

  export let notification = { message: '', onlyToast: false };

  const requestNotificationPermission = async () => {
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission();
    }
  };

  $: if (notification.message) {
    if (!notification.onlyToast) {
      requestNotificationPermission().then(() => {
        new Notification('칼퇴 요정', { body: notification.message });
      });
    }
    setTimeout(() => {
      notification = {
        message: '',
        onlyToast: false,
      };
    }, 2000);
  }
</script>

{#if notification.message}
  <div class="toast">
    <div class="container">
      <Snackbar text={notification.message} transitionOptions={{ x: 0, y: 20, duration: 150 }} closeCallback={() => {}} />
    </div>
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: 100px;
    left: 0;
    right: 0;
    z-index: 500;
  }
</style>