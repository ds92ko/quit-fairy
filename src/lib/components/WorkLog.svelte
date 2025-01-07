<script>
  import { H2 } from 'attractions';
  import { Table } from 'attractions';
  import { formatDate, formatTime12Hour } from '../utils/format.js';

  export let isHalfDay = false;
  export let clockInTime = new Date();
  export let clockOutTime;

  const headers = [
    { text: '날짜', value: 'date' },
    { text: '출근 시간', value: 'clockInTime' },
    { text: '퇴근 시간', value: 'clockOutTime' },
    { text: '반차 여부', value: 'isHalfDay' },
  ];
  const items = [
    {
      date: formatDate(clockInTime),
      clockInTime: formatTime12Hour(clockInTime),
      clockOutTime: formatTime12Hour(clockOutTime),
      isHalfDay: isHalfDay ? '⭕️' : '❌',
    }
  ];
</script>

<section>
  <H2>📝 근무 기록</H2>
  <Table {headers} {items} />
</section>