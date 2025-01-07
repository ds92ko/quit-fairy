<script>
  import Header from './lib/components/Header.svelte';
  import WorkSetup from './lib/components/WorkSetup.svelte';
  import WorkTracker from './lib/components/WorkTracker.svelte';
  import Toast from './lib/components/Toast.svelte';
  import Footer from './lib/components/Footer.svelte';
  import WorkStatus from './lib/components/WorkStatus.svelte';
  import Nav from './lib/components/Nav.svelte';
  import { Divider } from 'attractions';
  import WorkLog from './lib/components/WorkLog.svelte';

  let currentTime = new Date();
  let isHalfDay = false;
  let hasLunch = false;
  let clockInTime;
  let clockOutTime;
  let message = '';
  let selectedTab = '근무 설정';
</script>

<Header bind:currentTime />

<main>
  <div class="container">
    <Nav {clockOutTime} bind:selectedTab />
    {#if selectedTab === '근무 기록'}
      <WorkLog {isHalfDay} {hasLunch} {clockInTime} {clockOutTime} />
    {:else}
      <WorkStatus {clockOutTime} />
      <Divider />
    {/if}
    {#if selectedTab === '근무 확인'}
      <WorkTracker {isHalfDay} {hasLunch} {clockInTime} {clockOutTime} />
    {:else if selectedTab === '근무 설정'}
      <WorkSetup bind:isHalfDay bind:hasLunch bind:clockInTime />
    {/if}
  </div>
</main>

<Toast {message} />

{#if selectedTab !== '근무 기록'}
  <Footer bind:isHalfDay bind:hasLunch bind:clockInTime bind:clockOutTime bind:message bind:selectedTab />
{/if}
