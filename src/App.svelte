<script>
  import Header from './lib/components/Header.svelte';
  import WorkSetup from './lib/components/WorkSetup.svelte';
  import WorkTracker from './lib/components/WorkTracker.svelte';
  import WorkLog from './lib/components/WorkLog.svelte';
  import Toast from './lib/components/Toast.svelte';
  import Footer from './lib/components/Footer.svelte';

  let currentTime = new Date();
  let isHalfDay = false;
  let hasLunch = false;
  let clockInTime;
  let clockOutTime;
  let message = '';
</script>

<Header bind:currentTime />
<main>
  <div class="container">
    {#if !clockOutTime}
    <WorkSetup bind:isHalfDay bind:hasLunch bind:clockInTime />
    {:else}
    <WorkTracker {isHalfDay} {hasLunch} {clockInTime} {clockOutTime} />
    <WorkLog {isHalfDay} {hasLunch} {clockInTime} {clockOutTime} />
    {/if}
  </div>
</main>
<Toast {message} />
<Footer bind:isHalfDay bind:hasLunch bind:clockInTime bind:clockOutTime bind:message />
