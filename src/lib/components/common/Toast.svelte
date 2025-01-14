<script>
  import { Snackbar } from 'attractions';
  
  import { notification } from '@/stores/svelte/notification';
</script>

{#if $notification.message}
  <div class="toast">
    <div class="container">
      <Snackbar text={$notification.message} transitionOptions={{ x: 0, y: 20, duration: 150 }} closeCallback={() => {}} />
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