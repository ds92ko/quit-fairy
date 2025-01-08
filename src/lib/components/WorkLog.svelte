<script>
  import { onMount } from 'svelte';
  import { H2, Table, Loading } from 'attractions';
  import { getWorkLog } from '../store/workLog.js';

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
      <div class="loading">
        <Loading />
        <p>잠시만 기다려주세요... ⏳✨</p>
      </div>
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

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    padding-block: 50px;
    text-align: center;
  }

  .table {
    width: max-content;
  }
</style>