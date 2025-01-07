<script>
  import { Snackbar } from 'attractions';

  export let notification;

  $: if (notification) {
    new Notification('칼퇴 요정', { body: notification });
    setTimeout(() => {
      notification = '';
    }, 2000);
  }
</script>

{#if notification}
  <div class="toast">
    <div class="container">
      <Snackbar text={notification} transitionOptions={{ x: 0, y: 20, duration: 150 }} />
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