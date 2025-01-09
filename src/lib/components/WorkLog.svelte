<script>
  import { onMount } from 'svelte';
  import { H2, Table } from 'attractions';
  import { getWorkLog } from '../store/workLog.js';
  import Loading from './Loading.svelte';
  
  export let logData = [];

  let loading = true;
  const headers = [
    { text: '근무 유형', value: 'workType' },
    { text: '날짜', value: 'date' },
    { text: '출근 시간', value: 'clockInTime' },
    { text: '퇴근 예정 시간', value: 'scheduledOutTime' },
    { text: '실제 퇴근 시간', value: 'actualOutTime' },
    { text: '총 근무 시간', value: 'workTime' },
  ];

  onMount(async () => {
    logData = await getWorkLog();
    loading = false;
  });
</script>

<section>
  <H2>📝 근무 기록</H2>
  <div class="content">
    {#if loading}
      <Loading />
    {:else}
      {#if logData.length === 0}
        <div class="card">
          <p>근무 기록이 없습니다. 😢</p>
        </div>
      {:else}
        <div class="table">
          <Table {headers} items={logData} alternatingRows={false} />
        </div>
      {/if}
    {/if}
  </div>
</section>

<style>
  .content {
    overflow-x: auto;
  }

  .table {
    width: max-content;
  }
</style>