<script>
  import Header from './lib/components/Header.svelte';
  import WorkSetup from './lib/components/WorkSetup.svelte';
  import WorkLog from './lib/components/WorkLog.svelte';
  import Toast from './lib/components/Toast.svelte';
  import Footer from './lib/components/Footer.svelte';

  let currentTime = new Date();
  let isHalfDay = false;
  let clockInTime;
  let clockOutTime;
  let message = '';
</script>

<Header bind:currentTime />
<main>
  <div class="container">
    {#if !clockOutTime}
    <WorkSetup bind:isHalfDay bind:clockInTime />
    {:else}
    <WorkLog {isHalfDay} {clockInTime} {clockOutTime} />
    {/if}
  </div>
</main>
<Toast {message} />
<Footer bind:isHalfDay bind:clockInTime bind:clockOutTime bind:message />
