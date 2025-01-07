<script>
  import { H2, Table } from 'attractions';
  import { formatDate, formatTime } from '../utils/format.js';

  export let isHalfDay = false;
  export let hasLunch = false;
  export let clockInTime = new Date();
  export let clockOutTime;

  const headers = [
    { text: '날짜', value: 'date' },
    { text: '출근 시간', value: 'clockInTime' },
    { text: '퇴근 시간', value: 'clockOutTime' },
    { text: '근무 시간', value: 'workTime' },
    { text: '근무 유형', value: 'workType' },
  ];
  const items = [
    {
      date: formatDate(clockInTime),
      clockInTime: formatTime(clockInTime),
      clockOutTime: formatTime(clockOutTime),
      workType: isHalfDay ? `반차 (식사 ${hasLunch ? '포함' : '제외'})` : '종일',
      workTime: isHalfDay ? (hasLunch ? '5시간' : '4시간') : '9시간'
    },
    {
      date: formatDate(clockInTime),
      clockInTime: formatTime(clockInTime),
      clockOutTime: formatTime(clockOutTime),
      workType: isHalfDay ? `반차 (식사 ${hasLunch ? '포함' : '제외'})` : '종일',
      workTime: isHalfDay ? (hasLunch ? '5시간' : '4시간') : '9시간'
    }
  ];
</script>

<section>
  <H2>📝 근무 기록</H2>
  <Table {headers} {items} alternatingRows={false} />
</section>