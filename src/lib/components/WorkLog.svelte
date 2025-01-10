<script>
  import { onMount } from 'svelte';
  import { CheckboxChipGroup, H2, Table, DatePicker, Button, Label, Divider } from 'attractions';
  import { parseDate } from '@/utils/format.js';
  import { getWorkLog } from '@/stores/electron/workLog.js';
  import Loading from '@/components/Loading.svelte';
  
  export let logData = [];

  const headers = [
    { text: '근무 유형', value: 'workType' },
    { text: '날짜', value: 'date' },
    { text: '출근 시간', value: 'clockInTime' },
    { text: '퇴근 예정 시간', value: 'scheduledOutTime' },
    { text: '실제 퇴근 시간', value: 'actualOutTime' },
    { text: '총 근무 시간', value: 'workTime' },
  ];

  let searchData = [];
  let loading = true;
  let searchDate = {
    start: null,
    end: null,
  };
  let searchType = [
    { value: 9, label: '종일', checked: true },
    { value: 4, label: '반차 (식사 제외)', checked: true },
    { value: 5, label: '반차 (식사 포함)', checked: true },
  ];

  const handleSearch = () => {
    loading = true;
    searchData = logData.filter((log) => {
      const startDate = searchDate.start || new Date(0);
      const endDate = searchDate.end || new Date();
      const logDate = parseDate(log.date);
      const selectedWorkTypes = searchType.filter(item => item.checked).map(item => item.value);
      const workTypeNumber = parseInt(log.workType.match(/\d+/));
      const workTypeMatch = selectedWorkTypes.includes(workTypeNumber);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return (logDate >= startDate && logDate <= endDate) && workTypeMatch;
    });
    loading = false;
  }

  const handleReset = () => {
    searchDate = {
      start: null,
      end: null,
    };
    searchType = [
      { value: 9, label: '종일', checked: true },
      { value: 4, label: '반차 (식사 제외)', checked: true },
      { value: 5, label: '반차 (식사 포함)', checked: true },
    ];
    handleSearch();
  }

  onMount(async () => {
    logData = await getWorkLog();
    handleSearch();
    loading = false;
  });
</script>

<section>
  <H2>📝 근무 기록</H2>
  {#if loading}
    <Loading />
  {:else}
    <div class="card">
      <div class="search-group">
        <div>
          <Label>⏱️ 근무 유형</Label>
          <CheckboxChipGroup items={searchType} name="type" outline />
        </div>
        <div>
          <Label>📅 근무 기간</Label>
          <DatePicker range format="%Y.%m.%d" closeOnSelection locale="en-US" firstWeekday={0} bind:value={searchDate} />
        </div>
      </div>
      <Divider />
      <div class="button-group search-button">
        <Button outline on:click={handleReset}>초기화</Button>
        <Button filled on:click={handleSearch}>검색하기</Button>
      </div>
    </div>
    {#if searchData.length === 0}
      <div class="card">
        <p>근무 기록이 없습니다. 😢</p>
      </div>
    {:else}
      <div class="content">
        <div class="table">
          <Table {headers} items={searchData} alternatingRows={false} />
        </div>
      </div>
    {/if}
  {/if}
</section>

<style>
  .content {
    margin-top: 20px;
    overflow-x: auto;
  }

  .table {
    width: max-content;
  }

  .search-group {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 20px;
  }

  .search-button {
    margin-top: 20px;
  }
</style>