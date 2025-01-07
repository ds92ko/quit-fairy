<script>
  import { Snackbar } from 'attractions';

  export let message;
</script>

{#if message}
  <div class="toast">
    <div class="container">
      <Snackbar text={message} />
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