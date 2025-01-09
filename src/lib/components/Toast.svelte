<script>
  import { Snackbar } from 'attractions';

  export let message = '';
</script>

<div class="toast">
  <div class="container">
    <Snackbar text={message} transitionOptions={{ x: 0, y: 20, duration: 150 }} closeCallback={() => {}} />
  </div>
</div>

<style>
  .toast {
    position: fixed;
    bottom: 100px;
    left: 0;
    right: 0;
    z-index: 500;
  }
</style>